import calendar from "@/content/prayer-calendar.json";

/** begin = Index der Beginn-Zeit, iq = Index der Iqāma im Tages-Array (Quelle: scripts/mawaqit.mjs). */
export const prayers = [
  { key: "fajr", name: "Fajr", begin: 0, iq: 6 },
  { key: "dhuhr", name: "Dhuhr", begin: 2, iq: 7 },
  { key: "asr", name: "ʻAsr", begin: 3, iq: 8 },
  { key: "maghrib", name: "Maghrib", begin: 4, iq: 9 },
  { key: "isha", name: "ʻIshāʼ", begin: 5, iq: 10 },
] as const;
export const SHURUQ = 1;

export const data = calendar as { source: "mawaqit" | "datei"; generatedAt: string; hijriAdjustment: number; days: Record<string, string[]> };

/** Aktuelle Wanduhrzeit in Deutschland, unabhängig von der Zeitzone des Geräts. */
export function berlinNow(d = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(d).map((x) => [x.type, x.value]),
  );
  return { date: `${p.year}-${p.month}-${p.day}`, secs: +p.hour * 3600 + +p.minute * 60 + +p.second };
}

export const addDays = (iso: string, n: number) => new Date(Date.parse(iso + "T12:00:00Z") + n * 86400000).toISOString().slice(0, 10);
const toSecs = (hhmm: string) => +hhmm.slice(0, 2) * 3600 + +hhmm.slice(3, 5) * 60;

/** Nächstes Gebet und Sekunden bis dahin. Nach ʻIshāʼ: Fajr von morgen. */
export function nextPrayer(now: { date: string; secs: number }) {
  const today = data.days[now.date];
  if (today) {
    for (const p of prayers) if (toSecs(today[p.begin]) > now.secs) return { prayer: p, tomorrow: false, left: toSecs(today[p.begin]) - now.secs };
  }
  const tm = data.days[addDays(now.date, 1)];
  if (!tm) return null;
  return { prayer: prayers[0], tomorrow: true, left: 86400 - now.secs + toSecs(tm[0]) };
}

export const hijriMonths = ["Muharram", "Safar", "Rabīʻ al-awwal", "Rabīʻ ath-thānī", "Jumādā al-ūlā", "Jumādā al-ākhira", "Rajab", "Shaʻbān", "Ramaḍān", "Shawwāl", "Dhū al-qaʻda", "Dhū al-ḥijja"];

/**
 * Hijri-Datum nach Umm al-Qura, nach Kalendertag (wie der gedruckte Plan: Monatswechsel um Mitternacht,
 * nicht bei Maghrib), verschoben um hijriAdjustment aus MAWAQIT.
 */
export function hijriParts(dateISO: string) {
  const d = new Date(Date.parse(addDays(dateISO, data.hijriAdjustment) + "T12:00:00Z"));
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }).formatToParts(d).map((x) => [x.type, x.value]));
  return { day: +p.day, month: +p.month, year: parseInt(p.year), monthName: hijriMonths[+p.month - 1] };
}
export const hijri = (iso: string) => {
  const h = hijriParts(iso);
  return `${h.day}. ${h.monthName} ${h.year}`;
};

/** Zeitumstellung am Tag? +1 = Sommerzeit beginnt (Uhr vor), −1 = Winterzeit beginnt (Uhr zurück), sonst 0. */
export function dstShift(dateISO: string) {
  const off = (iso: string) => {
    const noon = Date.parse(iso + "T12:00:00Z");
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hourCycle: "h23", hour: "2-digit" }).formatToParts(new Date(noon)).map((x) => [x.type, x.value]));
    return +p.hour - 12;
  };
  return off(dateISO) - off(addDays(dateISO, -1));
}

export const weekdayShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
export const weekday = (iso: string) => new Date(iso + "T12:00:00Z").getUTCDay();

export const fmtLeft = (s: number) => [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0")).join(":");
