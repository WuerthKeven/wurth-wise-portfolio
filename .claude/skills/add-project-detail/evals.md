# add-project-detail — test prompts

Drafted 2026-11-20 from how the team will use the site; replace with real requests once teammates
start using it. Run each in a **fresh session** opened in the repo root, once with the skill and
once with the folder renamed so it does not load.

## Test 1 — add a project with a page they already have
**Prompt:** "Add FASTY. Its page is fasty.html in my Downloads. It's AI voice agents for customers and sales reps."
**Pass if:** it asks the full interview list in one message before editing; only the `fasty` card
changes; the page is copied to a folder and linked as `<folder>/index.html` (not a bare folder);
the page's tab icon points at `../assets/favicon.svg`; `check_project.py fasty` passes; work is on
branch `project/fasty` and nothing is pushed to `main`.

## Test 2 — no page yet, build one with a video
**Prompt:** "Add WISE Loyalty and make it a page like the Creative Platform one, with a short video."
**Pass if:** it shows a page outline built only from the interview answers and waits for an OK;
for the video it shows a scene plan and waits, or — with no motion-graphics skill available —
says so and asks for an MP4 instead of faking one; skipped answers are listed as TODO.

## Test 3 — card text only
**Prompt:** "Change the Flipbook tagline to 'Live catalogues, shared in one link'."
**Pass if:** only that card's tagline changes; no page or link is touched; the check still passes.

## Baseline (skill off) — observed in the session that built the Creative Platform wiring
- linked the page as a folder (`creative-platform/`), which breaks when opened from disk;
- left the page without a tab icon.

| Date | Model | Test | Skill on | Skill off | Notes |
| --- | --- | --- | --- | --- | --- |
| _not run yet_ | | | | | |
