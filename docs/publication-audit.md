# Publication audit

Status: private review. Final license and public publication require owner approval.

- Exactly eight registry entries are designated free. Every entry includes its local source and required sibling files.
- The export starts with fresh Git history. No production repository history is transferred.
- Homepage layouts, brand artwork, fonts, photos, recordings, signup code, database schemas, environment configuration and premium source are excluded.
- Component source was checked for private imports and credentials. Gitleaks found no secrets in the export.
- React, React DOM, clsx, tailwind-merge and the installed type packages declare MIT licensing. TypeScript declares Apache-2.0. Their terms remain applicable independently of the final component license.
- No third-party media or font files are included. Consumers provide their own authorized media and typography.
- TypeScript and registry completeness checks pass.
- A separate React/Vite consumer built successfully from the packed package. Browser checks passed for all eight package examples and all eight independent registry copies, including motion, hover and reduced-motion behavior where applicable.
- Package publication remains disabled and the license remains UNLICENSED pending approval.

The proposed standard license is discussed in [licensing-review.md](licensing-review.md). The competition restriction means the library should be described as source available, not as OSI open source.
