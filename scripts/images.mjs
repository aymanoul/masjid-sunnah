// Erzeugt zur Build-Zeit responsive Hero-Bilder (AVIF + WebP) aus quellen/fotos/hero.jpg.
// Das Original wird nicht verändert. Größen über die Originalbreite hinaus werden nicht erzeugt (kein Hochskalieren);
// stattdessen kommt die Originalbreite als größte Stufe dazu. Ergebnis: public/images/hero-<breite>.{avif,webp}
// und src/content/hero-images.json (Breiten und Maße für srcset).
import sharp from "sharp";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "quellen/fotos/hero.jpg");
const OUT = resolve(root, "public/images");
const WANTED = [640, 800, 1080, 1600, 2400]; // 800 passt zu typischen Handys (412 px × DPR 1,75), damit nicht gleich die 1080er-Datei geladen wird

if (!existsSync(SRC)) { console.warn("WARNUNG: quellen/fotos/hero.jpg fehlt, Hero-Bilder werden nicht erzeugt."); process.exit(0); }
// Zwei Varianten: Hochformat (Handy, quellen/fotos/hero.jpg) und Querformat (ab 768 px, quellen/fotos/gebetsraum.jpg).
const VARIANTS = [
  { key: "hero", src: resolve(root, "quellen/fotos/hero.jpg"), prefix: "hero" },
  { key: "wide", src: resolve(root, "quellen/fotos/gebetsraum.jpg"), prefix: "hero-wide" },
];
mkdirSync(OUT, { recursive: true });
const result = {};
for (const v of VARIANTS) {
  if (!existsSync(v.src)) { console.warn(`WARNUNG: ${v.src} fehlt, ${v.key}-Bilder werden nicht erzeugt.`); process.exit(0); }
  const meta = await sharp(v.src).rotate().metadata();
  const widths = [...new Set([...WANTED.filter((w) => w < meta.width), meta.width])].sort((a, b) => a - b);
  const fresh = widths.every((w) => ["avif", "webp"].every((e) => { const f = resolve(OUT, `${v.prefix}-${w}.${e}`); return existsSync(f) && statSync(f).mtimeMs > statSync(v.src).mtimeMs; }));
  if (!fresh) {
    for (const w of widths) {
      const img = () => sharp(v.src).rotate().resize({ width: w, withoutEnlargement: true });
      await img().avif({ quality: 42, effort: 6 }).toFile(resolve(OUT, `${v.prefix}-${w}.avif`));
      await img().webp({ quality: 72 }).toFile(resolve(OUT, `${v.prefix}-${w}.webp`));
    }
  }
  result[v.key] = { width: meta.width, height: meta.height, widths };
  console.log(`Hero-Bilder (${v.key}): ${widths.join(", ")} px${fresh ? " (aktuell)" : " (erzeugt)"}, Original ${meta.width}x${meta.height}.`);
}
writeFileSync(resolve(root, "src/content/hero-images.json"), JSON.stringify({ ...result.hero, wide: result.wide }, null, 2) + "\n");
