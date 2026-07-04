---
name: RTL flex-row-reverse un-mirrors
description: Site RTL convention and how to position absolute decorations (timelines, accents) relative to it
---

The site sets `dir="rtl"` on `documentElement` in Arabic, which already mirrors every flex row. The codebase convention then adds `isRtl ? "flex-row-reverse"` to rows — which **un-mirrors** them, so row contents (icons, step bubbles) sit on the same visual side in both languages.

**Why:** A timeline's vertical progress line was flipped to `right-7` in RTL "to mirror", but the bubbles stayed visually left (flex-row-reverse under dir=rtl), leaving the line floating on the wrong edge.

**How to apply:** For absolutely-positioned decorations (connector lines, glows) tied to elements inside `flex-row-reverse` rows, anchor them to the element's *visual* side — usually the same side as LTR — not the logical RTL side. Only flip absolute positions for elements that genuinely mirror (grid columns, borders on the card edge). Always verify with an AR screenshot.
