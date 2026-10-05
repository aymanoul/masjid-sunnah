// Unterricht. Anmeldung und Fragen laufen ausschließlich über WhatsApp (src/content/site.ts).
export const arabischStufen = [
  { nr: 1, titel: "Buchstaben und erstes Lesen", punkte: ["Buchstaben lernen", "Erste Schritte im Lesen"] },
  { nr: 2, titel: "Lesen, Schreiben, Grundlagen", punkte: ["Leselektion: den Qur’an lesen", "Diktat und Schreiben", "Leichte, grundlegende Grammatik", "Religion nach Niveau, zum Beispiel Verhalten gegenüber Familie und Eltern, Säulen des Islams"] },
  { nr: 3, titel: "Grammatik und Erziehung", punkte: ["Grammatik", "Islamische Erziehung"] },
] as const;

export const quran = {
  wann: "Jeden Sonntag",
  fuerWen: "Für jeden, Männer und Frauen getrennt",
  voraussetzung: "Arabisch lesen können",
  inhalt: "Auswendiglernen (Hifz)",
};
