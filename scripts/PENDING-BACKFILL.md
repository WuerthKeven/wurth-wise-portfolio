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
