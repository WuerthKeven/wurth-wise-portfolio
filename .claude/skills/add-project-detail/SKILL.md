---
name: add-project-detail
description: Adds or updates a project on the WISE portfolio site — interviews the teammate about the project, writes its card text, and links the card's "View detail" button to the project's own page (an HTML file they provide, or one built from their answers). Use when someone asks to add a project, update a project's card, or add or replace a project page on this site.
---

# Add a project

Each solution card has **View detail**, which opens the project's own page in a new tab, and —
when the project has one — a red **Platform ↗** button to its live platform. All the detail lives on that page; the portfolio itself shows only the card. The Creative
Platform (id `creative`, page `creative-platform/index.html`) is the finished reference.

## Never miss these

- **The site is opened by double-clicking `index.html`, not served.** Every link is a relative
  path to a file: `fasty-page/index.html`, never `fasty-page/`, which shows a folder listing.
- **Nothing may load from outside hosts** (the Würth network blocks most of them). A project page
  is one self-contained HTML file: fonts, images and video embedded or in the same folder.
- **Change only the chosen project's card.** Other projects stay byte-for-byte as they were.
- **Work on a branch and open a Pull Request.** Never push to `main`; Keven reviews before anything ships.
- **Finish only when `scripts/check_project.py <id>` passes.**

## Workflow

Copy and tick:

```
- [ ] 1. Pick the project id
- [ ] 2. Interview the teammate
- [ ] 3. Write the card text
- [ ] 4. Project page
- [ ] 5. Link the card
- [ ] 6. Check, view, commit on a branch
```

**1. Project id.** Existing ids: `fasty`, `creative`, `loyalty`, `knowledge`, `flipbook`, `rpa`.
A new project needs a new `<div data-solcard id="<id>">` (duplicate `creative`'s card, set
`data-pillars`) and an `<id>` key in `PROJECT_PAGES`. Confirm the id with the teammate.

**2. Interview.** Ask for all of this in one message, then wait. List anything they skip as TODO
instead of inventing it:
- name, and a one-line tagline
- pillar(s): Additional Sales, Branding, Customer Retention, Digital Processes
- the problem it solves (one sentence) and what it does (one sentence)
- the live platform URL, if there is one (for the **Platform ↗** button on the card)
- the project page: an HTML file they already have, or should one be built
- if one is built: what it should cover, and whether it should include a video (and if so, an
  MP4 they have or one to be made)

**3. Card text.** In that project's card, replace only the text: pillar tags, name, tagline, the
problem line and the solution line. Keep every tag, attribute and style. Tone: plain and concrete,
no hype words; match the other cards.

**4. Project page.** Fork:
- *They have a file* → copy it to `<id>-page/index.html` (keep an existing folder such as
  `creative-platform/`). Set its tab-icon line to
  `<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">`, remove every
  "Case study" label (title, meta description, nav pill), and put a back button first in its nav
  linking to `../index.html` — copy the `← WISE Portfolio` link from `compass-page/index.html`.
- *Build one* → model it on `creative-platform/index.html` (same structure, Würth styling, fonts
  embedded), filled only with the interview answers. Show the outline first and wait for an OK.
  A video goes inside the page: their MP4 in the same folder, or one made with a motion-graphics
  skill if this session has one (16:9, about 10 s, H.264 MP4 under 5 MB; show the scene plan and
  get an OK before rendering). If no such skill is available, say so and ask for an MP4.
- *None yet* → leave the link as `'#'`; the card shows "Detail coming soon".

**5. Link the card.** In `index.html`, search `PROJECT_PAGES` and set that id to the page path,
e.g. `fasty:'fasty-page/index.html'`. If the project has a live platform, set its URL in
`PROJECT_PLATFORMS` (just below) — that shows the red **Platform ↗** button beside View detail;
`'#'` keeps it hidden.

**6. Check, view, commit.**
- Run `python .claude/skills/add-project-detail/scripts/check_project.py <id>` from the repo root.
  If it reports a FAIL, fix that item and return to the step it names.
- Open `index.html` in a browser and click the card's **View detail**: the page opens in a new tab
  and renders fully; other cards are unchanged. If not, return to the step that owns it.
- Commit on a branch named `project/<id>`, push the branch, and open a Pull Request summarising
  what changed and any TODOs from the interview.

## Needs

- Python 3.8+ (python.org; on Windows the command is often `python`), standard library only.
- git with access to the repo.
- Optional: a motion-graphics skill for generated videos. Test prompts: [evals.md](evals.md).
