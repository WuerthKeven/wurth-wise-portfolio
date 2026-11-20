# Würth WISE Portfolio

The WISE portfolio / showroom website. **Status: mock-up.**

A single static page — `index.html` + `assets/`. No build step, no framework, no server code.

## Editing

**Edit `index.html` and the files in `assets/` directly, here in this repo.**

> This repo used to be a read-only *mirror* of a Claude Design export, synced by a script and never
> hand-edited. That is no longer true (changed 2026-11-19): the design is edited here now, and the
> Claude Design round-trip + its sync script are gone.

Preview locally:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

then open <http://localhost:4173>. (The Claude Code preview config named `wise-portfolio` runs the
same command.)

## Adding a project's detail (promo page, platform link, preview video)

Every solution card opens a detail modal with a preview video, **Go to platform** and
**More detail**. The Creative Platform (`creative`) is the finished reference — copy what it does.

The six solution ids are: `fasty`, `creative`, `loyalty`, `knowledge`, `flipbook`, `rpa`.

**1. Promo page (the "More detail" button)**
- Put the project's self-contained page at `<folder>/index.html` — e.g.
  `creative-platform/index.html`. One folder per project, one HTML file, no links to outside hosts
  (it must render inside the Würth network).

**2. Preview video (plays when the modal opens)**
- Save it as `assets/<id>-preview.mp4` — e.g. `assets/creative-platform-preview.mp4`.
  MP4 (H.264), 16:9, keep it short and small (the reference is 10 s / 3 MB).
- In `index.html`, find that project's placeholder line and replace it:

  ```html
  <!-- before -->
  <media-slot id="sol-fasty" placeholder="FASTY demo video"></media-slot>
  <!-- after -->
  <video data-solvideo="1" src="assets/fasty-preview.mp4" muted loop playsinline controls preload="none" aria-label="FASTY demo video" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;"></video>
  ```

  Nothing else is needed: the modal script plays any `data-solvideo` on open and pauses it on close.

**3. Links (both buttons)** — in `index.html`, search for `PLATFORM_URLS` and fill that project's id:

```js
const PLATFORM_URLS = { ..., creative:'https://3130-creative-platform.wgn.wuerth.com/home', ... };
const PROMO_URLS    = { ..., creative:'creative-platform/', ... };
```

A value left as `'#'` keeps the button inert; a real value opens in a new tab.

**4. Check it** — run the preview (below), click the project's **View detail**: the video plays,
both buttons go where they should, and the console shows no new errors. Then commit.

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
- **เพิ่ม detail ของโปรเจกต์อื่น** ให้ทำตาม Creative Platform (ดูหัวข้อ *Adding a project's detail*):
  1. หน้าโปรโมท → `<โฟลเดอร์>/index.html` (HTML ไฟล์เดียว ไม่ดึงอะไรจากข้างนอก)
  2. วิดีโอพรีวิว → `assets/<id>-preview.mp4` แล้วเปลี่ยนบรรทัด `<media-slot id="sol-<id>">` เป็น `<video data-solvideo="1" ...>`
  3. ลิงก์ → แก้ `PLATFORM_URLS` / `PROMO_URLS` ใน `index.html` ตาม id ของโปรเจกต์
  4. เปิดพรีวิว กด View detail เช็กว่าวิดีโอเล่น ปุ่มไปถูกที่ แล้วค่อย commit
- มี dependency นอกตัวเดียว: `esm.sh/dotted-map` (แผนที่โลกใน hero) มี try/catch กันพังไว้ แต่เป็น
  import ที่ไม่ pin เวอร์ชัน ควรให้ security ดูก่อน go-live
