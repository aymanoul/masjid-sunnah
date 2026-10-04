// Einstellungen, die ohne Code-Kenntnisse geändert werden können.

/**
 * Jumuʻa-Zeit. Jeder Eintrag gilt ab dem Datum "from" (inklusive) bis zum nächsten Eintrag.
 * Sommerzeit 14:00 bis zur Zeitumstellung am 25.10.2026, danach Winterzeit 13:00.
 * Neue Zeit eintragen: einfach eine Zeile mit neuem Datum hinzufügen.
 * (Laut MAWAQIT aktuell 14:00. 13:00 ab 25.10.2026 ist die Vorgabe des Vorstands.)
 */
export const jumua: { from: string; time: string }[] = [
  { from: "2000-01-01", time: "14:00" },
  { from: "2026-10-25", time: "13:00" },
];

export function jumuaFor(dateISO: string): string {
  let t = jumua[0].time;
  for (const j of jumua) if (j.from <= dateISO) t = j.time;
  return t;
}
