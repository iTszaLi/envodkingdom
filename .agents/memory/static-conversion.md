---
name: Fully static conversion
description: The site has no backend since July 2026 — what replaced the API/DB/admin, and how to verify bilingual changes
---

Since July 2026 the site is fully static (Cloudflare Pages compatible). Express API, PostgreSQL, object storage, and the admin CMS were removed entirely.

**What replaced dynamic features:**
- Services/industries content lives in the static catalog (`service-data.ts`) — the single source of truth; edit EN + AR together.
- Quote modal + contact form build `mailto:` links via the shared builder in `quote-mailto.ts` (subject "Quote Request", formatted body, URL capped ~1900 chars). Any new lead-capture form should reuse this builder, not add a backend.
- Track page keeps its search UI; submit shows a bilingual "online tracking available soon — contact operations" notice (tel + mailto buttons).
- Gallery renders its curated empty state (item list hard-coded empty). `gallery.ts` still holds a dead `/api/gallery/media/` URL helper — intentionally kept to avoid touching shared presentation code.

**Why:** the user wanted static hosting with zero backend cost/maintenance; content churn is low enough that code edits replace the CMS.

**How to apply:** do not reintroduce fetch/React Query/API calls for content — put it in the static catalogs and rebuild. Verify Arabic rendering by temporarily defaulting `LanguageProvider` state to `"ar"`, screenshotting, then reverting.
