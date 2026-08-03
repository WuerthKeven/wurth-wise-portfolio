# Würth Design System

A drop-in design system for generating **Würth-correct** UI and brand assets — colors, typography, logos, components, and high-fidelity UI kits. Built from the official Würth Corporate Identity (CI) rulebook so any agent or designer can produce on-brand work for Würth surfaces.

> **Brand sign-off:** This system is authoritative for design/code-generation context. Final brand approval still belongs to the CI custodian (Brigitte / `ci-custodian`).

---

## Who is Würth?

Würth (the Würth Group, *Adolf Würth GmbH & Co. KG*) is a German multinational and the **world's leading distributor of assembly and fastening material** — screws, bolts, anchors, dowels, tools, chemicals, and workshop supplies — for the professional trade and industry. The audience is the **B2B craftsman / trade buyer**: tradespeople, workshops, automotive, construction, metal, and wood industries. The brand voice is **industrial-utilitarian but refined** — sharp, direct, confident, never playful or decorative.

The corporate claim is **"It's that easy." / "Macht's einfach."**

### Products & surfaces represented here

The source material describes Würth's internal "constellation" of product surfaces built on a shared CI. This design system models two:

1. **E-Shop / Smart Catalog** — the product catalog & ordering surface (search, category nav, product grid, product detail, cart). Würth is famous for its online shop and printed catalog of 125,000+ articles.
2. **Creative / Internal Platform** — an internal tool app (dark sidebar, red brand-box headers, template cards, tier pills, reports) used by Würth sales/marketing teams. Bronze / Silver / Gold tier identity applies here.

> Both are **recreations for prototyping**, not production code. They replicate the existing CI; they do not invent new design.

---

## Sources

This system was cut from a single self-contained CI file provided by the user:

- `Claude-design-system/CLAUDE-DESIGN-SYSTEM.md` — the long-form rulebook (sections 0–9): voice, color tokens, type, logo, components, motion, frontend stack, hard rules, pre-ship checklist.
- `Claude-design-system/CLAUDE-DESIGN-SYSTEM.html` — the rendered specimen sheet.
- Brand assets: WuerthSans web fonts (from `uploads/Standard-Web/`; originally WuerthGlobal ttf, replaced 2026-07), `wurth-logo*.{svg,png,jpg}` (6 logo variants).

Upstream sources referenced (not provided, store for reference): `library/ci-wurth/CD-RULES.md`, `library/ci-wurth/guides/BrandAssets-Index.md`. To regenerate after a CD update, ask the CI custodian to re-cut the design system from the latest CD-RULES.

---

## CONTENT FUNDAMENTALS

How Würth writes copy.

- **Tone:** Industrial, utilitarian, confident, professional. Speaks to a working tradesperson who wants the spec and the price, not a story. Never cute, never playful, never marketing-fluffy.
- **Casing:** **Headings are UPPERCASE — always.** Titles, section heads, nav items, badges, button labels. Body text is sentence case.
- **Person:** Product-and-action oriented. Imperative for actions ("Save template", "View specs", "Download"). Third-person/neutral for descriptions. Avoids chatty first-person "we" and rarely uses "you" except in instructions.
- **The claim:** "It's that easy." (EN) / "Macht's einfach." (DE) — the one sanctioned brand slogan.
- **Emoji:** **None.** Emoji are off-brand. The one tolerated glyph is a checkmark "✓" in a button success state ("✓ Saved!").
- **Numbers & specs:** Precise and concrete — article numbers (`0204 21 6`), material grades (`Stainless steel A2`), quantities (`Bag of 100`), customer references (`WU-2026-0142`). No vague superlatives.
- **Vibe examples:**
  - Headline: `SMART CATALOG SPRINT`
  - Subline: `Built for the professional trade buyer.`
  - Body: "Würth tools, fasteners, and assembly solutions for the professional trade. Direct sales, technical service, and an industry-leading product range."
  - Button: `SAVE TEMPLATE` · `VIEW SPECS` · `DOWNLOAD`
  - Meta: `Last updated 2 hours ago · 142 items · Sales Asia`

