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

    # modal exists and its block is isolated for the checks below
    m = re.search(r'<div data-solmodal="%s"' % re.escape(pid), html)
    ids = re.findall(r'<div data-solmodal="([a-z0-9-]+)"', html)
    if not m:
        fail(1, f"no modal data-solmodal=\"{pid}\". Existing: {', '.join(ids)}")
        return 1
    nxt = re.search(r'<div data-solmodal="', html[m.end():])
    block = html[m.start(): m.end() + (nxt.start() if nxt else len(html))]
    if f'data-soldetail="{pid}"' not in html:
        fail(1, f'no card button data-soldetail="{pid}" to open the modal')

    # URL maps
    def url_for(name):
        mm = re.search(name + r"\s*=\s*\{([^}]*)\}", html)
        if not mm:
            return None, f"{name} map not found in index.html"
        kv = re.search(r"\b%s\s*:\s*'([^']*)'" % re.escape(pid), mm.group(1))
        return (kv.group(1), None) if kv else (None, f"no '{pid}' key in {name}")

    plat, err = url_for("PLATFORM_URLS")
    if err: fail(6, err)
    elif plat == "#": print("WARN  [step 6] platform URL is still '#' (button inert)")
    else: print(f"ok    platform -> {plat}")

    promo, err = url_for("PROMO_URLS")
    if err: fail(6, err)
    elif promo == "#": print("WARN  [step 4] promo URL is still '#' (button inert)")
    elif promo.startswith("http"):
        print(f"ok    promo -> {promo} (external)")
    else:
        if not promo.endswith(".html"):
            fail(6, f"promo URL '{promo}' must point at a file, e.g. '{promo.rstrip('/')}/index.html' — a folder link breaks when the site is opened from disk")
        path = os.path.join(ROOT, promo)
        if not os.path.isfile(path):
            fail(4, f"promo file '{promo}' does not exist")
        else:
            page = open(path, encoding="utf-8", errors="replace").read()
            ext = EXTERNAL.findall(page)
            if ext: fail(4, f"promo page loads {len(ext)} resource(s) from outside hosts; make it self-contained")
            if "../assets/favicon.svg" not in page:
                fail(4, 'promo page is missing <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">')
            print(f"ok    promo -> {promo} ({os.path.getsize(path)//1024} KB)")

    # video
    vid = re.search(r'<video data-solvideo="1" src="([^"]+)"', block)
    if vid:
        vpath = os.path.join(ROOT, vid.group(1))
        if not os.path.isfile(vpath):
            fail(5, f"video '{vid.group(1)}' does not exist")
        else:
            mb = os.path.getsize(vpath) / 1e6
            if mb > 5: print(f"WARN  [step 5] video is {mb:.1f} MB (aim for under 5 MB)")
            print(f"ok    video -> {vid.group(1)} ({mb:.1f} MB)")
    elif "<media-slot" in block:
        print("WARN  [step 5] no preview video yet (media-slot placeholder still in the modal)")
    else:
        fail(5, "modal has neither a data-solvideo video nor the media-slot placeholder")

    # buttons
    if "data-solplatform" not in block: fail(6, "modal has no 'Go to platform' button (data-solplatform)")
    if f'data-solmore="{pid}"' not in block: fail(6, f"modal has no 'More detail' button with data-solmore=\"{pid}\"")

    print("PASS" if not fails else f"{fails} FAIL(s)")
    return 1 if fails else 0

if __name__ == "__main__":
    sys.exit(main())
