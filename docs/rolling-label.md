# Rolling text label

Decorative characters roll upward on hover and keyboard focus.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The hosted registry URL will work after license and publication approval.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/rolling-label.json
```

## Usage

```tsx
import {RollingLabel} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<button className="button" aria-label="Explore"><RollingLabel text="Explore"/></button>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. Place the label inside a button or nav-link and provide an accessible name on that parent. Decorative character copies are hidden from assistive technology.
