---
name: Scroll-animation hero sections (ScrollAnimSection)
description: Where the "sparkle/star" comes from and how the hero z-layers work — for editing the cinematic scroll sections.
---

# ScrollAnimSection cinematic hero sections (crane / air / warehouse)

## The floating "star/sparkle" is baked into the video — NOT a DOM/CSS/SVG element
- The section now plays a `<video>` (`public/media/{crane,air,warehouse}.mp4|webm`), not a JPEG canvas. The four-point sparkle in the lower-right is baked into the video footage itself. There is no component/CSS to delete.
- To remove it you'd have to re-encode the source with the star masked/inpainted — it is not editable from the DOM.
- The 18 tiny white dots in the section ARE a DOM element (`PARTICLES`, `float-particle`) — different thing, don't confuse them with the star.

## Z-layering (all in ScrollAnimSection.tsx)
- `<video>` `z-0` — has `transform: scale(1.04) translate(mouse*0.4)` and **object-fit cover** (so content is cropped differently per viewport aspect; on mobile portrait the lower-right is cropped off-screen).
- dark gradient + vignette + bottom-bleed overlays + particles: `z-10`
- chapter text/eyebrow/features: `z-20`
- loading bar: `z-30`
- **Why it matters:** a viewport-anchored DOM overlay (e.g. a brand logo) does NOT track the cover-cropped/scaled canvas, so don't try to pin it to baked-in frame content. Put a full-color brand overlay at `z-[15]`: above the overlays (so it isn't darkened) but below the text (so right-aligned Arabic/RTL text wins on overlap).
