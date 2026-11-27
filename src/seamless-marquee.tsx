"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export function SeamlessMarquee({text, separator}: {text: string; separator: ReactNode}) {
  const ribbonRef = useRef<HTMLButtonElement>(null);
  const itemRef = useRef<HTMLSpanElement>(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const ribbon = ribbonRef.current;
    const item = itemRef.current;
    if (!ribbon || !item) return;

    const fit = () => {
      const itemWidth = item.getBoundingClientRect().width;
      if (!itemWidth) return;
      const ribbonWidth = ribbon.getBoundingClientRect().width;
      // Keep the ribbon covered after one full item has scrolled out.
      setCopies(Math.max(2, Math.ceil(ribbonWidth / itemWidth) + 1));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(ribbon);
    observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ribbonRef}
      type="button"
      className="newsletter-ribbon"
      aria-disabled="true"
      aria-label={text}
    >
      <span className="marquee" aria-hidden="true" style={{ '--marquee-copies': copies } as CSSProperties}>
        {Array.from({ length: copies }, (_, index) => (
          <span className="marquee-item" key={index} ref={index === 0 ? itemRef : undefined}>
            {text}
            <span className="marquee-logo">{separator}</span>
          </span>
        ))}
      </span>
    </button>
  );
}