---

## VISUAL FOUNDATIONS

The visual motifs that make a surface unmistakably Würth.

- **Color system:** **Red + Black + White is the entire system.** Würth Red `#CC0000` is the dominant brand color (CTAs, brand boxes, active states). Cyan `#0093DD` is the *only* secondary accent, and only for CTAs **outside** a red brand box. Grays are support (surfaces, borders, metadata) — **never body text**. Yellow / dark-red / blue / green are accent-only, never background or body text. **No purple, ever.**
- **Backgrounds:** Page background is **always `#F4F4F4`** — never pure white at page level. Cards/panels are white sitting on the gray. **No gradients, no noise/grain, no mesh, no decorative textures, no imagery as wallpaper.** Flat color fields only. The signature background motif is the **red brand box** — a full-width `#CC0000` rectangle with a white headline.
- **Typography:** `WuerthSans` only (Standard-Web, 2026): BlackCond 800 for headlines, Demi 700 for sublines/buttons, Book 400 for body (Black 900 available for non-condensed display). Headlines are heavy, condensed, uppercase, tightly tracked. No substitutes — never Roboto, Inter, Open Sans, or plain Arial.
- **Corners:** **Sharp.** Cards and panels are `0px` radius. Buttons and inputs max `4px`. Pills/badges `2px`. Nothing is rounded or pill-soft except small interactive controls.
- **Borders:** The **bounding-box rule** — every white card on the gray page bg carries a visible `1px solid #D1D5DB` border. Never `border: none` on a card; never use the fainter `#E8E8E8` for that job (it fails the rule). `#E8E8E8` is for *internal* dividers and input borders only.
- **Shadows:** **None on chrome** — not on cards, modals, or navigation. The *only* sanctioned shadow is canvas elevation (a floating/dragged tile, a popover above content). Würth surfaces look flat and printed, not glassy.
- **Transparency & blur:** Effectively unused. No glassmorphism, no frosted panels, no scrim blurs. Solid fills only.
- **Animation / motion:** Minimal and functional. **Active nav is instant — no animation.** Template-card hover is a crisp red overlay/border transition at `0.12s ease`. Button success confirms in text ("✓ Saved!") and resets after `1.8s`. Long loads (>300ms) show a **skeleton, not a spinner**. **Forbidden:** page-transition animations, parallax, scroll effects, sidebar nav hover animation, card entrance animations. No bounces, no easing flourishes.
- **Hover states:** Color shifts, not motion. Red buttons darken to `#AA0000`; black to `#262626`; outline/ghost fill to `#F4F4F4`. Sidebar items hover to `#262626`. No scale, no lift, no shadow-on-hover.
- **Press / active states:** Active nav = solid red fill `#CC0000` with white bold label. No shrink/scale press animation.
- **Imagery vibe:** When product photography appears it is clean, evenly lit, on white/neutral — catalog-style, true-to-product, not moody or filtered. No warm/cool grading, no grain, no duotone.
- **Cards:** White fill, `0px` radius, `1px #D1D5DB` border, **no shadow**, generous padding (`16–24px`). The opposite of the default rounded+shadow+zinc-gray look.
- **Layout:** Structured and rectilinear. Dark sidebar (`#1A1A1A`, 240px / 210px in-app) for navigation; red brand-box headers anchor pages and sections; content sits in bordered white cards on the gray field. Sharp grid alignment.

---

## ICONOGRAPHY

