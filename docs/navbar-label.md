# Staggered navigation label

Navigation text appears with an indexed delay and retains its rolling hover.

## Install

Copy the source files listed in this component's registry entry and `src/styles.css` into your React project. Keep sibling imports together. Install the dependencies listed below.

```sh
npm install react
```

The registry URL installs the same source under PolyForm Perimeter 1.0.0.

```sh
npx shadcn@latest add https://raw.githubusercontent.com/pixsel-dev/ui/main/registry/navbar-label.json
```

## Usage

```tsx
import {NavbarLabel} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

<nav data-nav-phase="labels"><button className="nav-link" aria-label="Components"><NavbarLabel text="Components" index={0}/></button></nav>
```

React 19 and TypeScript are supported. Typography inherits from the application. Use interactive components from a client entry point in Next.js. Set data-nav-phase on a parent to waiting, then labels, then complete to run the existing entrance sequence. index controls the stagger. Give the parent control an accessible name.
