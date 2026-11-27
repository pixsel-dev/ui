# Curved media reel

A continuous cylindrical media row built from vertical facets and caller-supplied media.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react clsx tailwind-merge
```

The registry URL installs the same source under PolyForm Perimeter 1.0.0.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/curved-media-reel.json
```

## Usage

```tsx
import {TiltedGridHero} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<TiltedGridHero style={{height:560}} className="story-reel" images={[{src:'/your-poster.webp',video:'/your-video.mp4',videoLow:'/your-small-video.mp4'}]} speed={6.5} tileHeight={26} aspectRatio={16/9} gap={12} axis={41} curve={80} fade={0}/>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. Give the wrapper an explicit height. Supply your own authorized posters and optional video clips. The band is decorative. Motion pauses under reduced motion. Same-origin or CORS-enabled media is required for canvas rendering. The video renderer expects a story-reel ancestor for its local intersection root; set className="story-reel" when using videos.
