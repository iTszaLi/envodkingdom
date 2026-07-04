---
name: CSS filter on cross-origin iframes not composited in app_preview screenshots
description: Why a dark-themed Google Maps embed (invert filter) looks light in screenshots but works in real browsers
---

The `app_preview` screenshot tool does NOT composite CSS `filter` (invert/hue-rotate/etc.) over the content of a **cross-origin iframe** (e.g. a Google Maps `output=embed` iframe). The map renders LIGHT in screenshots even when the invert-to-dark filter is correctly applied.

**Proof (decisive test):** apply `filter: invert(1)` to the *container div* that holds both a normal DOM badge and the iframe. In the screenshot the DOM badge inverts (e.g. a red pin flips to cyan, dark bg flips to light) but the iframe map stays light. So the filter IS applied to normal DOM but the screenshot renderer captures the cross-origin iframe separately, ignoring the parent's filter.

**Why:** real Chrome DOES composite filters onto cross-origin iframes (classic proof: `iframe{filter:grayscale(1)}` visibly grayscales a YouTube embed). The screenshot capture path is the limitation, not the code.

**How to apply:**
- The standard no-API-key "dark Google Map" trick is `filter: invert(0.92) hue-rotate(180deg) brightness(...) contrast(...) saturate(...)` on the iframe. Keep it — it works in production browsers.
- Do NOT burn restart+screenshot cycles trying to "fix" a light-looking embedded map; you cannot visually verify iframe filters here. Verify everything else (layout, badge, border, shape, pin, click-through) and trust the filter for real browsers.
- Keeping the filter is strictly better than removing it: worst case it's a visual no-op and the map is light inside a dark frame (graceful fallback).
