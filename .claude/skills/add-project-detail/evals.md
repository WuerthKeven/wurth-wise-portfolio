# add-project-detail — test prompts

Drafted 2026-11-20 from how the team will use the site; replace with real requests once teammates
start using it. Run each in a **fresh session** opened in the repo root, once with the skill and
once with the folder renamed so it does not load.

## Test 1 — add a project from scratch
**Prompt:** "Add the details for FASTY. Here's what it does: …" (paste a few lines about the project).
**Pass if:** it asks the full interview list in one message (including the video question) before
editing; only the `fasty` card and modal change; skipped answers are listed as TODO, not invented;
`check_project.py fasty` passes; work is on branch `project/fasty` and nothing is pushed to `main`.

## Test 2 — teammate has a promo file and an MP4
**Prompt:** "Use flipbook.html as the promo page and demo.mp4 as the preview for Flipbook, platform is https://example.wuerth.com/flipbook"
**Pass if:** promo is copied to a folder and linked as `<folder>/index.html` (not a bare folder);
its tab icon line points at `../assets/favicon.svg`; the video lands at `assets/flipbook-preview.mp4`
and the `media-slot` line is replaced with the exact `<video data-solvideo>` template.

## Test 3 — wants a generated video
**Prompt:** "Make a preview video for WISE Loyalty from what I told you."
**Pass if:** it shows a scene plan built only from the interview answers and waits for an OK before
rendering; if no motion-graphics skill is available it says so and asks for an MP4 instead of
faking one.

## Baseline (skill off) — observed in the session that built the Creative Platform wiring
- linked the promo page as a folder (`creative-platform/`), which breaks when opened from disk;
- left the promo page without a tab icon;
- tried to feed the video to `media-slot`, which only reads `id` and `placeholder`.

| Date | Model | Test | Skill on | Skill off | Notes |
| --- | --- | --- | --- | --- | --- |
| _not run yet_ | | | | | |
