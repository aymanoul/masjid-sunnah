# Offene Punkte

Stand: 5.10.2026. Nur was wirklich noch offen ist.

## Fotos
- [ ] **Neubau-Render** (Querformat, volle Auflösung): Startseite und `/neubau/` zeigen bis dahin einen sichtbaren Platzhalter („TODO: echtes Foto“). Einsetzen über `<Photo src=… />` in `src/app/page.tsx` und `src/app/neubau/page.tsx`.
- [ ] **Hero-Bild (optional):** Ab Tablet-Breite (768 px) nutzt der Hero das Querformat-Foto des Gebetsraums (`quellen/fotos/gebetsraum.jpg`), auf dem Handy das Hochformat (`quellen/fotos/hero.jpg`). Ein eigenes, besonders gutes Querformat-Foto mit mindestens 2400 px Breite könnte `gebetsraum.jpg` für den Hero ersetzen. Fokuspunkt und Bildhöhe: `src/content/hero.ts`.
- [ ] `aussen-eingang.jpg` wurde nicht geliefert.
- [ ] Keine erkennbaren Personen und keine Kinder auf der Seite, solange das nicht ausdrücklich bestätigt ist.

## Hosting
- [ ] **Anbieter, Zugang und DNS-Verwaltung** klären. Bis dahin läuft nur die GitHub-Pages-Vorschau (`aymanoul.github.io/masjid-sunnah/`). Der Deploy-Schritt für das echte Hosting fehlt in `.github/workflows/pages.yml`.
- [ ] **Kontaktformular:** bewusst nicht gebaut. Kontakt läuft über WhatsApp, E-Mail und Telefon. Ein Formular erst, wenn Hosting, Backend und Datenschutz geklärt sind (Platz: `src/app/kontakt/page.tsx`).

## Rechtliche Prüfung (nichts daran geändert)
- [ ] Impressum und Datenschutzerklärung stehen wörtlich wie auf der alten Seite. Rechtlich prüfen lassen:
  - Impressum zitiert TMG, das durch das DDG ersetzt wurde.
  - Datenschutz nennt nicht: Karte und „Route planen“ (öffnet Google Maps beim Klick), TikTok, MAWAQIT (Abruf nur beim Bauen, kein Kontakt des Besuchers), WhatsApp und Telefon als Kontaktweg, Hoster, ein späteres Formular.
  - Schema.org enthält die E-Mail im Klartext im HTML (Vorgabe). Sichtbar ist sie gegen Spam geschützt.

## Vor dem Livegang
- [ ] Vorschau-Schalter in `.github/workflows/pages.yml` entfernen (`NEXT_PUBLIC_NOINDEX`, `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`). Sonst sperrt `robots.txt` alles.
- [ ] Sobald der Neubau-Render da ist: `/` und `/neubau/` in `src/content/seo.ts` auf `indexable: true` setzen. `npm run check` meldet Widersprüche.
- [ ] `/styleguide/` entfernen.
- [ ] MAWAQIT einmal mit Netzzugang prüfen: `npm run mawaqit` muss „neue Daten geladen“ melden. Aus der Entwicklungsumgebung war der Abruf nicht möglich, es lief der Fallback (`data/mawaqit-confData.json`).
- [ ] In MAWAQIT die Jumuʻa-Zeit ab 25.10.2026 auf 13:00 stellen. Auf der Seite steht sie in `src/content/settings.ts`.
- [ ] Texte gegenlesen: Hero, Angebot, Neubau, Sadaqa Jariya (`src/app/neubau/page.tsx`), die fünf Dauerauftrag-Schritte (`src/app/spenden/page.tsx`).

## Hinweise (kein Handlungsbedarf)
- Gebetsdaten von MAWAQIT wurden unverändert übernommen. Auffälligkeiten dort: 17.8. Maghrib 20:51 (Nachbartage 20:57 und 20:53), 25.2. Dhuhr 12:48, 16 Tage identisch mit dem Vortag (u. a. 29.10., bleibt wie in MAWAQIT).
- Hijri-Datum nach Umm al-Qura, Wechsel um Mitternacht wie im gedruckten Plan.
- Schriften: bei neuen Sonderzeichen oder arabischem Text `python3 scripts/subset-fonts.py`, bei neuen Schriftgewichten `node scripts/font-fallbacks.mjs`.
- Lighthouse (simuliert): Desktop 100, mobil 95–98, einzelne Läufe der Startseite 88–91 durch Streuung der Simulation.
