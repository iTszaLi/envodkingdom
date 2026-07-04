---
name: Scroll-animation hero sections (ScrollAnimSection)
description: Where the "sparkle/star" comes from and how the hero z-layers work — for editing the cinematic scroll sections.
---

# ScrollAnimSection cinematic hero sections (crane / air / warehouse)

## The floating "star/sparkle" was baked into the video — NOT a DOM/CSS/SVG element
- The section plays a `<video>` (`public/media/{crane,air,warehouse}.mp4|webm`), not a JPEG canvas. A four-point sparkle was baked into the footage itself (static, lower-right, center ~(1161,605) in the 1280x720 frame, same spot on all three clips). There was no component/CSS to delete — a DOM overlay can't reliably cover it because the video is `object-fit:cover` + `scale(1.04)` so the star drifts per viewport.
- **FIX APPLIED (durable):** the committed videos + posters were re-encoded with ffmpeg `delogo=x=1101:y=535:w=120:h=140` (interpolates the sparkle away, leaves only a faint blur hidden under the dark vignette). mp4 (libx264 crf22), webm (libvpx-vp9 crf34) and the frame-0 poster jpg must ALL be delogo'd together or the star returns in one of them.
- **Warning:** the admin CMS re-encode pipeline (`api-server routes/hero-videos.ts`) does NOT apply delogo, so re-uploading footage there reintroduces any baked-in sparkle unless delogo is added to that pipeline.
- The 18 tiny white dots in the section ARE a DOM element (`PARTICLES`, `float-particle`) — different thing, don't confuse them with the star.

## Z-layering (all in ScrollAnimSection.tsx)
- `<video>` `z-0` — has `transform: scale(1.04) translate(mouse*0.4)` and **object-fit cover** (so content is cropped differently per viewport aspect; on mobile portrait the lower-right is cropped off-screen).
- dark gradient + vignette + bottom-bleed overlays + particles: `z-10`
- chapter text/eyebrow/features: `z-20`
- loading bar: `z-30`
- **Why it matters:** a viewport-anchored DOM overlay (e.g. a brand logo) does NOT track the cover-cropped/scaled canvas, so don't try to pin it to baked-in frame content. Put a full-color brand overlay at `z-[15]`: above the overlays (so it isn't darkened) but below the text (so right-aligned Arabic/RTL text wins on overlap).
