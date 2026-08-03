# Würth WISE Portfolio

The WISE portfolio / showroom website. **Live: https://wise-portfolio-v2.vercel.app**

## The one rule

**Every change starts in Claude Design. Nobody hand-edits the site files in this repo.**

`index.html`, `assets/`, `_ds/`, and the loose `.js` files are a **mirror** of a Claude Design
export. A hand-edit here survives exactly until the next sync, then it is silently wiped.
If something on the site needs to change, change it in Claude Design and re-export.

The only file in this repo that is safe to hand-edit is `design.config.json`
(and the tooling in `scripts/`).

## Update flow

1. Edit the design at **claude.ai/design**, in the `Redesign website Wise colors` project.
2. Trigger the handoff export with `WISE Portfolio v2.dc.html` open. It lands in `~\Downloads`
   as a folder ending in `-handoff`.
3. From this repo:

```powershell
.\scripts\sync-from-claude-design.ps1 -Commit -Deploy
```

That auto-picks the newest `*handoff*` folder in Downloads, mirrors it in, shows you what
changed, commits, and deploys to production.

Leave off the switches for a dry look at what would change:

```powershell
.\scripts\sync-from-claude-design.ps1
```

If you renamed the design (e.g. moved to a v3), point the script at it once — it remembers:

```powershell
.\scripts\sync-from-claude-design.ps1 -DesignFile "WISE Portfolio v3.dc.html" -Commit -Deploy
```

## Deploying without a sync

```powershell
vercel deploy . --prod --yes --scope rebt
```

`--scope rebt` is **required** — the Vercel CLI has no default team here and fails with
`missing_scope` without it.

## Things worth knowing

- **The site is public.** No password, no Vercel Deployment Protection. Anyone with the link
  can open it.
- **Country flags come from `flagcdn.com`**, an external CDN. They can go blank behind a
  restrictive corporate proxy — check the venue's network before presenting.
- **`_ds/w-rth-design-system-<uuid>/` carries a UUID that changes** when Claude Design
  re-exports the design system. That is why the sync script wipes `_ds/` and `assets/`
  instead of copying over them.
- **`assets/hero-loop.mp4` is 18 MB** and unused by the v2 design. It ships with the bundle
  and is kept so a future design version can use it.
- Würth's `WuerthSans` webfonts are served from `_ds/.../fonts/`. That is the approved
  font path for Würth products — don't swap it for a Google-Fonts substitute.

## Layout

```
index.html               <- mirror of the Claude Design .dc.html (+ an injected <title>)
support.js               <- mirror
image-slot.js            <- mirror
assets/                  <- mirror
_ds/                     <- mirror (design system: CSS, JS bundle, WuerthSans fonts)
design.config.json       <- which design file, page title, Vercel project/scope
scripts/
  sync-from-claude-design.ps1
```

---

## สรุปสั้นๆ

- เว็บ portfolio ของเรา อยู่ที่ **https://wise-portfolio-v2.vercel.app**
- **ห้ามแก้ไฟล์เว็บในโฟลเดอร์นี้ตรงๆ** ทุกอย่างต้องแก้ที่ Claude Design แล้ว export ออกมา
  ถ้าแก้ตรงนี้ พอ sync รอบหน้าจะโดนทับหายหมด
- ขั้นตอนอัปเดต: แก้ที่ Claude Design → export handoff (ไฟล์ลงที่ Downloads) → รันคำสั่งเดียว:

```powershell
.\scripts\sync-from-claude-design.ps1 -Commit -Deploy
```

  สคริปต์จะหาโฟลเดอร์ handoff ล่าสุดใน Downloads ให้เอง ก๊อปเข้ามา commit แล้ว deploy ขึ้นเว็บเลย
- อยากดูก่อนว่าจะเปลี่ยนอะไรบ้าง ให้รันโดยไม่ต้องใส่ `-Commit -Deploy`
- ลิงก์เว็บเปิดสาธารณะ ไม่มีรหัสผ่าน
