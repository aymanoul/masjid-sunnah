// Misst pro Schriftgewicht, wie breit Montserrat gegenüber Arial läuft, und schreibt src/app/fallbacks.generated.css.
// Die Ersatzschrift (Arial) wird damit auf die Breite von Montserrat gestreckt, der Schriftwechsel verschiebt kein Layout (CLS).
// Nur nötig, wenn sich Schriften oder Gewichte ändern. Braucht Playwright + Chromium (nur lokal, nicht im Build).
// Aufruf: PLAYWRIGHT=/pfad/zu/playwright/index.mjs node scripts/font-fallbacks.mjs
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const font = pathToFileURL(resolve(root, "node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2")).href;
const SAMPLE = "Ein Ort des Gebets, des Wissens und der Gemeinschaft. Spenden: einmalig oder regelmäßig. Projekt Neubau unterstützen Unterricht Gebetszeiten";
const WEIGHTS = [300, 400, 500, 600, 700, 800, 900];
const ASC = 0.968, DESC = 0.251; // Montserrat ascent/descent (unitsPerEm 1000), aus @capsizecss/metrics

// Playwright ist keine Projektabhängigkeit: Pfad über PLAYWRIGHT=… angeben (z. B. globale Installation) oder lokal installieren.
const { chromium } = await import(process.env.PLAYWRIGHT || "playwright");
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium" });
const p = await b.newPage();
const dir = mkdtempSync(resolve(tmpdir(), "fb-"));
writeFileSync(resolve(dir, "t.html"), `<style>@font-face{font-family:M;src:url("${font}") format("woff2");font-weight:100 900}span{font-size:100px;white-space:nowrap;position:absolute}</style><span id=a>${SAMPLE}</span><span id=b>${SAMPLE}</span>`);
await p.goto(pathToFileURL(resolve(dir, "t.html")).href);
const rows = [];
for (const w of WEIGHTS) {
  const r = await p.evaluate(async ({ w }) => {
    await document.fonts.load(`${w} 100px M`);
    const a = document.getElementById("a"), c = document.getElementById("b");
    a.style.fontFamily = "M"; a.style.fontWeight = w;
    c.style.fontFamily = "Arial, 'Liberation Sans', Helvetica, sans-serif"; c.style.fontWeight = w;
    return { m: a.getBoundingClientRect().width, f: c.getBoundingClientRect().width };
  }, { w });
  const adj = r.m / r.f;
  rows.push({ w, adj });
}
await b.close();
const pct = (x) => (Math.round(x * 1000) / 10).toFixed(1) + "%";
let css = "/* AUTOMATISCH ERZEUGT von scripts/font-fallbacks.mjs. Nicht von Hand ändern. */\n/* Ersatzschrift pro Gewicht, auf die gemessene Breite von Montserrat gestreckt. */\n";
for (const { w, adj } of rows) {
  const bold = w >= 600;
  css += `@font-face {\n  font-family: "Montserrat Fallback";\n  font-weight: ${w};\n  src: ${bold ? 'local("Arial Bold"), local("Arial-BoldMT"), local("Helvetica Bold"), local("Liberation Sans Bold")' : 'local("Arial"), local("Helvetica"), local("Liberation Sans")'};\n  size-adjust: ${pct(adj)};\n  ascent-override: ${pct(ASC / adj)};\n  descent-override: ${pct(DESC / adj)};\n  line-gap-override: 0%;\n}\n`;
  console.log(`Gewicht ${w}: size-adjust ${pct(adj)}`);
}
writeFileSync(resolve(root, "src/app/fallbacks.generated.css"), css);
