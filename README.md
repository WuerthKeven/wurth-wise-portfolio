# Würth WISE Portfolio

The WISE portfolio / showroom website. **Status: mock-up.**

A single static page — `index.html` + `assets/`. No build step, no framework, no server code.

## Editing

**Edit `index.html` and the files in `assets/` directly, here in this repo.**

> This repo used to be a read-only *mirror* of a Claude Design export, synced by a script and never
> hand-edited. That is no longer true (changed 2026-11-19): the design is edited here now, and the
> Claude Design round-trip + its sync script are gone.

Open it: **double-click `index.html`** — that is how it is presented today. Or serve it locally:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

then open <http://localhost:4173>. (The Claude Code preview config named `wise-portfolio` runs the
same command.)

## Adding a project

Each solution card has **View detail**, which opens the project's own page in a new tab, plus a red
**Platform ↗** button to the live platform when the project has one.
All the detail lives on that page — the portfolio shows only the card. The Creative Platform
(`creative` → `creative-platform/index.html`) is the finished reference.

> **With Claude Code:** open this folder and ask, e.g. *"add FASTY"*. The project skill
> `add-project-detail` (in `.claude/skills/`, shared with the repo) interviews you about the project,
> writes the card, links the page and checks it. The steps below are the same thing by hand.

The six project ids are: `fasty`, `creative`, `loyalty`, `knowledge`, `flipbook`, `rpa`.

**1. Card text** — in `index.html`, edit that project's `<div data-solcard id="<id>">`: pillar tags,
name, tagline, problem line, solution line. Change text only, not the markup.

**2. Project page** — one self-contained HTML file at `<folder>/index.html`
(e.g. `creative-platform/index.html`): no links to outside hosts, because it must render inside the
Würth network. Set its tab icon:
`<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">`.

**3. Link the card** — in `index.html`, search for `PROJECT_PAGES` and set that id to the file:

```js
const PROJECT_PAGES = { ..., creative:'creative-platform/index.html', ... };
```

Always the file, never just the folder — a folder link breaks when the site is opened by
double-click. `'#'` means no page yet: the card shows "Detail coming soon".

The live platform goes in `PROJECT_PLATFORMS` (just below), as a full `https://` address — it
shows the red **Platform ↗** button; `'#'` keeps the button hidden.

**4. Check it** — run `python .claude/skills/add-project-detail/scripts/check_project.py <id>`,
then open `index.html`, click the card's **View detail**: the page opens in a new tab and renders.
Then commit on a branch and open a Pull Request.

## Publishing to SharePoint

The site is shared from the REBT SharePoint library, folder **`WISE-Portal`**. Build the upload set:

```powershell
python scripts/build_sharepoint.py
```

It writes three single-file pages to `sharepoint/` (not tracked in git). Upload all three into `WISE-Portal`, keeping
the file names — the links between the pages and in the newsletter depend on them. Re-upload over the old files after
every change.

SharePoint's viewer blocks outside scripts and run-time code compilation, which the Claude Design export of
`index.html` needs (React from unpkg.com, `new Function`). So the build rewrites the main page as plain HTML with
nothing external; the map library is inlined from `scripts/vendor/`. The project pages are plain already.

## Hosting

Going to **Azure**, per the standing all-projects-to-Azure decision (no Vercel/Supabase as the
target). Which Azure shape to pick and the one IT ticket to open are worked out in
[`scripts/AZURE-HOSTING-BRIEF.md`](scripts/AZURE-HOSTING-BRIEF.md).

A throwaway presentation link exists at **https://wise-portfolio-v2.vercel.app** — mock-up host
only. Do not point a domain at it or treat it as this repo's target.

## Things worth knowing

- `index.html` is a flat export: every image and font lives in `assets/`, referenced by a UUID
  filename (e.g. `assets/7de569c3-….png`). That's expected — it was unpacked from a Claude Design
  "bundled page" into plain files.
