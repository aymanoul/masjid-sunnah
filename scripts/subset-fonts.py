#!/usr/bin/env python3
"""Erzeugt kleine Schrift-Teilmengen (nur die im Quelltext benutzten Sonderzeichen) und src/app/fonts.generated.css.

Warum: Die vollständigen Fontsource-Dateien für Montserrat latin-ext (70 KB) und Amiri Arabisch (108 KB) laden schon
beim ersten Aufruf, nur weil ein paar Zeichen (ā, ū, ī, das Bismillah) auf der Seite stehen. Das bremst den ersten Aufbau.
Die Teilmengen sind ein Bruchteil davon. Zeichen außerhalb der Teilmenge laden weiter aus den vollständigen Fontsource-Dateien.

Aufruf (nur nötig, wenn neue Sonderzeichen oder arabischer Text dazukommen):  python3 scripts/subset-fonts.py
Benötigt: pip install fonttools brotli
"""
import re, pathlib
from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
src_text = "".join(p.read_text(encoding="utf-8") for p in (root / "src").rglob("*") if p.suffix in {".ts", ".tsx"} and "generated" not in p.name)
fs = root / "node_modules"
AMIRI = fs / "@fontsource/amiri/files/amiri-arabic-400-normal.woff2"
MONT = fs / "@fontsource-variable/montserrat/files/montserrat-latin-ext-wght-normal.woff2"
PRATA = fs / "@fontsource/prata/files/prata-latin-400-normal.woff2"
out = root / "src/fonts"

def cps(chars): return sorted({ord(c) for c in chars})
def in_ranges(c, ranges): return any(a <= c <= b for a, b in ranges)

# Montserrat latin-ext: alle Zeichen aus dem Quelltext im Bereich Latin Extended (ohne das, was schon in der Basis-Datei steckt: U+02BB-02BC)
EXT = [(0x100, 0x2BA), (0x2BD, 0x2C5), (0x1E00, 0x1EFF)]
margin = "ĀāĪīŪūḤḥḌḍṢṣṬṭẒẓḲḳ"  # Reserve für weitere Transliteration (Qur’an-Begriffe)
latin_ext = [c for c in cps(src_text + margin) if in_ranges(c, EXT)]

# Amiri Arabisch: nur das Arabische aus dem Quelltext (ohne U+FDFA, das bekommt eine eigene Mini-Datei)
base = list(range(0x621, 0x64B)) + list(range(0x64B, 0x656)) + [0x640, 0x670, 0x671, 0x60C, 0x61B, 0x61F, 0x6A9, 0x6CC, 0x200C, 0x200D, 0x20, 0xA0]
arabic = sorted({c for c in cps(src_text) if 0x600 <= c <= 0x6FF or 0x750 <= c <= 0x77F or 0xFB50 <= c <= 0xFDF9 or 0xFE70 <= c <= 0xFEFF} | {0x20})  # nur Benutztes; neue arabische Zeichen laden aus der vollen Fontsource-Datei
pbuh = [0xFDFA]
# Prata (nur Zitate): Grundlateinisch, Umlaute und typografische Anführungszeichen
prata = list(range(0x20, 0x7F)) + cps('ÄÖÜäöüß„“‚‘’–—·…')

def build(font, name, codepoints, features="*"):
    opts = subset.Options(); opts.flavor = "woff2"; opts.layout_features = [features]; opts.hinting = False
    opts.notdef_outline = True; opts.glyph_names = False; opts.name_IDs = [1, 2, 3, 4, 6]; opts.drop_tables += ["DSIG"]
    f = TTFont(str(font)); s = subset.Subsetter(opts); s.populate(unicodes=codepoints); s.subset(f)
    f.flavor = "woff2"; f.save(str(out / name)); return (out / name).stat().st_size

def rng(c):
    c = sorted(c); parts = []; a = b = c[0]
    for x in c[1:]:
        if x == b + 1: b = x
        else: parts.append((a, b)); a = b = x
    parts.append((a, b)); return ",".join(f"U+{x:04X}" if x == y else f"U+{x:04X}-{y:04X}" for x, y in parts)

sizes = {
    "montserrat-latin-ext-subset.woff2": build(MONT, "montserrat-latin-ext-subset.woff2", latin_ext),
    "amiri-arabic-subset.woff2": build(AMIRI, "amiri-arabic-subset.woff2", arabic),
    "amiri-pbuh.woff2": build(AMIRI, "amiri-pbuh.woff2", pbuh),
    "prata-latin-subset.woff2": build(PRATA, "prata-latin-subset.woff2", prata),
}
css = f"""/* AUTOMATISCH ERZEUGT von scripts/subset-fonts.py. Nicht von Hand ändern. */
/* Teilmenge Montserrat latin-ext: nur die benutzten Zeichen ({len(latin_ext)}). Alles andere lädt weiter aus Fontsource. */
@font-face {{
  font-family: "Montserrat Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url("../fonts/montserrat-latin-ext-subset.woff2") format("woff2-variations");
  unicode-range: {rng(latin_ext)};
}}
/* ﷺ (U+FDFA) steckt in keiner Montserrat-Datei: kommt als Mini-Datei aus Amiri, damit es im Fließtext ohne Amiri-Download klappt. */
@font-face {{
  font-family: "Montserrat Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url("../fonts/amiri-pbuh.woff2") format("woff2");
  unicode-range: U+FDFA;
}}
/* Teilmenge Amiri Arabisch ({len(arabic)} Zeichen) für Bismillah und weiteren arabischen Text. */
@font-face {{
  font-family: "Amiri";
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url("../fonts/amiri-arabic-subset.woff2") format("woff2");
  unicode-range: {rng(arabic)};
}}
/* Teilmenge Prata (Zitate): Grundlateinisch und Umlaute. Anderes lädt aus Fontsource. */
@font-face {{
  font-family: "Prata";
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url("../fonts/prata-latin-subset.woff2") format("woff2");
  unicode-range: {rng(prata)};
}}
"""
(root / "src/app/fonts.generated.css").write_text(css, encoding="utf-8")
for k, v in sizes.items(): print(f"{k}: {v/1024:.1f} KB")
print(f"latin-ext: {len(latin_ext)} Zeichen: {''.join(chr(c) for c in latin_ext)}")
print(f"arabisch: {len(arabic)} Zeichen")
