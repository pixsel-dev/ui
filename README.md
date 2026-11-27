# Pixsel.dev

Handpicked components, motion studies, and visual references for designers and developers. Explore UI kits, color palettes, and creative interactions.

Visit [Pixsel.dev](https://pixsel.dev).

This repository contains eight selected React components. The repository is currently private while its distribution license and publication audit await approval.

## Components

- [Rolling text label](docs/rolling-label.md) — Decorative characters roll upward on hover and keyboard focus.
- [Completing button corners](docs/completing-corners.md) — The missing upper-right and lower-left squares expand to complete a button.
- [Staggered navigation label](docs/navbar-label.md) — Navigation text appears with an indexed delay and retains its rolling hover.
- [Seamless marquee](docs/seamless-marquee.md) — A measured repeating ribbon stays filled across viewport sizes and pauses on hover.
- [Curved media reel](docs/curved-media-reel.md) — A continuous cylindrical media row built from vertical facets and caller-supplied media.
- [Faceted video renderer](docs/faceted-video.md) — One video decoder paints caller-owned canvas facets for each decoded frame.
- [Curved navigation surface](docs/navigation-surface.md) — A scalable SVG shoulder with the existing desktop navigation geometry.
- [Mobile navigation surface](docs/mobile-navigation-surface.md) — A scalable SVG pocket with the existing mobile navigation geometry.

## Installation

Use React 19 with a TypeScript-capable React bundler, such as Vite or Next.js. Clone this repository once it is available to you and run `npm ci` and `npm run check`. Copy an individual component and the sibling files from its registry entry into your app, or install the local checkout with `npm install /path/to/ui`. Import `@pixsel-dev/ui/styles.css` once. Curved reel CSS includes the utility rules its existing implementation uses, so Tailwind is optional.

```tsx
import {RollingLabel,ButtonCorners} from '@pixsel-dev/ui';
import '@pixsel-dev/ui/styles.css';

export function EarlyAccessButton(){
  return <button className="button pixel-button" aria-label="Get early access">
    <ButtonCorners/><RollingLabel text="Get Early Access"/>
  </button>;
}
```

Each component page includes a complete usage example and its registry installation command. Examples use caller-supplied media.

## Dependencies

All components use React. The curved reel also uses `clsx` and `tailwind-merge`. No animation framework is required. Next.js consumers can import interactive components from a client component.

## Availability and license

Exactly the eight components above are designated for free source distribution. Other Pixsel previews and future premium products are managed separately. A final license is pending approval. The package is marked `UNLICENSED` and publishing is disabled during review. See [the license review](docs/licensing-review.md) and [third-party notices](THIRD_PARTY_NOTICES.md).

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Report vulnerabilities using [SECURITY.md](SECURITY.md).

If these components help your work, star the repository so others can find it.
