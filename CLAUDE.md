# WISE Portfolio

Static site: `index.html` + `assets/`, edited directly in this repo (no build, no Claude Design sync).
It is presented by double-clicking `index.html`, so every link must be a relative path to a file.

Each solution card's **View detail** button opens that project's own page in a new tab
(`PROJECT_PAGES` in `index.html`); there is no detail modal or video on the portfolio itself.
To add or update a project, use the project skill `add-project-detail`
(`.claude/skills/add-project-detail/`). The Creative Platform (`creative`) is the reference.

Work on a branch and open a Pull Request; never push to `main`.
