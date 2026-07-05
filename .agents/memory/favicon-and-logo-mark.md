---
name: Favicon & logo mark
description: Favicon is now a white-disc badge mark (single variant, not adaptive); source images and extraction gotchas.
---

# Current favicon (v4): white-disc badge, single variant
- Source: `attached_assets/logi_1783209860215.png` — the swoosh mark inside a WHITE FILLED CIRCLE on near-black bg (user-provided, July 2026). The white disc gives contrast on dark tabs, and the gray/red mark reads on light tabs, so the old adaptive light/dark `prefers-color-scheme` SVG was dropped — `favicon.svg` is now ONE embedded 128px base64 PNG.
- Extraction: the disc is a perfect circle — cut out with a supersampled anti-aliased circular mask (center/radius from white-pixel bbox) + color-distance alpha vs the uniform bg, then UNBLEND edge pixels: `fg = (px - bg*(1-α))/α`. Do not flood-fill or ML-remove.
- Package lives in `artifacts/envod-kingdom/public/` (attached_assets is NOT web-served); `?v=N` cache-busting on `<link>` tags in `index.html` — currently v=4, bump on art change.

# Older mark sources (pre-badge)
- Bare swoosh mark (no disc, no wordmark): `attached_assets/image_1780532431289.png` — 223×171, pure-white bg. Full logo with wordmark: `attached_assets/image_1780437854819.png` (730×114) — too wide for square icons.
- The ML `remove_image_background_tool` crops part of the bare mark (drops the right loop) — extract via border flood-fill instead if ever needed.

# Durable gotchas (apply to any regeneration)
- Scale with **premultiplied-alpha** LANCZOS (premultiply → resize → unpremultiply) to avoid halos.
- **apple-touch-icon must be flattened to opaque RGB white** — `alpha_composite` onto opaque white then `.convert('RGB')`; verify `getbands()` has no `A`. iOS renders transparency as black; plain `paste` leaves semi-transparent edge fringe.
- Chrome PREFERS the SVG over size-matched PNGs, so it downscales the embedded raster to 16px; hand-sharpened size PNGs are bypassed in Chrome.
- `site.webmanifest` references `android-chrome-*.png` — regenerate those in place so no manifest edit is needed.
