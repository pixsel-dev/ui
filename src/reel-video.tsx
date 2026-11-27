"use client";

import { useEffect, useRef } from 'react';

type ReelVideoProps = { src: string; lowSrc?: string; paused: boolean; slices: number; aspectRatio: number; tileWidth: string };
type Connection = EventTarget & { saveData?: boolean; effectiveType?: string; downlink?: number };
type Download = { source?: string; url?: string; pending?: Promise<string>; controller?: AbortController };

// One decoder feeds display-sized facets, once per decoded video frame.
export function ReelVideo({ src, lowSrc, paused, slices, aspectRatio, tileWidth }: ReelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const downloadRef = useRef<Download>({});
  useEffect(() => () => {
    const download = downloadRef.current;
    download.controller?.abort();
    if (download.url) URL.revokeObjectURL(download.url);
    downloadRef.current = {};
  }, [src, lowSrc]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tile = video.parentElement!;
    const root = tile.closest('.story-reel');
    const canvases = [...tile.querySelectorAll('canvas')];
    const contexts = canvases.map(canvas => canvas.getContext('2d', { alpha: false, desynchronized: true }));
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    let near = false, visible = false, running = false, disposed = false, buffering = true;
    let frame = 0, fallbackFrame = 0, lastFrame = -1;
    let crop = { width: 0, height: 0, left: 0, top: 0 };
    let strips: { x: number; width: number }[] = [];
    let watchedDownload: Promise<string> | undefined;
    const supportsFrameCallbacks = typeof video.requestVideoFrameCallback === 'function';
    if (video.dataset.canvasSource !== src) {
      canvases.forEach(canvas => { canvas.style.opacity = '0'; });
      video.dataset.canvasSource = src;
    }
    const size = () => {
      if (!video.videoWidth || !tile.clientHeight) return;
      const width = Math.min(video.videoWidth, video.videoHeight * aspectRatio);
      const height = width / aspectRatio;
      crop = { width, height, left: (video.videoWidth - width) / 2, top: (video.videoHeight - height) / 2 };
      const renderHeight = Math.min(video.videoHeight, 480, Math.ceil(tile.clientHeight * Math.min(devicePixelRatio || 1, 1.5)));
      const renderWidth = renderHeight * aspectRatio;
      const overlap = Math.ceil(width * 2 / Math.max(1, tile.clientWidth)) + 2;
      strips = canvases.map((canvas, index) => {
        const x = index * width / slices;
        const stripWidth = Math.min(width / slices + overlap, width - x);
        const pixels = Math.ceil(stripWidth / width * renderWidth);
        if (canvas.width !== pixels || canvas.height !== renderHeight) { canvas.width = pixels; canvas.height = renderHeight; }
        canvas.style.width = `calc(${tileWidth} * ${stripWidth / width})`;
        return { x, width: stripWidth };
      });
    };
    const paint = () => {
      if (video.readyState < 2) return;
      if (!strips.length) size();
      strips.forEach((strip, index) => {
        const canvas = canvases[index];
        contexts[index]?.drawImage(video, crop.left + strip.x, crop.top, strip.width, crop.height, 0, 0, canvas.width, canvas.height);
        if (canvas.style.opacity !== '1') canvas.style.opacity = '1';
      });
    };
    const cancelFrame = () => {
      if (frame) video.cancelVideoFrameCallback(frame);
      cancelAnimationFrame(fallbackFrame); frame = 0; fallbackFrame = 0;
    };
    const nextFrame = () => {
      if (!running || disposed) return;
      if (supportsFrameCallbacks) {
        frame = video.requestVideoFrameCallback(() => { frame = 0; paint(); nextFrame(); });
      } else {
        fallbackFrame = requestAnimationFrame(() => {
          const count = video.getVideoPlaybackQuality?.().totalVideoFrames ?? video.currentTime;
          if (count !== lastFrame) { paint(); lastFrame = count; }
          nextFrame();
        });
      }
    };
    const loadSource = () => {
      const limited = matchMedia('(max-width: 700px)').matches || connection?.saveData ||
        /^(slow-)?2g$|^3g$/.test(connection?.effectiveType ?? '') || (!!connection?.downlink && connection.downlink < 2.5);
      const selected = lowSrc && (limited || video.dataset.mediaSource === lowSrc) ? lowSrc : src;
      let target = selected;
      if (selected === lowSrc) {
        const download = downloadRef.current;
        if (!download.pending) {
          download.source = selected;
          download.controller = new AbortController();
          const signal = download.controller.signal;
          download.pending = fetch(selected, { signal, cache: 'force-cache' })
            .then(response => { if (!response.ok) throw new Error('Video unavailable'); return response.blob(); })
            .then(blob => {
              if (signal.aborted) return '';
              download.url = URL.createObjectURL(blob);
              return download.url;
            }).catch(() => '');
        }
        if (watchedDownload !== download.pending) {
          watchedDownload = download.pending;
          void download.pending.then(() => { if (!disposed) sync(); });
        }
        if (!download.url) return;
        target = download.url;
      }
      video.dataset.mediaSource = selected;
      if (video.getAttribute('src') !== target) { buffering = true; video.src = target; video.preload = 'auto'; video.load(); }
    };
    const sync = () => {
      if (disposed) return;
      if (near && !paused && !motion.matches) loadSource();
      const buffered = video.buffered;
      const bufferEnd = buffered.length ? buffered.end(buffered.length - 1) : 0;
      const lightweight = !!lowSrc && video.dataset.mediaSource === lowSrc;
      const remaining = Math.max(0, (video.duration || 1.25) - video.currentTime);
      // Lightweight clips are already downloaded in full before a decoder starts.
      const needed = Math.min(lightweight ? .5 : 1.25, remaining);
      if (buffering && video.readyState >= 3 && bufferEnd - video.currentTime >= needed - .05) buffering = false;
      const active = visible && !paused && !motion.matches && !document.hidden &&
        getComputedStyle(tile).visibility !== 'hidden' && !buffering && video.readyState >= 3;
      if (active && !running) {
        running = true;
        void video.play().catch(() => { running = false; cancelFrame(); });
        paint(); nextFrame();
      } else if (!active) { running = false; video.pause(); cancelFrame(); }
    };
    const waiting = () => { buffering = true; sync(); };
    const loaded = () => { size(); sync(); };
    const resize = () => { size(); if (video.readyState >= 2) paint(); sync(); };
    const upcoming = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; sync(); }, { root, rootMargin: '0px 35%' });
    const inView = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { root, threshold: .01 });
    upcoming.observe(tile); inView.observe(tile);
    const observer = new ResizeObserver(resize); observer.observe(tile);
    // CSS hides tiles while they wrap behind the curved row.
    const visibilityTimer = setInterval(sync, 250);
    video.addEventListener('loadedmetadata', loaded); video.addEventListener('canplay', sync);
    video.addEventListener('progress', sync); video.addEventListener('waiting', waiting);
    motion.addEventListener('change', sync); connection?.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync); sync();
    return () => {
      disposed = true; running = false; cancelFrame(); video.pause();
      upcoming.disconnect(); inView.disconnect(); observer.disconnect(); clearInterval(visibilityTimer);
      video.removeEventListener('loadedmetadata', loaded); video.removeEventListener('canplay', sync);
      video.removeEventListener('progress', sync); video.removeEventListener('waiting', waiting);
      motion.removeEventListener('change', sync); connection?.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [src, lowSrc, paused, slices, aspectRatio, tileWidth]);
  return <video ref={videoRef} data-reel-video muted loop playsInline preload="none" hidden />;
}
