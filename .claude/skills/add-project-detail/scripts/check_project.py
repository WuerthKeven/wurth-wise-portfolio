"""Check one project's wiring on the WISE portfolio site.

Usage (from the repo root):  python .claude/skills/add-project-detail/scripts/check_project.py <id>
Exit 0 = every check passes (WARN lines are things to confirm, not failures). Exit 1 = a FAIL.
"""
import os
import re
import sys

ROOT = os.getcwd()
INDEX = os.path.join(ROOT, "index.html")
EXTERNAL = re.compile(r'(?:src|href)\s*=\s*["\']https?://|url\(\s*["\']?https?://|import\(\s*["\']https?://', re.I)


def main():
    if len(sys.argv) != 2:
        print("usage: check_project.py <id>   e.g. check_project.py fasty")
        return 1
    pid = sys.argv[1]
    if not os.path.isfile(INDEX):
        print(f"FAIL  index.html not found in {ROOT} — run this from the repo root")
        return 1
    html = open(INDEX, encoding="utf-8").read()
    fails = 0

    def fail(step, msg):
        nonlocal fails
        fails += 1
        print(f"FAIL  [step {step}] {msg}")

    ids = re.findall(r'data-solpage="([a-z0-9-]+)"', html)
    if pid not in ids:
        fail(1, f'no card button data-solpage="{pid}". Existing: {", ".join(ids)}')
        return 1
    if not re.search(r'<div data-solcard="1" id="%s"' % re.escape(pid), html):
        fail(1, f'no card <div data-solcard="1" id="{pid}">')

    mm = re.search(r"PROJECT_PAGES\s*=\s*\{([^}]*)\}", html)
    kv = mm and re.search(r"\b%s\s*:\s*'([^']*)'" % re.escape(pid), mm.group(1))
    if not mm:
        fail(5, "PROJECT_PAGES map not found in index.html")
    elif not kv:
        fail(5, f"no '{pid}' key in PROJECT_PAGES")
    elif kv.group(1) == "#":
        print("WARN  [step 4] no project page yet (card shows 'Detail coming soon')")
    else:
        page = kv.group(1)
        if page.startswith("http"):
            print(f"ok    page -> {page} (external — confirm it opens inside the Würth network)")
        else:
            if not page.endswith(".html"):
                fail(5, f"'{page}' must point at a file, e.g. '{page.rstrip('/')}/index.html' — a folder link breaks when the site is opened from disk")
            path = os.path.join(ROOT, page)
            if not os.path.isfile(path):
                fail(4, f"project page '{page}' does not exist")
            else:
                text = open(path, encoding="utf-8", errors="replace").read()
                ext = EXTERNAL.findall(text)
                if ext:
                    fail(4, f"project page loads {len(ext)} resource(s) from outside hosts; make it self-contained")
                if "../assets/favicon.svg" not in text:
                    fail(4, 'project page is missing <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">')
                if 'href="../index.html"' not in text:
                    fail(4, 'project page has no back button to the portfolio (<a href="../index.html">) — copy the one in compass-page/index.html')
                if re.search(r"case study", text, re.I):
                    fail(4, 'project page still says "Case study" — remove it from the title, meta description and nav')
                mb = os.path.getsize(path) / 1e6
                if mb > 15:
                    print(f"WARN  [step 4] project page is {mb:.1f} MB — slow to open; shrink images/video")
                print(f"ok    page -> {page} ({mb:.1f} MB)")

    pm = re.search(r"PROJECT_PLATFORMS\s*=\s*\{([^}]*)\}", html)
    pk = pm and re.search(r"\b%s\s*:\s*'([^']*)'" % re.escape(pid), pm.group(1))
    if not pm:
        fail(5, "PROJECT_PLATFORMS map not found in index.html")
    elif not pk:
        fail(5, f"no '{pid}' key in PROJECT_PLATFORMS")
    elif pk.group(1) == "#":
        print("WARN  [step 5] no platform URL (Platform button hidden)")
    elif not pk.group(1).startswith("https://"):
        fail(5, f"platform URL '{pk.group(1)}' should be a full https:// address")
    else:
        print(f"ok    platform -> {pk.group(1)}")
    if f'data-solplatform="{pid}"' not in html:
        fail(5, f'card has no Platform button data-solplatform="{pid}"')

    print("PASS" if not fails else f"{fails} FAIL(s)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
