---
name: Seamless CSS marquee + RTL
description: Gap math and RTL pinning rules for infinite translateX marquees (ClientMarquee pattern)
---

**Rule 1 — gap math:** For an N-copies infinite marquee animated with `translateX(-100/N %)`, do NOT use flex `gap` on the track. Track width = N·P − g, so the percentage translate lands g·(N−1)/N px short → visible snap each loop. Put the spacing on each card (`mr-3`) so the copy period includes its trailing gap and the translate is exact.

**Rule 2 — RTL:** Under `dir="rtl"` a `shrink-0` track anchors to the container's right edge and the animation opens a growing void on the right. Pin the marquee rows wrapper with `dir="ltr"` — consistent with the project's convention of not mirroring physical-motion canvases (rows already scroll in both directions, so nothing is lost).

**How to apply:** Any infinite logo/ticker marquee in this repo (see ClientMarquee.tsx). Verify with an AR screenshot by temporarily defaulting `LanguageProvider` state to "ar" (no URL param exists) + hoisting the section in home.tsx; revert both after.

**Also:** the homepage marquee renders `FALLBACK_CLIENTS` hardcoded in ClientMarquee.tsx (site is fully static, no DB); roster edits go there.
