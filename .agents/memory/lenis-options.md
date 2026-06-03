---
name: Lenis smooth scroll options
description: Which options @studio-freight/lenis accepts (version installed)
---

Only `lerp` and `wheelMultiplier` are valid for `@studio-freight/lenis` (the version installed). `smoothTouch` and `syncTouch` do not exist and cause TS2353.

```ts
new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
```

**Why:** The package version in use predates those options (added in later Lenis releases / the `lenis` rename).
