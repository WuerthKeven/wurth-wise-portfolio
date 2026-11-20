# ⚠️ Un-synced hand-edit in `index.html`

**Added 2026-08-04. This change is NOT in Claude Design and WILL be wiped by the next
`sync-from-claude-design.ps1` run.** Re-apply it in the *Redesign website Wise colors*
project (`WISE Portfolio v2.dc.html`), then delete this file.

## What was changed

The Würth corporate logo was added to the nav brand slot, left of the WISE mark.
Rationale: `Co-worker/library/ci-wurth/CD-RULES.md` §"WISE team-logo variant rule" — WISE is a
departmental sub-brand and "never replaces `logos/wurth-logo.*` on corporate/customer-facing
surfaces." The nav previously carried WISE alone.

## Assets to upload into Claude Design

| File | Source | Prep applied |
|---|---|---|
| `assets/wurth-logo-web.svg` | `ci-wurth/logos/wurth-logo.svg` | Stripped the baked opaque `<rect fill="#FFFFFF">`; viewBox tightened to `142.4 142.3 1215.3 260.3`. Artwork untouched (shield `#CC0000`, black wordmark). |
| `assets/wurth-logo-negative-web.png` | `assets/wurth-logo-negative.png` (already in bundle, was unused) | Cropped to content bbox `(65,128)-(734,272)` → 669×144. |

Both variants normalized to tight bounds so they render at identical size — unprepped, the SVG
mark filled 48% of its canvas height vs the PNG's 36%, which made the mark jump on theme toggle.

## Markup — nav brand slot

Replaces the old `<a href="#top">` that wrapped only the two WISE images:

```html
<a data-brandlock="1" href="#top" style="display:flex;align-items:center;gap:18px;flex:none;text-decoration:none;">
  <span data-wurthmark="1" style="position:relative;display:block;width:121px;height:26px;flex:none;">
    <img data-wurthlogo="light" src="assets/wurth-logo-web.svg" alt="Würth" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:left center;">
    <img data-wurthlogo="dark" src="assets/wurth-logo-negative-web.png" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:left center;">
  </span>
  <span aria-hidden="true" style="width:1px;height:26px;background:var(--border);flex:none;"></span>
  <span style="position:relative;display:block;width:120px;height:38px;flex:none;">
    <!-- the two existing WISE <img> tags, unchanged -->
  </span>
</a>
```

## CSS — added to the `<style>` block

```css
[data-wurthlogo]{opacity:0;transition:opacity .22s ease;}
[data-theme="light"] [data-wurthlogo="light"]{opacity:1;}
[data-theme="dark"] [data-wurthlogo="dark"]{opacity:1;}
@media (max-width:1120px){[data-brandlock]{gap:12px!important;}[data-brandlock] [data-wurthmark]{width:96px!important;height:21px!important;}}
```

**Why CSS and not the existing theme JS.** The theme handler uses `querySelector` (singular):

```js
const ld = root.querySelector('[data-logo="dark"]'), ll = root.querySelector('[data-logo="light"]');
```

Reusing `data-logo` on the Würth images would make them the first match — since the parent mark
leads, the WISE logo would silently stop toggling. The `data-wurthlogo` attribute plus CSS driven
off the root `data-theme` keeps the two pairs independent and touches no JS.

## Still open

The nav WISE mark is the violet→magenta **gradient** variant, which `CD-RULES.md` §"SANCTIONED
EXCEPTION" restricts to internal team-identity surfaces and prohibits on external/customer-facing
ones. Keven's call on 2026-08-04 was to leave it as out of scope for this change. If this site is
classed customer-facing, the fix is swapping it for `WISE-logo2026-Image-BG.png` (solid `#CC0000`).
Worth settling with Brigitte.

---

# 📌 Decision — Würth Sans `_ds/` fonts stay at v1.000 (2026-08-07)

> **Standing decision record — independent of the logo backfill above.** If the logo backfill is
> ever completed and the top of this file removed, **keep this section** (move it into `CLAUDE.md`
> or a `DECISIONS.md`); do not delete it with the rest.

Würth Sans **v1.003** landed from HQ on 2026-08-07 (Brigitte's assessment:
`Co-worker/outputs/research/2026-08-07_wuerth-sans-package-assessment.md`). This repo's
`_ds/w-rth-design-system-…/fonts/` carry **v1.000** — 8 tracked files (`Black`, `BlackCond`,
`Book`, `Demi`, each `.woff` + `.woff2`), correctly tracked (do **not** apply Co-worker's widened
font `.gitignore` rule here — those files are small and belong in git).

**Keven's call (2026-08-07): accept that `_ds/` stays at v1.000 until the Würth Design System
catches up.** Do **not** hand-copy the v1.003 files in — `_ds/` is a *design-system export*, not a
hand-maintained asset folder; a hand-edit desyncs it from source and the next re-export silently
reverts it. The only correct upgrade path (update the font upstream in the Würth Design System,
then re-export `_ds/`) is **parked** on Keven's WDS CI-material upload.

**Why this is low-risk today:** v1.003 adds +94 codepoints with 0 removed — essentially the full
Vietnamese block (U+1EA0–1EF9 + Ơơ Ưư). This site renders **no Vietnamese content**, so the gain
is nil for now. Revisit only if the portfolio ever needs Vietnamese.

**Trap if this is ever revisited:** HQ **renamed** `WuerthSans-Demi` → `WuerthSans-DemiBold` (and
`WuerthSansVF-Standard` → `WuerthSans-VF`) in v1.003. Our `WuerthSans-Demi.woff2` has **no
same-name counterpart** upstream — a filename-matched copy would move Black/BlackCond/Book to
v1.003 and silently leave Demi stranded at v1.000 (a mixed-version stack, the worst outcome). Any
future update must go through the design-system re-export, never a hand-copy.

**A `_ds/` refresh cannot be sourced from the Co-worker library at all.** That library deliberately
carries **only** `Book`/`Black`/`BlackCond` (`CD-RULES.md:55` — `DemiBold` and `VF` exist in HQ's
kit but are not imported). Our `_ds/` needs a `Demi`/`DemiBold` weight the library doesn't hold, so
even a sanctioned refresh has to come **through the design-system re-export**, not a file copy from
Co-worker. This reinforces the decision above.

Reference only (read-only, Co-worker side), canonical unversioned paths:
`Co-worker/library/ci-wurth/fonts/WuerthSans-{Black,BlackCond,Book}.woff2`. Never copy these into
this repo.
