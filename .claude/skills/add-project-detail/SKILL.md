---
name: add-project-detail
description: Adds or updates a solution's detail on the WISE portfolio site — interviews the teammate about the project, writes the card and detail-modal text, wires the promo page and platform link, and offers to make a preview video from what they described. Use when someone asks to add a project, add or update a solution's detail, promo page, platform link or preview video on this site.
---

# Add a project's detail

The Creative Platform (id `creative`) is the finished reference. Every project must end up wired
exactly like it. Look at its card, its `data-solmodal="creative"` block and its entries in
`PLATFORM_URLS` / `PROMO_URLS` in `index.html` before changing anything.

## Never miss these

- **The site is opened by double-clicking `index.html`, not served.** Every link is a relative
  path to a file: `fasty-promo/index.html`, never `fasty-promo/`, which shows a folder listing.
- **Nothing may load from outside hosts** (the Würth network blocks most of them). A promo page
  must be one self-contained HTML file.
- **Ask before making a video.** Generating one is the teammate's call, never a default.
- **Change only the chosen project's card and modal.** Other projects stay byte-for-byte as they were.
- **Work on a branch and open a Pull Request.** Never push to `main`; Keven reviews before anything ships.
- **Finish only when `scripts/check_project.py <id>` passes.**

## Workflow

Copy and tick:

```
- [ ] 1. Pick the project id
- [ ] 2. Interview the teammate
- [ ] 3. Write the card + modal text
- [ ] 4. Promo page
- [ ] 5. Preview video (ask first)
- [ ] 6. Links
- [ ] 7. Check, view, commit on a branch
```

**1. Project id.** Existing ids: `fasty`, `creative`, `loyalty`, `knowledge`, `flipbook`, `rpa`.
A new project needs a new `<div data-solcard>` and a matching `<div data-solmodal="<id>">`
(duplicate `creative`'s; the comment above the first modal explains it) plus `<id>` keys in both
URL maps. Confirm the id with the teammate.

**2. Interview.** Ask for all of this in one message, then wait. Mark anything they skip as TODO
in your summary instead of inventing it:
- name, and a one-line tagline
- pillar(s): Additional Sales, Branding, Customer Retention, Digital Processes
- the business challenge (one or two sentences)
- what it delivers (3–4 points)
- who it is for (3–4 points)
- one illustrative example (one sentence, a concrete scene)
- the live platform URL, if there is one
- the promo page: an HTML file they already have, or should one be built
- a preview video: do they have an MP4, want one made from this information, or none

**3. Card + modal text.** Replace only the text in that project's card and modal. Keep every tag,
attribute and style. Follow `creative`'s section order (Business challenge → What it delivers →
Who it is for → Illustrative example). Tone: plain and concrete, no hype words; match the
existing projects' copy.

**4. Promo page.** Fork:
- *They have a file* → copy it to `<id>-promo/index.html` (keep an existing folder name such as
  `creative-platform/`). Set its tab icon line to
  `<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">`.
- *Build one* → model it on `creative-platform/index.html` (same structure, same Würth styling,
  fonts embedded), filled only with the interview answers. Show the teammate the outline first.
- *None* → leave the promo URL as `'#'`.

**5. Preview video.** Fork on what they answered:
- *They have an MP4* → copy it to `assets/<id>-preview.mp4`.
- *Make one* → if a motion-graphics skill is available in this session, use it: 16:9,
  1920×1080, about 10 s, H.264 MP4 under 5 MB, no sound needed (it plays muted). Base every frame
  on the interview answers, show the scene plan and get an OK before rendering. If no such skill
  is available, say so and ask for an MP4 instead.
- *None* → leave the `media-slot` as it is.

Then, in that project's modal, replace its placeholder line exactly (strict template; change only
`<id>` and the label):

```html
<video data-solvideo="1" src="assets/<id>-preview.mp4" muted loop playsinline controls preload="none" aria-label="<Name> demo video" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;"></video>
```

No script change is needed: opening the modal plays any `data-solvideo`, closing it pauses.

**6. Links.** In `index.html`, search `PLATFORM_URLS` and set that id in both maps. `'#'` keeps
a button inert; a real value opens in a new tab.

**7. Check, view, commit.**
- Run `python .claude/skills/add-project-detail/scripts/check_project.py <id>` from the repo root.
  If it reports a FAIL, fix that item and return to the step it names.
- Open `index.html` in a browser, click the project's **View detail**: video plays, both buttons
  go where they should, other projects unchanged. If not, return to the step that owns it.
- Commit on a branch named `project/<id>`, push the branch, and open a Pull Request summarising
  what changed and any TODOs from the interview.

## Needs

- Python 3.8+ (python.org; on Windows the command is often `python`), standard library only.
- git with access to the repo.
- Optional: a motion-graphics skill for generated videos. Test prompts: [evals.md](evals.md).
