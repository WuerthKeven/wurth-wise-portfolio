# Würth WISE Portfolio

The WISE portfolio / showroom website. **Status: mock-up.**

## Hosting

**This repo has no deployment target wired in. It is going to Azure**, per the standing
all-projects-to-Azure decision (no Vercel, no Supabase).

There is a temporary link — **https://wise-portfolio-v2.vercel.app** — put up for the
Aug-2026 presentation. It is a **throwaway mock-up host**. Do not point a domain at it,
do not link it from anything permanent, and do not treat it as this repo's target.
Refresh it only with `-PublishMockup` (below), which links to Vercel, deploys, and tears
the link back down so the repo stays host-agnostic at rest.

## The one rule

**Every change starts in Claude Design. Nobody hand-edits the site files in this repo.**

`index.html`, `assets/`, `_ds/`, and the loose `.js` files are a **mirror** of a Claude Design
export. A hand-edit here survives exactly until the next sync, then it is silently wiped.
If something on the site needs to change, change it in Claude Design and re-export.

The only files safe to hand-edit are `design.config.json`, `README.md`, and `scripts/`.

## Update flow

1. Edit the design at **claude.ai/design**, in the `Redesign website Wise colors` project.
2. Trigger the handoff export with `WISE Portfolio v2.dc.html` open. It lands in `~\Downloads`
   as a folder ending in `-handoff`.
3. From this repo:

```powershell
.\scripts\sync-from-claude-design.ps1 -Commit
```

That auto-picks the newest `*handoff*` folder in Downloads, mirrors it in, shows what changed,
and commits. Leave off `-Commit` for a dry look at what would change.

Add `-PublishMockup` only when the temporary presentation link needs refreshing:

```powershell
.\scripts\sync-from-claude-design.ps1 -Commit -PublishMockup
```

If you renamed the design (e.g. moved to a v3), point the script at it once — it remembers:

```powershell
.\scripts\sync-from-claude-design.ps1 -DesignFile "WISE Portfolio v3.dc.html" -Commit
```

## Things worth knowing

- **The mock-up link is public.** No password, no deployment protection. Anyone with it can
  open the site.
- **Country flags come from `flagcdn.com`**, an external CDN. They can go blank behind a
  restrictive corporate proxy — check the venue's network before presenting.
- **`_ds/w-rth-design-system-<uuid>/` carries a UUID that changes** when Claude Design
  re-exports the design system. That is why the sync script wipes `_ds/` and `assets/`
  instead of copying over them.
- **`assets/hero-loop.mp4` is 18 MB** and unused by the v2 design. It ships with the bundle
  and is kept so a future design version can use it.
- Würth's `WuerthSans` webfonts are served from `_ds/.../fonts/`. That is the approved font
  path for Würth products — don't swap it for a Google-Fonts substitute.
- `.gitattributes` disables line-ending conversion so a re-sync diff shows only what the
  designer actually changed, not CRLF churn.

## Layout

```
index.html               <- mirror of the Claude Design .dc.html (+ an injected <title>)
support.js               <- mirror
image-slot.js            <- mirror
assets/                  <- mirror
_ds/                     <- mirror (design system: CSS, JS bundle, WuerthSans fonts)
design.config.json       <- which design file, page title, temporary mock-up host
scripts/
  sync-from-claude-design.ps1
```

---

## สรุปสั้นๆ

- นี่คือเว็บ portfolio ของเรา ตอนนี้ยังเป็น **mock-up**
- **repo นี้ไม่ผูกกับ Vercel แล้ว** ปลายทางจริงคือ **Azure** ส่วนลิงก์
  `wise-portfolio-v2.vercel.app` เป็นแค่ที่ฝากชั่วคราวไว้พรีเซนต์ อย่าเอาไปผูกโดเมนหรืออ้างอิงถาวร
- **ห้ามแก้ไฟล์เว็บในโฟลเดอร์นี้ตรงๆ** ทุกอย่างต้องแก้ที่ Claude Design แล้ว export ออกมา
  ถ้าแก้ตรงนี้ พอ sync รอบหน้าจะโดนทับหายหมด
- ขั้นตอนอัปเดต: แก้ที่ Claude Design → export handoff (ไฟล์ลงที่ Downloads) → รัน:

```powershell
.\scripts\sync-from-claude-design.ps1 -Commit
```

- ถ้าอยากอัปลิงก์พรีเซนต์ชั่วคราวด้วย ค่อยเติม `-PublishMockup`
- อยากดูก่อนว่าจะเปลี่ยนอะไรบ้าง ให้รันเปล่าๆ ไม่ต้องใส่ switch
