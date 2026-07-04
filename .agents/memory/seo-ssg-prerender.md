---
name: SSG prerender & SEO/GEO invariants
description: How this site is prerendered for crawlers/AI answer engines and the invariants that must hold when touching routes, sitemap, or the SPA shell
---

# Build-time SSG (prerender.mjs)

Content routes are prerendered to `dist/public/<route>/index.html` at build time (`renderToString`), each with per-route title/description/canonical/OG/Twitter + JSON-LD. Client-only routes (`/track`, `/admin`, unknown URLs) are served a single `spa.html` shell via the `/*` catch-all rewrite in `artifact.toml`. The shell has no server-rendered body and no `data-ssr-path`, so `main.tsx` uses `createRoot` (pure client render) for it and hydrates the prerendered content routes.

# Invariants (breaking any of these silently regresses SEO)

- **SPA shell must not carry homepage signals.** `spa.html` is served for `/track`, `/admin`, and every unknown URL. It MUST strip the homepage `<link rel="canonical">` and use a neutral brand `<title>`/description — otherwise a no-JS crawler served the shell sees those routes as duplicates of `/` (or a homepage soft-404). JS crawlers still get the correct per-route head from `useSeo` after mount.
- **Three lists must stay in sync:** `CONTENT_ROUTES` (src/lib/seo-config.ts) ↔ `artifact.toml` rewrites ↔ generated `sitemap.xml`. prerender.mjs generates the sitemap from `CONTENT_ROUTES` and hard-asserts the `artifact.toml` rewrite `from=` set matches (throws on drift in either direction, plus requires the `/*` catch-all). Adding/removing a service means editing `CONTENT_ROUTES` + adding/removing its `artifact.toml` rewrite; the build fails loudly if you forget.
- **No hreflang alternates.** Arabic is a client-side `LanguageContext` toggle, not a distinct crawlable URL, so a `?lang=ar` alternate would serve identical HTML. Prerendered HTML is English; `LanguageProvider` hard-inits to `"en"` (no localStorage at init) so there is no hydration mismatch.

**Why:** the whole point is max crawlability for no-JS crawlers (Google + AI answer engines); the shell canonical bleed and list drift are the two ways this quietly breaks.

# JSON-LD takeover

Prerendered JSON-LD `<script>`s are tagged `data-seo-ssg="true"`. On mount `useSeo` removes exactly those nodes and re-adds identical managed copies (`data-seo-managed`) sourced from the same `getSeoForPath`, so there is no duplication or gap. Site-wide `Organization`/`LocalBusiness`/`WebSite` schemas live untagged in the `index.html` template (persist on every page, including the shell), so `#organization`/`#website` `@id` refs always resolve.

# framer-motion hides content from the prerender

Two common framer-motion patterns silently keep content out of the SSG HTML (`renderToString` captures the *initial* render):
- `initial={{ opacity: 0 }}` (+ `whileInView`/`animate`) — the element serializes with inline `style="opacity:0"`, so it's in the DOM but visually hidden until JS reveals it. Fine for decorative sections; **bad for the page's ranking payload**.
- `<AnimatePresence>{open && <motion.div/>}` conditional mount — collapsed content is **absent entirely** from the prerendered HTML.

**Why:** the goal is no-JS crawlers + AI answer engines. If FAQ answers are only mounted on click, a `FAQPage`/`Question` schema referencing them is a schema-vs-visible-content mismatch (Google requires FAQ answer text present on the page).

**How to apply:** any SEO-bearing collapsible (FAQ accordions, tabs) must render its content **always** in the DOM and collapse via CSS, not conditional mount. Use the grid-rows trick: outer `class="grid" style={{gridTemplateRows: open ? '1fr' : '0fr'}}` → inner `div.overflow-hidden` → content. Keep only transforms/rotation (chevron) in framer-motion. Long-form SEO prose (the exhibition "pillar" sections) is rendered as plain `h2/p/ul` with **no** motion wrapper for the same reason.

# Homepage H1

The home hero titles are `<h2>` baked into a cinematic scroll-video (`ScrollAnimSection`), so the page had no `<h1>`. A single `sr-only` bilingual `<h1>` is added at the top of `home.tsx` for crawlers/screen readers — a legitimate a11y pattern, NOT the old low-contrast keyword block (that was deleted).
