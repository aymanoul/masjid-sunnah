// Holt zur Build-Zeit die Gebetszeiten von MAWAQIT und schreibt src/content/prayer-calendar.json.
//
//  1. Lädt https://mawaqit.net/en/msjd-lsn-ratingen-40878-germany und liest das JSON-Objekt `confData` aus dem HTML
//     (Entsprechung zu Pythons raw_decode: ab der öffnenden Klammer wird das erste vollständige JSON-Objekt gelesen).
//  2. Klappt das, wird die Antwort in data/mawaqit-confData.json gespeichert (aktueller Fallback).
//  3. Klappt es nicht (offline, Seite geändert, Daten unvollständig), gibt das Skript eine WARNUNG aus und nutzt
//     data/mawaqit-confData.json. Der Build bricht dadurch nie ab.
//
// Aufruf: node scripts/mawaqit.mjs   (läuft automatisch vor `npm run build`)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

export const MAWAQIT_URL = "https://mawaqit.net/en/msjd-lsn-ratingen-40878-germany";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FALLBACK = resolve(root, "data/mawaqit-confData.json");
const OUT = resolve(root, "src/content/prayer-calendar.json");

/** Liest das erste vollständige JSON-Objekt nach `confData =` oder `confData:`. Gibt null zurück, wenn nichts Gültiges gefunden wird. */
export function extractConfData(html) {
  const m = /confData\s*[:=]\s*/.exec(html);
  if (!m) return null;
  const start = html.indexOf("{", m.index + m[0].length);
  if (start < 0 || start - (m.index + m[0].length) > 5) return null;
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      try { return JSON.parse(html.slice(start, i + 1)); } catch { return null; }
    }
  }
  return null;
}

/** Prüft, ob confData die Felder hat, die die Seite braucht. */
export function isValid(c) {
  const okMonth = (m, n) => m && typeof m === "object" && Object.values(m).length >= 28 && Object.values(m).every((d) => Array.isArray(d) && d.length === n && d.every((t) => /^\d\d:\d\d$/.test(t)));
  return !!c && Array.isArray(c.calendar) && c.calendar.length === 12 && c.calendar.every((m) => okMonth(m, 6)) &&
    Array.isArray(c.iqamaCalendar) && c.iqamaCalendar.length === 12 && c.iqamaCalendar.every((m) => okMonth(m, 5));
}

/** Schlüssel: [Fajr, Shurūq, Dhuhr, ʿAsr, Maghrib, ʿIshāʾ, Iqāma Fajr, Dhuhr, ʿAsr, Maghrib, ʿIshāʾ] pro Datum. */
export function build(c, fromYear) {
  const days = {};
  for (let t = Date.UTC(fromYear, 0, 1); t <= Date.UTC(fromYear + 1, 1, 28); t += 86400000) {
    const dt = new Date(t), mo = dt.getUTCMonth(), d = dt.getUTCDate();
    const b = c.calendar[mo]?.[String(d)], q = c.iqamaCalendar[mo]?.[String(d)];
    if (b && q) days[dt.toISOString().slice(0, 10)] = [...b, ...q];
  }
  return days;
}

async function fetchLive() {
  const res = await fetch(MAWAQIT_URL, { headers: { "user-agent": "Mozilla/5.0 (masjid-sunnah build)" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const conf = extractConfData(await res.text());
  if (!conf) throw new Error("confData im HTML nicht gefunden");
  if (!isValid(conf)) throw new Error("confData unvollständig oder Format geändert");
  return conf;
}

async function main() {
  let conf, source;
  try {
    conf = await fetchLive();
    source = "mawaqit";
    mkdirSync(dirname(FALLBACK), { recursive: true });
    writeFileSync(FALLBACK, JSON.stringify(conf));
    console.log("MAWAQIT: neue Daten geladen und als Fallback gespeichert.");
  } catch (e) {
    console.warn(`WARNUNG: MAWAQIT nicht erreichbar oder unlesbar (${e.cause?.code ?? e.message}). Verwende data/mawaqit-confData.json.`);
    if (existsSync(FALLBACK)) {
      conf = JSON.parse(readFileSync(FALLBACK, "utf8"));
      source = "datei";
      if (!isValid(conf)) { console.warn("WARNUNG: data/mawaqit-confData.json ist ungültig."); conf = null; }
    }
  }
  if (!conf) {
    if (existsSync(OUT)) { console.warn("WARNUNG: keine gültigen Daten. Behalte vorhandene src/content/prayer-calendar.json."); return; }
    throw new Error("Keine Gebetszeiten-Daten vorhanden (weder MAWAQIT noch Fallback-Datei).");
  }
  const year = +new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric" }).format(new Date());
  const out = {
    source, // "mawaqit" = frisch geladen, "datei" = Fallback-Datei
    generatedAt: new Date().toISOString(),
    timezone: conf.timezone ?? "Europe/Berlin",
    hijriAdjustment: conf.hijriAdjustment ?? 0,
    jumuaMawaqit: conf.jumua ?? null, // nur zur Information, maßgeblich ist src/content/settings.ts
    mosqueUrl: MAWAQIT_URL,
    days: build(conf, year),
  };
  writeFileSync(OUT, JSON.stringify(out));
  console.log(`prayer-calendar.json: ${Object.keys(out.days).length} Tage, Quelle: ${source}, hijriAdjustment ${out.hijriAdjustment}, MAWAQIT-Jumuʻa ${out.jumuaMawaqit}.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
