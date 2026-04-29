#!/usr/bin/env nix-shell
#!nix-shell -i python3 -p python3Packages.rembg python3Packages.pillow python3Packages.onnxruntime

from pathlib import Path
from rembg import remove, new_session
from PIL import Image, ImageOps
import io

BG_COLOR = (19, 19, 37)   # site --bg: #131325
SIZE = (500, 500)
OUT_DIR = Path(__file__).parent.parent / "static/images/uploads"

# (src, dest, zoom, model, top_offset, left_shift, top_shift)
#
# zoom >= 1.0, top_offset=None → center crop (ImageOps.fit)
#   top_shift: added to center vertical position (positive = crop lower = subject moves up)
#   left_shift: added to center horizontal position (negative = subject moves right)
#
# zoom >= 1.0, top_offset=int → top-biased crop (scale by width, crop from top_offset px)
#   left_shift: adjusts horizontal position (negative = subject moves right)
#   top_shift: unused
#
# zoom < 1.0 → thumbnail preserving aspect ratio, centered on background
#
# model=None uses default u2net; "isnet-general-use" → better for complex backgrounds
# Models cached at ~/.local/share/.u2net/

photos = [
    # src                                                                                   dest                           zoom  model               top_offset  left_shift  top_shift
    ("/home/sam/Downloads/image (10).png",                                              "latheesan-kanesamoorthy.jpg",  1.8,  None,               None,       -50,        15),
    ("/home/sam/Downloads/image (11).png",                                              "andrew-westberg.jpg",          1.65, "isnet-general-use", None,       -25,        25),
    ("/home/sam/Downloads/475665821_1176816300537231_852931652625670758_n.jpg",         "chris-hockaday.jpg",           1.0,  None,               None,       30,         0),
    ("/home/sam/Downloads/sam-hat.jpg",                                                 "samuel-leathers.jpg",          1.05, None,               None,       0,          -15),
    ("/home/sam/Downloads/20250428_122737.jpg",                                         "david-kirshon.jpg",            1.2,  None,               40,         -55,        0),
    ("/home/sam/Downloads/8OOEz7Mx_400x400_1.jpg",                                     "ant.jpg",                      1.9,  "isnet-general-use", 125,        -10,        0),
    ("/home/sam/Downloads/solomon_headshot_bio.png",                                    "kyle-solomon.jpg",             1.1,  "isnet-general-use", None,       -30,        0),
]

for src, dest, zoom, model, top_offset, left_shift, top_shift in photos:
    print(f"Processing {dest}...")
    session = new_session(model) if model else None
    with open(src, "rb") as f:
        removed = remove(f.read(), session=session) if session else remove(f.read())
    fg = Image.open(io.BytesIO(removed)).convert("RGBA")

    bg = Image.new("RGBA", SIZE, BG_COLOR + (255,))

    if zoom >= 1.0:
        if top_offset is not None:
            # Top-biased crop: scale by width, crop from absolute top_offset
            new_w = int(SIZE[0] * zoom)
            new_h = int(fg.height * new_w / fg.width)
            fg = fg.resize((new_w, new_h), Image.LANCZOS)
            left = (new_w - SIZE[0]) // 2 + left_shift
            fg = fg.crop((left, top_offset, left + SIZE[0], top_offset + SIZE[1]))
        else:
            # Center crop: ImageOps.fit, with optional shifts
            target = (int(SIZE[0] * zoom), int(SIZE[1] * zoom))
            fg = ImageOps.fit(fg, target, method=Image.LANCZOS)
            left = (target[0] - SIZE[0]) // 2 + left_shift
            top  = (target[1] - SIZE[1]) // 2 + top_shift
            fg = fg.crop((left, top, left + SIZE[0], top + SIZE[1]))
        bg.paste(fg, (0, 0), fg)
    else:
        # Zoom out: thumbnail preserving aspect ratio, centered on background
        max_dim = int(max(SIZE) * zoom)
        fg.thumbnail((max_dim, max_dim), Image.LANCZOS)
        offset = ((SIZE[0] - fg.width) // 2, (SIZE[1] - fg.height) // 2)
        bg.paste(fg, offset, fg)

    out_path = OUT_DIR / dest
    bg.convert("RGB").save(out_path, "JPEG", quality=90)
    print(f"  → {out_path}")

print("Done.")
