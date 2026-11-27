# Completing button corners

The missing upper-right and lower-left squares expand to complete a button.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The hosted registry URL will work after license and publication approval.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/completing-corners.json
```

## Usage

```tsx
import {ButtonCorners,RollingLabel} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<button className="button pixel-button" aria-label="Get early access"><ButtonCorners/><RollingLabel text="Get Early Access"/></button>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. Use both button and pixel-button classes. ButtonCorners is decorative and should remain inside the button with an accessible label.
