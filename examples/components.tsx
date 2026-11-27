"use client";
import {RollingLabel,ButtonCorners,NavbarLabel,SeamlessMarquee,TiltedGridHero,ReelVideo,NavigationSurface,MobileNavigationSurface} from '../src/index';
import '../src/styles.css';

export function RollingLabelExample(){return (<button className="button" aria-label="Explore"><RollingLabel text="Explore"/></button>);}

export function ButtonCornersExample(){return (<button className="button pixel-button" aria-label="Get early access"><ButtonCorners/><RollingLabel text="Get Early Access"/></button>);}

export function NavbarLabelExample(){return (<nav data-nav-phase="labels"><button className="nav-link" aria-label="Components"><NavbarLabel text="Components" index={0}/></button></nav>);}

export function SeamlessMarqueeExample(){return (<SeamlessMarquee text="NEW COMPONENTS, TEMPLATES & ANIMATIONS." separator={<span aria-hidden="true">✦</span>}/>);}

export function TiltedGridHeroExample(){return (<TiltedGridHero style={{height:560}} className="story-reel" images={[{src:'/your-poster.webp',video:'/your-video.mp4',videoLow:'/your-small-video.mp4'}]} speed={6.5} tileHeight={26} aspectRatio={16/9} gap={12} axis={41} curve={80} fade={0}/>);}

export function ReelVideoExample(){return (<div className="story-reel"><div style={{position:'relative',width:480,height:270}}><ReelVideo src="/your-video.mp4" paused={false} slices={1} aspectRatio={16/9} tileWidth="480px"/><canvas style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/></div></div>);}

export function NavigationSurfaceExample(){return (<div style={{width:500,height:52,color:'white',background:'black'}}><NavigationSurface/></div>);}

export function MobileNavigationSurfaceExample(){return (<div style={{width:132,height:72,color:'white',background:'black'}}><MobileNavigationSurface/></div>);}
