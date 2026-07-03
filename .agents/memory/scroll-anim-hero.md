---
name: Scroll-animation hero sections (ScrollAnimSection)
description: Where the "sparkle/star" comes from and how the hero z-layers work — for editing the cinematic scroll sections.
---

# ScrollAnimSection cinematic hero sections (crane / air / warehouse)

## The floating "star/sparkle" is baked into the JPEG frames — NOT a DOM/CSS/SVG element
- The four-point sparkle that appears in the lower-right of each scroll-animation hero is part of the video frame images themselves (`public/frames/{crane,air,warehouse}/*.jpg`, 120 frames each, 1280×720). There is no component/CSS to delete.
- It is **static** per folder (same position every frame — averaging all 120 frames keeps it sharp while the background blurs). So there is no animation to "preserve."
- To remove it: mask the star region and inpaint every frame. cv2 (`opencv-python-headless`) `INPAINT_TELEA` (radius ~5) gives clean, texture-preserving results; a pure-PIL Gaussian-diffusion fill leaves an obvious blurry blob — do not use it. Frames are git-tracked, so overwriting is revertible.
- The 18 tiny white dots in the section ARE a DOM element (`PARTICLES`, `float-particle`) — different thing, don't confuse them with the star.

## Z-layering (all in ScrollAnimSection.tsx)
- canvas `z-0` — has `transform: scale(1.04) translate(mouse*0.4)` and draws frames with **object-fit cover** (so content is cropped differently per viewport aspect; on mobile portrait the lower-right is cropped off-screen).
- dark gradient + vignette + bottom-bleed overlays + particles: `z-10`
- chapter text/eyebrow/features: `z-20`
- loading bar: `z-30`
- **Why it matters:** a viewport-anchored DOM overlay (e.g. a brand logo) does NOT track the cover-cropped/scaled canvas, so don't try to pin it to baked-in frame content. Put a full-color brand overlay at `z-[15]`: above the overlays (so it isn't darkened) but below the text (so right-aligned Arabic/RTL text wins on overlap).