- **Style mandate:** *Functional icons only* — **24px viewBox, 2px stroke, `currentColor`, no decorative variants.** Line icons, not filled, not duotone, not rounded-cartoon. They inherit text color and stay monochrome.
- **No built-in icon font / sprite was provided** in the source material — there is no Würth-proprietary icon set in this package.
- **Substitution (FLAGGED):** Because no icon assets were supplied, this system uses **[Lucide](https://lucide.dev)** via CDN as the closest match — Lucide is exactly 24px viewBox / 2px stroke / `currentColor` line icons, satisfying the CI mandate. **This is a substitution, not an official Würth icon set.** If Würth has a proprietary icon library, supply it and it will replace Lucide. Load Lucide in HTML with:
  ```html
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>lucide.createIcons();</script>
  ```
  Use as `<i data-lucide="search"></i>` etc. Set `color` / `width` / `height` via CSS; default stroke is already 2px.
- **Emoji:** **Not used.** Off-brand. The sole tolerated glyph is "✓" inside a button success state.
- **Unicode as icons:** Avoid. Use real line icons.
- **Security note (production):** every SVG upload must pass through `sanitizeSvg()` before render (per the CI frontend rules).

---

## INDEX — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, manifest. |
| `SKILL.md` | Agent Skill manifest — makes this system invocable from Claude Code. |
| `colors_and_type.css` | Single source of truth: `@font-face`, color tokens, semantic type classes. Import into any artifact. |
| `colors_and_type.css` vars | `--wuerth-red`, `--g10`, `--border`, `--font-sans`, semantic `.h1/.body/.meta`; WISE tokens `--wise-violet/-magenta/-crimson/-charcoal/-gold/-gradient`. |
| `fonts/` | `WuerthSans-BlackCond` (800), `-Demi` (700), `-Book` (400), `-Black` (900) — woff2/woff. Source: `uploads/Standard-Web/`. |
| `components/` | Exported React components (see below). |
| `assets/` | Logo variants — see logo table below. Includes **WISE team logos** (`wise-logo-{light,dark,image}.png`). |
| `preview/` | Design-System cards (type, color, spacing, components, brand) shown in the DS tab. |
| `ui_kits/eshop/` | UI kit — Würth E-Shop / Smart Catalog (storefront, search, product grid & detail, cart). |
| `ui_kits/platform/` | UI kit — Würth internal Creative Platform (dark sidebar app, brand-box pages, templates, reports). |
| `Claude-design-system/` | Original source CI files (read-only reference). |

### Components

Exported from `components/`, reachable via `window.WRthDesignSystem_8b9de7` once `_ds_bundle.js` is loaded.

- **`Button`** — Würth CI button. Uppercase WuerthGlobal Bold, 4px radius; `red` / `black` / `outline` / `ghost` / `cyan` variants, `small` + `block`.
- **`WiseCredit`** — "Built by WISE" attribution lockup (team identity: violet→crimson gradient + gold arrow). `badge` / `bar` variant, `on` light/dark. Credit-only — **not** a Würth CI element.

### Logo files (pick by background)

| Use case | File |
|---|---|
| Light background (web default) | `assets/wurth-logo.svg` *(baked white rect — only safe on white)* · `assets/wurth-logo.png` |
| Würth-red background `#CC0000` | `assets/wurth-logo-on-red.svg` ✅ |
| Dark non-red background `#1A1A1A` | `assets/wurth-logo-negative.png` |
| Mono / single-color | `assets/wurth-logo-mono.png` |
| Photographic JPGs (white / dark) | `assets/wurth-logo-white.jpg` · `assets/wurth-logo-on-dark.jpg` |

**Never** put `wurth-logo.svg` on a colored background (white box shows). **Never** put `wurth-logo-negative.png` on red (red-on-red disappears).

### WISE team logos (attribution)

This system was built **by WISE — Würth Innovation & Solutions Excellence — for Würth.** Use to credit the team.

| Background | File |
|---|---|
| Light / white | `assets/wise-logo-light.png` |
| Dark / black | `assets/wise-logo-dark.png` |
| Photo / colored image | `assets/wise-logo-image.png` |

---

*Last cut: 2026-06-04. Source: Würth CI `CLAUDE-DESIGN-SYSTEM.md`.*
