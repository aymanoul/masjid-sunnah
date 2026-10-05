// Welche Seiten dürfen in Suchmaschinen und in die Sitemap?
// indexable: false = noindex + nicht in der Sitemap. Solange eine Seite sichtbare Platzhalter („TODO: …“) enthält
// oder intern ist, bleibt sie auf false. Vor dem Livegang prüfen: `npm run check` listet Widersprüche auf.
export const pages: Record<string, { indexable: boolean; grund?: string }> = {
  "/": { indexable: false, grund: "Foto-Platzhalter (Hero, Neubau-Render)" },
  "/gebetszeiten/": { indexable: true },
  "/unterricht/": { indexable: true },
  "/neubau/": { indexable: false, grund: "Neubau-Render fehlt" },
  "/spenden/": { indexable: true },
  "/kontakt/": { indexable: true },
  "/impressum/": { indexable: true },
  "/datenschutz/": { indexable: true },
  "/styleguide/": { indexable: false, grund: "intern, wird vor dem Livegang entfernt" },
};

/** Vorschau-Builds (NEXT_PUBLIC_NOINDEX) sind nie indexierbar. NEXT_PUBLIC_INDEX_ALL ist nur für Messungen (Lighthouse). */
export function isIndexable(path: string): boolean {
  if (process.env.NEXT_PUBLIC_NOINDEX) return false;
  if (process.env.NEXT_PUBLIC_INDEX_ALL) return path !== "/styleguide/";
  return pages[path]?.indexable ?? false;
}
