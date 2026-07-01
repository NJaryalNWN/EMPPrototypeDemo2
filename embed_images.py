#!/usr/bin/env python3
"""
embed_images.py — bakes all screenshots into UX-Comparison-Report.html as base64.
Looks for each image in the project folder first, then at its original Desktop path.
"""
import re, base64
from pathlib import Path

PROJECT = Path(__file__).parent
HTML    = PROJECT / "UX-Comparison-Report.html"
pattern = re.compile(r'src="file:///([^"]+\.(png|jpg|jpeg|gif|webp|svg))"', re.IGNORECASE)

html = HTML.read_text(encoding="utf-8")
replaced, missing = 0, []

def replacer(m):
    global replaced
    original = Path("/" + m.group(1))
    # look in the project folder first (drag files here if Desktop is inaccessible)
    local = PROJECT / original.name
    path  = local if local.exists() else original if original.exists() else None
    if path is None:
        missing.append(str(original))
        return m.group(0)
    ext  = path.suffix.lstrip(".").lower()
    mime = "image/svg+xml" if ext == "svg" else f"image/{ext}"
    b64  = base64.b64encode(path.read_bytes()).decode()
    replaced += 1
    print(f"  embedded  {path.name}  ({path.stat().st_size // 1024} KB)")
    return f'src="data:{mime};base64,{b64}"'

HTML.write_text(pattern.sub(replacer, html), encoding="utf-8")
print(f"\nDone — {replaced} image(s) embedded into UX-Comparison-Report.html")
if missing:
    print(f"\nNOT FOUND ({len(missing)}) — copy these files into the project folder and re-run:")
    for p in missing:
        print(f"  {Path(p).name}")
