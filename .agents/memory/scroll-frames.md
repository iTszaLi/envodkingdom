---
name: Hero scroll-animation video pipeline
description: How the cinematic scroll sections (crane/air/warehouse) get their media, and the admin CMS that produces it.
---

# Hero scroll sections are `<video>`, not JPEG frame sequences

The three cinematic scroll sections play a single looping `<video muted loop playsInline preload="none" poster>` (object-fit:cover), lazily sourced on first IntersectionObserver hit. This replaced the old canvas + ~120-JPEG-frame-per-section pipeline (~47MB, 360 img requests) — that `public/frames/` tree and the canvas scrubbing code are gone.

Assets: `public/media/{crane,air,warehouse}.{mp4,webm,jpg}` — 8.0s loop, 240 frames @30fps (mp4 ~2MB libx264 crf22, webm ~1.2–2MB libvpx-vp9 crf34, jpg = frame-0 poster so no flicker on start).

Content mapping (confirmed by frame-0 pixel match): `crane`←Airport1 (airplane), `air`←trailer1, `warehouse`←terminal1. Section labels in the route intentionally match this content.

## Admin CMS pipeline (api-server `routes/hero-videos.ts`)
Admin uploads an animated WebP → server extracts every frame to `/tmp` via PIL → ffmpeg encodes mp4+webm → poster = frame 0 → writes into the frontend's `public/media/{section}.*`. Framerate = `frames/8` so the loop is always 8s regardless of source frame count. GET reports `frameCount` via `ffprobe nb_frames`. Response shape (key,label,frameCount,thumbnailUrl,updatedAt) is unchanged so no OpenAPI codegen is needed. POST is guarded by `requireAdmin`.

**Why:** browsers can't scrub animated WebPs frame-by-frame; the old fix was JPEG-on-canvas, but a plain `<video>` is far lighter and just as smooth.

## Known production limitation (durable)
The api-server writes into the frontend artifact's `public/media/` **at runtime**. In a deployed build Vite copies `public/` into `dist` at build time and the deploy filesystem is ephemeral — so admin video replacements won't persist or reach the served bundle in production. This was equally true of the old frames pipeline (parity, not a regression). Durable fix = object storage (as the gallery already uses).

## Tooling
ffmpeg is available (libx264, libvpx-vp9). `cwebp` is NOT — use Python Pillow for WebP work.
