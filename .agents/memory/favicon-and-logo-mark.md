---
name: Favicon & logo mark
description: Where the clean ENVOD swoosh mark lives, how to extract it cleanly, and why the favicon is an adaptive light/dark SVG.
---

# Logo mark source
- The clean, isolated ENVOD swoosh mark (no wordmark text) is `attached_assets/image_1780532431289.png` — 223×171, PURE WHITE opaque background. Use this as the source for any icon/favicon/logo-mark work.
- The full logo `attached_assets/image_1780437854819.png` (730×114) includes the "ENVOD KINGDOM" wordmark text — not suitable for a square icon.

# Extracting the mark (do NOT use the ML background remover)
- The `remove_image_background_tool` crops part of this mark (drops the right-hand loop of the swoosh). Reject it.
- **Why:** it mis-detects the light-gray loop as background.
- **How to apply:** remove the white background with a flood-fill from the image border (min-channel ≥ ~240 = background candidate), which preserves interior light-gray highlights and the full mark. Scale with **premultiplied-alpha** LANCZOS (premultiply → resize → unpremultiply) to avoid white/dark halos on transparent edges.

# Favicon is adaptive light/dark (prefers-color-scheme)
- The favicon package is served from `artifacts/envod-kingdom/public/` (attached_assets is NOT web-served). Primary icon is `favicon.svg` which embeds two base64 PNG variants toggled by `@media (prefers-color-scheme: dark)`; PNG/ICO are fallbacks.
- **Why:** the swoosh crescent is mid-gray and nearly disappears on dark browser tabs. A single transparent icon cannot be high-contrast on both white and near-black tabs. The dark variant lifts the gray to bright silver (red kept) so it reads on dark; the light variant keeps brand gray for light tabs. Both stay transparent.
- apple-touch-icon.png is deliberately OPAQUE white background — iOS renders transparency as black.
- **How to apply:** regenerate the whole package (light+dark variants, ICO, PNGs, SVG, manifest) from the source mark; keep `?v=N` cache-busting on the `<link>` tags in `index.html` and bump N when the art changes.

# Gotchas learned regenerating the package
- **apple-touch must be flattened to RGB.** `canvas.paste(mark, box, mark)` onto an opaque-white RGBA canvas STILL leaves semi-transparent edge pixels (alpha<255) → faint dark fringe on iOS. Fix: `Image.new('RGBA',(s,s),(255,255,255,255))` → `alpha_composite(mark)` → `.convert('RGB')` and save. Verify `getbands()` has no `A`.
- **The SVG embeds a raster, and Chrome PREFERS the SVG** over the size-matched PNGs. So the browser downscales the embedded 128px raster to 16px — the hand-sharpened `favicon-16x16.png` is effectively bypassed in Chrome. If 16px blur is still reported, the trade-off is: drop the `<link rel="icon" type="image/svg+xml">` to force Chrome onto the size PNGs (LOSES dark/light adaptivity), or embed a sharper/smaller raster. Do not iterate blindly — surface the trade-off.
- **The mark is ~1.4:1 wide**, so in a SQUARE icon ~94% width fill is the practical maximum (going higher clips/touches edges). Enlarging from ~87%→94% width is only ~7% linear (though ~15% area); you cannot hit a "10–15% linear" bump without distorting or clipping the wide mark.
