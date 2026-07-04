---
name: Asset image optimization (@assets imports)
description: Vite @assets imports are emitted as-is (no auto-compression); pre-encode photographic uploads to WebP before importing.
---

# Asset image optimization for `@assets` imports

Importing an image via the Vite `@assets` alias emits a hashed copy of the **original bytes** — Vite does NOT resize or re-compress it. Raw user-uploaded PNGs of photographs are typically 2–3 MB each; importing a dozen for card/hero backgrounds tanks LCP (each eager hero pulls multiple MB).

**Rule:** before importing photographic uploads for backgrounds/heroes, re-encode them to WebP at a sane display width (≈1600px) and quality ~80. That yields ~100–250 KB each (10–15× smaller) with no visible loss. Then point the imports at the `.webp` files.

**Why:** the site's LCP hero images and the `/services` card grid were shipping ~33 MB of raw PNGs; the fix was a bulk WebP re-encode, keeping the same base filenames with a `.webp` extension so imports change only the extension.

**How to apply:**
- Convert with ImageMagick: `magick in.png -resize '1600x1600>' -quality 80 -define webp:method=6 out.webp`.
- `sharp` is installed in some artifact packages but is **not resolvable from the workspace root** in the code_execution sandbox (`ERR_MODULE_NOT_FOUND`). Use `magick`/`convert` from bash instead (both are on PATH), or run a node script from inside the package that declares sharp.
- `vite/client` in tsconfig `types` already covers `.webp`/`.png` module imports — no `vite-env.d.ts` needed.
