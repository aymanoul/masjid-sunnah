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
