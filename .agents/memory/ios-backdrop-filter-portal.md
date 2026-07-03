---
name: iOS backdrop-filter clips overflowing descendants
description: Why absolute dropdowns inside a backdrop-blur header vanish on iOS Safari, and the portal fix
---

# iOS Safari backdrop-filter clips overflowing descendants

An `absolute` element that overflows the border-box of an ancestor carrying
`backdrop-filter` (e.g. `backdrop-blur-*`) is clipped/mis-rendered to that
ancestor's box on iOS Safari/WebKit — even though it renders fine in Chromium/Blink.

**Symptom seen here:** the mobile nav dropdown (`absolute top-full` inside the
`fixed` blurred `<header>`) was invisible on a real iPhone while the header bar
itself stayed visible. Tap worked and DOM rendered (proven by forcing the panel
open in the headless Chromium preview — always looked fine there), but the panel
extends *below* the header box, exactly the overflow case that WebKit drops.
A `<video>` hero (compositing punch-through) can aggravate the same region, so
don't rely on z-index/`translateZ(0)` incantations to fix it.

**Fix:** render such overlays with `createPortal(..., document.body)` as a
`fixed` element OUTSIDE the blurred ancestor. Make it fully opaque (`bg-primary`,
no `backdrop-blur` — nested backdrop-filters are another Safari misrender) and
position it with a measured top offset: read `headerRef.getBoundingClientRect().bottom`
on open + on resize (header height varies when the top ticker bar wraps / language
changes; it's `fixed` so it does NOT change on scroll).

**Why:** this class of bug is UNVERIFIABLE in the Chromium-based screenshot tool —
it only reproduces on real iOS. Reach for the portal directly instead of guessing
with CSS layer hints.

**How to apply:** any dropdown/menu/popover that lives inside a `backdrop-filter`
container and overflows its box → portal to body, opaque bg, measured offset.
