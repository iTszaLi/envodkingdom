---
name: Lenis smooth scroll options
description: Which options @studio-freight/lenis accepts (version installed)
---

Only `lerp` and `wheelMultiplier` are valid for `@studio-freight/lenis` (the version installed). `smoothTouch` and `syncTouch` do not exist and cause TS2353.

```ts
new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
```

**Why:** The package version in use predates those options (added in later Lenis releases / the `lenis` rename).

## Scroll-to-top on SPA route change

Lenis (module-level singleton in `scroll-engine.ts`) drives the window scroll, so a plain `window.scrollTo(0,0)` on navigation gets overridden on the next raf and the page stays where it was. wouter does NOT reset scroll on pushState navigation, so switching sections (e.g. Services → Home) kept the previous scroll position.

**How to apply:** Reset via the Lenis instance, not the window: `lenis.scrollTo(0, { immediate: true, force: true })` (`force` overrides any lock/stop). Wire it through a tiny `ScrollToTop` component that watches `useLocation()` and calls it in an effect keyed on location, rendered inside `<WouterRouter>`. `scrollTo` options (`immediate`, `force`, etc.) are separate from the restricted constructor options above and are valid.
