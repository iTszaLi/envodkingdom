---
name: Screenshotting below-fold footers / scroll-reveal content
description: Why app_preview screenshots can't show a page footer, and the temp-toggle workaround
---

# Verifying below-fold footers with app_preview screenshots

Two independent things make a footer (or any below-fold section) invisible in an `app_preview` screenshot, regardless of the `viewport_size` height you pass:

1. **`min-h-screen` on the page root pins the footer exactly below the fold.** `min-h-screen` = 100vh = the capture viewport height. So the page content always fills the viewport and the footer starts right at (or below) the bottom edge — making the viewport taller just makes the min-h section taller too. No viewport height reveals it.

2. **framer-motion `whileInView` content stays at its `initial` (often opacity:0).** Static captures don't scroll, so the IntersectionObserver never fires and the reveal never plays — the section occupies layout space but renders blank (a large empty band).

## Workaround (temporary, must revert)
- Temporarily remove `min-h-screen` from the page root so the footer moves up into a tall capture.
- Temporarily convert reveals to play on mount: `sed -i 's/whileInView=/animate=/g' <files>` (confirm `animate=` count is 0 first so the reverse `s/animate=/whileInView=/g` is unambiguous).
- Restart workflow, screenshot at a tall viewport (e.g. `[1280, 2800]`), assess, then **revert both changes** and re-typecheck.

**Why:** these are pure capture-tool limitations, not real bugs — real users with a real viewport scroll and see everything. Never ship the toggles.

## Verifying the RTL/Arabic view of a below-fold section
`LanguageContext` has NO localStorage persistence — it defaults via `useState<Language>("en")`, and the screenshot tool can't click the header toggle. To capture the Arabic/RTL view, temporarily flip that default to `"ar"` (sets `document.documentElement.dir = "rtl"`) alongside the two toggles above, screenshot, then revert all three. A quick way to bring a deep section to the top for capture is a `{/* TEMP-PREVIEW */}` render of the component right after the `<h1>` in `pages/home.tsx` (remove it on revert).
