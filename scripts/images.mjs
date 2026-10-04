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
const meta = await sharp(SRC).rotate().metadata();
const widths = [...new Set([...WANTED.filter((w) => w < meta.width), meta.width])].sort((a, b) => a - b);
mkdirSync(OUT, { recursive: true });

const fresh = widths.every((w) => ["avif", "webp"].every((e) => { const f = resolve(OUT, `hero-${w}.${e}`); return existsSync(f) && statSync(f).mtimeMs > statSync(SRC).mtimeMs; }));
if (!fresh) {
  for (const w of widths) {
    const img = () => sharp(SRC).rotate().resize({ width: w, withoutEnlargement: true });
    await img().avif({ quality: 42, effort: 6 }).toFile(resolve(OUT, `hero-${w}.avif`));
    await img().webp({ quality: 72 }).toFile(resolve(OUT, `hero-${w}.webp`));
  }
}
const h = Math.round((meta.height / meta.width) * meta.width);
writeFileSync(resolve(root, "src/content/hero-images.json"), JSON.stringify({ width: meta.width, height: h, widths }, null, 2) + "\n");
console.log(`Hero-Bilder: ${widths.join(", ")} px${fresh ? " (aktuell)" : " (erzeugt)"}, Original ${meta.width}x${meta.height}.`);