- **One external runtime dependency:** `index.html` dynamically imports
  `https://esm.sh/dotted-map@2.2.1` (the hero world-map). It is wrapped in try/catch (the page
  survives if it fails), but it is an **unpinned third-party import** — it can go blank behind a
  strict corporate proxy, and it's a supply-chain item worth a security look before go-live.
- Fonts are the local **WuerthSans** webfonts in `assets/` — served locally, no Google-Fonts/CDN.
- A harmless `404 /.image-slots.state.json` appears in the console: a leftover probe from the
  Claude Design image-slot editor baked into the export. It does not affect the page.
- `.gitattributes` disables CRLF conversion so diffs show only real content changes.

## Layout

```
index.html            <- the site (edit directly)
assets/               <- images + fonts, UUID-named, referenced by index.html
creative-platform/    <- promo / case-study page for the Creative Platform (self-contained)
design.config.json    <- page title + the throwaway mock-up host
scripts/
  build_sharepoint.py   <- builds the SharePoint upload set into sharepoint/
  AZURE-HOSTING-BRIEF.md
```

---

## สรุปสั้นๆ

- เว็บ portfolio แบบ **static หน้าเดียว**: `index.html` + `assets/` ไม่มี build ไม่มี framework
- **แก้ไฟล์ตรงนี้ได้เลย** — เมื่อก่อนเป็น mirror ของ Claude Design (ห้ามแก้มือ) ตอนนี้เลิกแล้ว
  (เปลี่ยน 2026-11-19) แก้ที่ repo นี้โดยตรง สคริปต์ sync เก่าเอาออกแล้ว
- พรีวิว: `python -m http.server 4173 --bind 127.0.0.1` แล้วเปิด <http://localhost:4173>
- ปลายทางจริงคือ **Azure** (วิธีเลือกโฮสต์อยู่ใน `scripts/AZURE-HOSTING-BRIEF.md`) ส่วนลิงก์ vercel
  เป็นแค่ที่พรีเซนต์ชั่วคราว อย่าผูกโดเมน
- **เพิ่มโปรเจกต์:** การ์ดแต่ละอันมีปุ่ม **View detail** กดแล้วเปิดหน้าของโปรเจกต์ในแท็บใหม่ และปุ่มแดง **Platform ↗** ไปที่ตัวแพลตฟอร์ม (โชว์เฉพาะโปรเจกต์ที่มีลิงก์) ไม่มี modal / วิดีโอในหน้า portfolio แล้ว
  ถ้าใช้ Claude Code พิมพ์สั่งได้เลย เช่น *"add FASTY"* สกิล `add-project-detail` จะถามข้อมูล เขียนการ์ด ผูกลิงก์ และเช็กให้ หรือทำเอง:
  1. แก้ข้อความในการ์ดของโปรเจกต์นั้น (แก้แค่ข้อความ)
  2. หน้าโปรเจกต์ → HTML ไฟล์เดียว ที่ `<โฟลเดอร์>/index.html` ไม่ดึงอะไรจากข้างนอก ใส่โลโก้แท็บ `../assets/favicon.svg`
  3. แก้ `PROJECT_PAGES` ใน `index.html` ให้ชี้ไปที่ไฟล์ (ต้องลงท้าย `index.html` ไม่ใช่แค่โฟลเดอร์) — `'#'` = ยังไม่มีหน้า การ์ดจะขึ้น "Detail coming soon" · ลิงก์แพลตฟอร์มใส่ที่ `PROJECT_PLATFORMS` (`'#'` = ซ่อนปุ่ม Platform)
  4. รัน `check_project.py <id>` เปิด `index.html` กด View detail เช็กว่าเปิดถูก แล้ว commit ใน branch + เปิด PR
- มี dependency นอกตัวเดียว: `esm.sh/dotted-map` (แผนที่โลกใน hero) มี try/catch กันพังไว้ แต่เป็น
  import ที่ไม่ pin เวอร์ชัน ควรให้ security ดูก่อน go-live
