# Seamless marquee

A measured repeating ribbon stays filled across viewport sizes and pauses on hover.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The registry URL installs the same source under PolyForm Perimeter 1.0.0.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/seamless-marquee.json
```

## Usage

```tsx
import {SeamlessMarquee} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<SeamlessMarquee text="NEW COMPONENTS, TEMPLATES & ANIMATIONS." separator={<span aria-hidden="true">✦</span>}/>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. Supply your own text and separator. The existing ResizeObserver fits enough repeated items to cover the container. Hover and keyboard focus pause the stream. Reduced motion stops it.
