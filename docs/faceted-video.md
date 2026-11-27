# Faceted video renderer

One video decoder paints caller-owned canvas facets for each decoded frame.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The hosted registry URL will work after license and publication approval.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/faceted-video.json
```

## Usage

```tsx
import {ReelVideo} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<div className="story-reel"><div style={{position:'relative',width:480,height:270}}><ReelVideo src="/your-video.mp4" paused={false} slices={1} aspectRatio={16/9} tileWidth="480px"/><canvas style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/></div></div>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. The renderer expects its parent to own one canvas per slice and a story-reel ancestor. The example uses one slice. For multiple slices, position each canvas over its corresponding facet. Supply same-origin or CORS-enabled media. paused controls playback, and reduced motion stops decoding.
