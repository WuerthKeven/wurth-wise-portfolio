"""Build the SharePoint set: three single-file pages whose links point at each other's SharePoint address.

    python scripts/build_sharepoint.py            (from the repo root; writes sharepoint/)

Upload the three files in sharepoint/ into the Documents library folder named FOLDER, keeping the file names.

Why the main page is rebuilt: index.html is a Claude Design export. Its runtime loads React from unpkg.com and
compiles the page script with `new Function`; SharePoint's file viewer blocks both, so the page stays blank
("A script didn't run correctly"). main_static() turns it into plain HTML + plain script with nothing external:
the runtime's few template conventions are applied here, and the dotted-map library is inlined from scripts/vendor/.
"""
import base64, mimetypes, os, re, sys
from urllib.parse import quote

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO, "sharepoint")
SITE = "https://witglobal.sharepoint.com/sites/CollaborationRegionalE-BusinessAsia"
LIB = "/sites/CollaborationRegionalE-BusinessAsia/Freigegebene Dokumente"
FOLDER = "WISE-Portal"
MAIN, CREATIVE, COMPASS = "wise-portfolio.html", "wurth-creative-platform.html", "wurth-compass.html"
PROPS = "{defaultTheme:'light',autoRotateGlobe:true,revealOnScroll:true}"   # the defaults in the export's data-props


def sp(name):
    """Address that opens a library file in SharePoint's viewer."""
    parent = "%s/%s" % (LIB, FOLDER)
    return "%s/Freigegebene%%20Dokumente/Forms/AllItems.aspx?id=%s&parent=%s" % (SITE, quote(parent + "/" + name, safe=""), quote(parent, safe=""))


def data_uri(path):
    ext = os.path.splitext(path)[1]
    mime = {".woff2": "font/woff2", ".woff": "font/woff", ".webp": "image/webp"}.get(ext) or mimetypes.guess_type(path)[0] or "application/octet-stream"
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(path, "rb").read()).decode())


def read(rel):
    return open(os.path.join(REPO, rel), encoding="utf-8", newline="").read()


def once(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:70])
    return s.replace(old, new)


def main_static(s):
    """index.html without the Claude Design runtime."""
    # 1. scripts that need the runtime or React go; the page logic stays (step 6)
    s, n = re.subn(r'<script src="assets/[A-Za-z0-9-]+\.js"></script>\n?', "", s)
    assert n == 4, n
    # 2. the map library, inlined instead of imported from esm.sh
    lib = read("scripts/vendor/dotted-map-2.2.1.bundle.mjs")
    lib = once(lib, "export{O0 as default};", "window.__WISE_DOTMAP=O0;window.dispatchEvent(new Event('wise-dotmap-ready'));")
    lib = re.sub(r"//# sourceMappingURL=\S+", "", lib).replace("</script", "<\\/script")
    s, n = re.subn(r'<script type="module">.*?</script>',
                   lambda m: "<script>try{(function(){%s})();}catch(e){console.warn('WISE map lib failed to load',e);window.__WISE_DOTMAP_ERR=true;}</script>" % lib, s, count=1, flags=re.S)
    assert n == 1
    # 3. wrapper tags only the runtime understands
    for tag in ("<x-dc>", "</x-dc>", "<helmet>", "</helmet>"):
        s = once(s, tag, "")
    s = s.replace("<sc-raw-select", "<select").replace("</sc-raw-select>", "</select>")
    s = s.replace("sc-camel-view-box=", "viewBox=").replace("sc-camel-preserve-aspect-ratio=", "preserveAspectRatio=")
    s = once(s, 'ref="{{ bindRoot }}"', 'id="wise-root"')
    assert "{{" not in s.split('<script type="text/x-dc"')[0]
    # 4. style-hover="…" becomes a :hover rule (!important, because the resting style is inline)
    rules = {}
    def hover(m):
        css = m.group(2)
        cls = rules.setdefault(css, "hv%d" % len(rules))
        return '%s class="%s"' % (m.group(1), cls)
    s, n = re.subn(r'(<[a-z][^>]*?)\sstyle-hover="([^"]*)"', hover, s)
    assert n >= 40 and "style-hover=" not in s, n
    css = "".join(".%s:hover{%s}" % (cls, ";".join(d.strip() + " !important" for d in decl.split(";") if d.strip())) for decl, cls in rules.items())
    s = once(s, "</head>", "<style>%s</style>\n</head>" % css)
    # 5. the editor's image slots become plain images
    s, n = re.subn(r'<image-slot\b[^>]*\ssrc="([^"]+)"[^>]*></image-slot>',
                   lambda m: '<img src="%s" alt="" style="display:block;width:100%%;height:100%%;object-fit:cover;">' % m.group(1), s)
    assert n == 4 and "<image-slot" not in s, n
    # 6. the page logic as a plain script: a two-line base class, then mount it on the root
    s, n = re.subn(r'<script type="text/x-dc"[^>]*>', "<script>\nclass DCLogic{constructor(props){this.props=props||{};}}\n", s)
    assert n == 1
    tail = "}\n</script>\n\n\n</body></html>"
    assert s.endswith(tail), repr(s[-60:])
    s = s[:-len(tail)] + ("}\n(function(){var c=new Component(%s);c.bindRoot(document.getElementById('wise-root'));c.componentDidMount();})();\n</script>\n</body></html>" % PROPS)
    return s


def build():
    os.makedirs(OUT, exist_ok=True)
    favicon = data_uri(os.path.join(REPO, "assets", "favicon.svg"))

    s = main_static(read("index.html"))
    s = re.sub(r'assets/([A-Za-z0-9._-]+\.(?:png|webp|woff2|woff|svg))', lambda m: data_uri(os.path.join(REPO, "assets", m.group(1))), s)
    s = once(s, "creative:'creative-platform/index.html'", "creative:'%s'" % sp(CREATIVE))
    s = once(s, "compass:'compass-page/index.html'", "compass:'%s'" % sp(COMPASS))
    left = re.findall(r'(?:src|href)="(?:assets/|https?://)[^"]*"|url\(["\']?assets/|import\(', s)
    assert not left, left[:3]                                   # nothing loads from a folder or from outside
    open(os.path.join(OUT, MAIN), "w", encoding="utf-8", newline="").write(s)

    for src, name in (("creative-platform/index.html", CREATIVE), ("compass-page/index.html", COMPASS)):
        p = read(src)
        p = once(p, 'href="../assets/favicon.svg"', 'href="%s"' % favicon)
        p = once(p, '<a href="../index.html" aria-label="Back to the WISE Portfolio"',
                 '<a href="%s" target="_blank" rel="noopener" aria-label="Back to the WISE Portfolio"' % sp(MAIN))
        assert "../" not in p, name
        open(os.path.join(OUT, name), "w", encoding="utf-8", newline="").write(p)

    for f in (MAIN, CREATIVE, COMPASS):
        print("%-30s %5d KB   %s" % (f, os.path.getsize(os.path.join(OUT, f)) // 1024, sp(f)))


if __name__ == "__main__":
    build()
