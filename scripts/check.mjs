// Prüft den gebauten Export in out/ (nach `npm run build`):
//  1. Alle internen Links, Bilder, Skripte, Stylesheets und Anker zeigen auf Vorhandenes.
//  2. Beim Laden werden keine externen Ressourcen eingebunden (Skripte, Stylesheets, Bilder, iframes, Schriften).
//  3. Externe Links (nur Auflistung, es wird nichts aufgerufen).
//  4. noindex/Sitemap: /styleguide/ und Seiten mit sichtbarem „TODO:“ sind noindex und nicht in der Sitemap.
//  5. Metadaten je Seite: Titel, Beschreibung, Canonical, Open Graph.
// Aufruf: npm run check   (bei Vorschau-Builds mit denselben NEXT_PUBLIC_*-Variablen wie beim Build)
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)), "out");
if (!existsSync(root)) { console.error("out/ fehlt. Zuerst `npm run build`."); process.exit(1); }
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const preview = !!process.env.NEXT_PUBLIC_NOINDEX;

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const toRoute = (f) => { const r = "/" + relative(root, f).replace(/\\/g, "/"); return r.endsWith("/index.html") ? r.slice(0, -10) || "/" : r; };
const pages = new Map(htmlFiles.map((f) => [toRoute(f), readFileSync(f, "utf8")]));

const errors = [], warnings = [];
const external = new Map(); // url -> Set(Seiten)
const addExt = (u, page) => { if (!external.has(u)) external.set(u, new Set()); external.get(u).add(page); };

const visibleText = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const attr = (tag, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`, "i").exec(tag); return m ? m[1].replace(/&amp;/g, "&") : null; };
const exists = (p) => existsSync(join(root, p)) || existsSync(join(root, p, "index.html"));

for (const [route, html] of pages) {
  if (route === "/404.html") continue;
  for (const m of html.matchAll(/<(a|link|script|img|iframe|source|video|audio)\b[^>]*>/gi)) {
    const tag = m[0], name = m[1].toLowerCase();
    const urls = [];
    for (const a of ["href", "src"]) { const v = attr(tag, a); if (v) urls.push(v); }
    const ss = attr(tag, "srcset"); if (ss) ss.split(",").forEach((x) => urls.push(x.trim().split(/\s+/)[0]));
    for (const u of urls) {
      if (u.startsWith("data:") || u === "") continue;
      if (/^(mailto:|tel:)/.test(u)) { addExt(u, route); continue; }
      if (/^https?:\/\//.test(u)) {
        if (name === "a") addExt(u, route);
        else if (!(name === "link" && /rel="(canonical|alternate)"/.test(tag))) errors.push(`${route}: externe Ressource wird geladen (${name}): ${u}`);
        continue;
      }
      if (u.startsWith("#")) { if (u.length > 1 && !html.includes(`id="${u.slice(1)}"`)) errors.push(`${route}: Anker ${u} fehlt auf der Seite`); continue; }
      let path = u.split("?")[0]; const hash = u.includes("#") ? u.split("#")[1] : "";
      path = path.split("#")[0];
      if (base && path.startsWith(base)) path = path.slice(base.length) || "/";
      if (!path.startsWith("/")) { warnings.push(`${route}: relativer Link ${u}`); continue; }
      if (!exists(path)) { errors.push(`${route}: ${name} zeigt auf Nicht-Vorhandenes: ${u}`); continue; }
      if (hash) { const target = pages.get(path.endsWith("/") || path === "/" ? path : path + "/") ?? pages.get(path); if (!target || !target.includes(`id="${hash}"`)) errors.push(`${route}: Anker #${hash} fehlt auf ${path}`); }
    }
  }
}

// Manifest-Icons
try {
  const man = JSON.parse(readFileSync(join(root, "manifest.webmanifest"), "utf8"));
  for (const i of man.icons) { const p = base && i.src.startsWith(base) ? i.src.slice(base.length) : i.src; if (!exists(p)) errors.push(`manifest: Icon fehlt ${i.src}`); }
} catch { errors.push("manifest.webmanifest fehlt oder ist ungültig"); }

// Sitemap und noindex
const sitemap = existsSync(join(root, "sitemap.xml")) ? readFileSync(join(root, "sitemap.xml"), "utf8") : "";
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => { let p = m[1].replace(/^https?:\/\/[^/]+/, ""); if (base && p.startsWith(base)) p = p.slice(base.length); return p || "/"; }));
const robotsTxt = existsSync(join(root, "robots.txt")) ? readFileSync(join(root, "robots.txt"), "utf8") : "";
if (!preview && !/Disallow:\s*\/styleguide\//i.test(robotsTxt)) errors.push("robots.txt sperrt /styleguide/ nicht");
const rows = [];
for (const [route, html] of pages) {
  if (route === "/404.html") continue;
  const robots = /<meta name="robots" content="([^"]*)"/.exec(html)?.[1] ?? "";
  const noindex = /noindex/.test(robots);
  const todo = /TODO:/.test(visibleText(html));
  const inMap = inSitemap.has(route);
  const meta = { title: /<title>[^<]+<\/title>/.test(html), desc: /<meta name="description" content="[^"]+"/.test(html), canon: /<link rel="canonical"/.test(html), og: /property="og:image"/.test(html) };
  const rowRef = { route, noindex, todo, inMap, ...meta }; rows.push(rowRef);
  if (route === "/styleguide/" && (!noindex || inMap)) errors.push("/styleguide/ muss noindex sein und darf nicht in der Sitemap stehen");
  if (todo && (!noindex || inMap)) errors.push(`${route}: enthält sichtbare TODO-Platzhalter, ist aber ${!noindex ? "indexierbar" : ""}${inMap ? " und in der Sitemap" : ""}`);
  if (noindex && inMap) errors.push(`${route}: noindex, steht aber in der Sitemap`);
  if (!noindex && !inMap && !preview) warnings.push(`${route}: indexierbar, fehlt aber in der Sitemap`);
  const intern = ["/404/", "/_not-found/", "/styleguide/"].includes(route); // intern, noindex: kein Canonical nötig
  if (intern) meta.canon = true;
  if (!meta.title || !meta.desc || !meta.canon || !meta.og) errors.push(`${route}: Metadaten unvollständig (${Object.entries(meta).filter(([, v]) => !v).map(([k]) => k)})`);
}
for (const p of inSitemap) if (!pages.has(p)) errors.push(`Sitemap verweist auf fehlende Seite ${p}`);

const yn = (b) => (b ? "ja " : "nein");
console.log("\nSeite              noindex  TODO-Text  Sitemap  Titel  Beschr.  Canonical  OG-Bild");
for (const r of rows.sort((a, b) => a.route.localeCompare(b.route))) console.log(`${r.route.padEnd(18)} ${yn(r.noindex)}      ${yn(r.todo)}        ${yn(r.inMap)}      ${yn(r.title)}    ${yn(r.desc)}     ${yn(r.canon)}        ${yn(r.og)}`);
console.log(`\nExterne Links (nur Auflistung, nicht aufgerufen): ${external.size}`);
for (const [u, set] of [...external].sort()) console.log(`  ${u}\n      auf: ${[...set].join(", ")}`);
if (warnings.length) { console.log(`\nHinweise (${warnings.length}):`); warnings.forEach((w) => console.log("  - " + w)); }
if (errors.length) { console.log(`\nFEHLER (${errors.length}):`); errors.forEach((e) => console.log("  ✗ " + e)); process.exit(1); }
console.log("\nAlle Prüfungen bestanden.");
