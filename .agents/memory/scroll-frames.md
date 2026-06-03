---
name: Animated WebP frame extraction
description: Frame counts and paths for the scroll-driven cinematic animation
---

Frames extracted from 3 animated WebPs via Python Pillow to JPEG at 960×540 q=78:
- `public/frames/crane/` — 100 frames (0000–0099), source had 168 total (step=1, first 100 used)
- `public/frames/air/`   — 120 frames (0000–0119), source had 240 total (step=2)
- `public/frames/warehouse/` — 110 frames (0000–0109), source had 192 total (step=2)

URLs in app: `${import.meta.env.BASE_URL}frames/{folder}/{pad4}.jpg`

**Why:** Browser can't scrub animated WebPs frame-by-frame; JPEG sequences on canvas give full control.
