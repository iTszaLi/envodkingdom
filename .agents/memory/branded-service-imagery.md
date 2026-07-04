---
name: Branded service imagery technique
description: How the service hero images with the ENVOD company logo were produced (AI scene + real logo composite)
---

## The technique

AI generators cannot render the real company logo, so branded service photography is a two-step pipeline:

1. **Generate the scene** with a prompt engineered to include a *clean blank white surface facing the camera* (truck box side, reefer trailer, white-wrapped crate, courier van panel, white shipping container) + negative prompt `text, letters, words, logos, watermarks, writing`.
2. **Composite the real logo** (`attached_assets/ekl_logo_1783200347154.png`, white-bg PNG, 568x316) onto the white surface with ImageMagick **`-compose multiply`** — the logo's white background disappears into the panel shading so it reads as painted-on, no white-box halo. Then convert to webp quality 82 (~70–150 KB at 1408px).

**Why:** direct "add our logo" prompts produce garbled fake text; multiply-composite on a prompted white panel is the only reliable way to get the exact bilingual logo into imagery.

**How to apply:** any future branded imagery (more services, gallery, marketing) — prompt for a white side-on surface, view the image to pick placement coordinates, size the logo to fit *inside* the panel (reefer trailer panels are short: ~120px tall at 1408px width caps the logo at ~190px wide), composite with multiply, convert to webp in `attached_assets/`, wire via `SERVICE_IMAGES` in `src/lib/service-images.ts` (keyed by service id — the only imagery map; cards, heroes, and homepage all consume it).
