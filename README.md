# Masjid As-Sunnah Ratingen – Website

Next.js (App Router) + TypeScript + Tailwind CSS 4, statischer Export (`out/`).

    npm install
    npm run dev      # Entwicklung
    npm run build    # statischer Export nach out/

- Inhalte/Fakten: `src/content/`
- Design-Tokens: `src/app/globals.css` (`@theme`)
- Bausteine: `src/components/`
- Logo-Dateien: `public/brand/` (nicht verändern, nur skalieren)
- Offene Punkte: `TODO.md`, Analyse: `ANALYSE.md`

## Gebetszeiten
- Quelle: MAWAQIT. `npm run mawaqit` lädt die Daten (läuft auch automatisch vor `npm run build`).
- Schlägt der Abruf fehl, gibt es eine Warnung und die Datei `data/mawaqit-confData.json` wird genutzt.
- Jumuʻa-Zeit ändern: `src/content/settings.ts`.
- Test: `npm test`.

## Skripte
| Befehl | Zweck |
|---|---|
| `npm run build` | Hero-Bilder erzeugen (`scripts/images.mjs`), MAWAQIT laden (`scripts/mawaqit.mjs`), statischer Export nach `out/` |
| `npm run check` | prüft `out/`: Links, externe Ressourcen, noindex/Sitemap, Metadaten |
| `npm test` | Parser-Test für MAWAQIT |
| `python3 scripts/subset-fonts.py` | Schrift-Teilmengen neu erzeugen |

## Vorschau und Livegang
Vorschau (GitHub Pages) baut mit `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_NOINDEX`, `NEXT_PUBLIC_SITE_URL`. Auf der Hauptdomain diese drei nicht setzen.
Indexierbare Seiten: `src/content/seo.ts`.
