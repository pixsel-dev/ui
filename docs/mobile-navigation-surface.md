# Mobile navigation surface

A scalable SVG pocket with the existing mobile navigation geometry.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The registry URL installs the same source under PolyForm Perimeter 1.0.0.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/mobile-navigation-surface.json
```

## Usage

```tsx
import {MobileNavigationSurface} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<div style={{width:132,height:72,color:'white',background:'black'}}><MobileNavigationSurface/></div>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. The surface fills its wrapper and inherits currentColor. A waiting, labels, complete data-nav-phase sequence on a parent runs the original unfold from the upper-right. The wrapper controls placement and dimensions.
