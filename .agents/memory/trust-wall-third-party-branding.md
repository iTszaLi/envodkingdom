---
name: Trust walls & third-party branding
description: How to build "trusted by / events served" sections when real third-party logos aren't cleanly obtainable, and the SEO rule for third-party entities.
---

# Trust walls & third-party branding

## Third-party event/client logos
Do NOT scrape real event/exhibition logos for "trusted by" walls. Image search for named
Saudi/GCC events (LEAP, Saudi Build, Big 5 Construct Saudi, INDEX Saudi, etc.) returns
mostly wrong/generic/low-res assets (Saudi flags, Aramco, landmark icons, unrelated "Leap"
companies); only a couple (Cityscape Global, Saudi Food Show) had plausible hits, from
third-party logo repos with trademark risk.

**Rule:** use a consistent sector-icon logo-mark system (uniform tiles, one lucide icon per
sector) instead — honest, enterprise-grade, and visually consistent. Build the card to accept
a real `<img>` logo later if the client supplies files they have rights to.
**Why:** mismatched/wrong scraped logos look worse than no logo and carry trademark exposure.

## JSON-LD for third-party entities
Do NOT emit `@type: "Event"` structured data for third-party past events the site does not
organize, on a marketing page that isn't about those events (esp. with year-only `startDate`).
Google treats this as spammy structured markup. Use a plain `ItemList` of name-only
`ListItem`s (e.g. `"LEAP 2025 — Riyadh, Saudi Arabia"`) as a credibility list instead.
**Why:** Event rich-result guidelines expect a specific date and a page primarily about the
event; violating that risks manual-action/spam flags rather than helping.
**How to apply:** any "events we served / clients / partners" list → ItemList name-only, not Event/Organization objects for entities you don't own.
