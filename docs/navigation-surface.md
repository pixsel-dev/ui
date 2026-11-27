# Curved navigation surface

A scalable SVG shoulder with the existing desktop navigation geometry.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The hosted registry URL will work after license and publication approval.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/navigation-surface.json
```

## Usage

```tsx
import {NavigationSurface} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<div style={{width:500,height:52,color:'white',background:'black'}}><NavigationSurface/></div>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. The surface fills its wrapper and inherits currentColor. A waiting, labels, complete data-nav-phase sequence on a parent runs the original top-anchored unfold animation. The wrapper controls placement and dimensions.
