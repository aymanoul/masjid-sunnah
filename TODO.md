# Offene Punkte (wird laufend gepflegt)

Im Code sind dieselben Stellen als sichtbares `TODO:` markiert.

## Von Ayman zu liefern
- [ ] **Hosting:** Anbieter, Paket, Zugangsart, DNS-Verwaltung. Bis dahin statischer Export ohne Hosting-Annahmen.
- [ ] **Kontaktformular:** bewusst nicht gebaut. Bis dahin WhatsApp, mailto, Telefon. Platz im Layout bleibt reserviert.
- [ ] **Fotos:** innen, außen, Unterricht, Gemeinde. Bis dahin Platzhalter `TODO: echtes Foto`. Keine erkennbaren Personen, keine Kinder, bis ausdrücklich bestätigt.
- [ ] **Neubau-Render** in voller Auflösung. Auf dem alten Server liegen `images/neubau-1…6.webp` (nicht geliefert).
- [ ] **Spendenziel, Stand, Datum** (Neubau). Bis dahin kein Fortschrittsbalken, keine Zahlen.
- [ ] **Betriebskosten pro Monat:** bis dahin kein Block „Was der Betrieb kostet“.
- [ ] **Unterricht:** Uhrzeiten, Kosten, Altersgruppen, Anmeldeweg (bis dahin WhatsApp).
- [ ] **Aktuelles:** aktuell keine Veranstaltung → Sektion ausgeblendet.
- [ ] **Social-Designs** als Referenz (Flyer, Reel-Cover, Gebetszeiten-Tabelle).
- [ ] **Gründungsjahr 1997:** nicht bestätigt, steht nicht auf der Seite.
- [x] **Logo:** neues Paket (v2) eingebaut. SVGs rendern bei 1x und 3x korrekt, grauer Fleck ist weg. Header und Footer nutzen die weiße SVG.
- [ ] **Repo `masjid-sunnah`:** konnte ich nicht anlegen. Aufbau liegt im Ordner `masjid-sunnah/` auf Branch `claude/practical-wright-d1vge6`.

## Rechtlich prüfen lassen (nichts daran geändert)
- [ ] Impressum und Datenschutz bleiben wörtlich wie auf der alten Seite. Rechtlich prüfen lassen:
  - Impressum zitiert TMG. Das TMG wurde durch das DDG ersetzt.
  - Datenschutz nennt nicht: Karte (OpenStreetMap, Klick-zum-Laden), TikTok-Einbettung, MAWAQIT (Abruf zur Build-Zeit, kein Besucherkontakt), WhatsApp/Telefon als Kontaktweg, Hoster.
  - Der alte Text nennt Cloudflare Turnstile, Google Fonts und das MAWAQIT-iframe nicht. Die neue Seite lädt sie nicht.

## Freigaben

## Technisch
- [x] **MAWAQIT:** echte confData als Datenquelle und Fallback (`data/mawaqit-confData.json`). Live-Abruf aus dieser Umgebung nicht möglich (HTTP 403), der Abruf-Teil des Skripts ist daher nur gegen einen nachgebauten HTML-Ausschnitt getestet. Einmal lokal oder in der CI mit Netzzugang prüfen: `npm run mawaqit` muss „neue Daten geladen“ melden.
- [ ] **Jumuʿa:** 14:00 Uhr bis 25.10.2026, danach 13:00 Uhr (Winterzeit). Als Einstellung in `content/`. 29.10. = 28.10. in MAWAQIT, unverändert lassen.
- [ ] Open-Graph-Bild: `og-image-1200x630.png` geliefert, in Phase 6 einbinden.
- [ ] Favicons/Manifest: Icons geliefert, Manifest in Phase 6.

## Phase 2 (Design-System)
- [x] Screenshots der alten Seite gestrichen (Entscheidung Ayman). Phase 1 gilt als abgeschlossen, Texte aus `_incoming/alte-seite-text.txt`.
- [ ] **Social-URLs vor Livegang prüfen:** `src/content/site.ts` (Instagram, TikTok, YouTube @sunnahmoschee) sind aus dem Handle abgeleitet und nicht geprüft.
- [ ] `/styleguide/` vor dem Livegang entfernen (ist `noindex`).
- [ ] Mobile-Menü und Header sind nur mit Platzhalterseiten getestet. Zielseiten (`/gebetszeiten/`, `/unterricht/`, `/neubau/`, `/kontakt/`, `/spenden/`, `/impressum/`, `/datenschutz/`) entstehen in den Phasen 3–5. Bis dahin 404.

## Phase 3 (Startseite)
- [ ] **Fotos (Platzhalter mit sichtbarem „TODO: echtes Foto“):** Hero (Querformat, nicht aus dem Gebetsraum-Foto), Neubau-Render (Querformat, volle Auflösung). `aussen-eingang.jpg` wurde nicht geliefert. Gebetsraum-Foto ist eingebaut (Über uns, Gebetszeiten). In `src/app/page.tsx` über `<Photo src=… />` einsetzen. Keine erkennbaren Personen, keine Kinder.
- [x] **Standort-Karte:** umgesetzt als dekorative Karte ohne Embed (`StandortKarte`), „Route planen“ öffnet Google Maps erst beim Klick in neuem Tab. Datenschutz laut Vorgabe nicht ergänzt, bei der Prüfung mit erwähnen (externer Link zu Google).
- [ ] **Jumuʻa:** Einstellung in `src/content/settings.ts` (14:00 bis 24.10.2026, ab 25.10.2026 13:00).
- [ ] **Aktuelles:** `src/content/events.ts` ist leer, die Sektion ist ausgeblendet. Ein Eintrag mit Datum blendet sie ein.
- [ ] Hero-Headline, Angebots- und Neubau-Texte sind aus den Texten der alten Seite gekürzt/umformuliert (nicht die Rechtstexte). Bitte gegenlesen.
- [ ] Schreibweise: im Text steht `ʻ` (U+02BB) statt `ʿ`, weil Montserrat dieses Zeichen sauber darstellt.

## Phase 4 (Gebetszeiten)
- [ ] **Deployment des täglichen Builds:** `.github/workflows/daily-build.yml` baut täglich (03:17 UTC) und lädt `out/` als Artefakt hoch. Der Deploy-Schritt fehlt, bis das Hosting klar ist. Der Workflow läuft erst, wenn `masjid-sunnah/` das Repo-Wurzelverzeichnis ist.
- [ ] **Auffälligkeiten in den MAWAQIT-Daten (unverändert übernommen):**
  - 17.8.: Maghrib-Beginn 20:51 (Nachbartage 20:57 und 20:53), Iqāma 21:01 (Nachbartage 21:07 und 21:03). Wirkt wie ein Tippfehler in MAWAQIT.
  - Identisch zum Vortag: 7.1., 22.1., 6.2., 20.2., 1.3., 7.3., 9.3., 18.6., 22.6., 26.6., 3.7., 29.10., 12.11., 27.11., 12.12., 26.12. Der 29.10. bleibt wie vorgegeben.
  - Kalender enthält 29 Tage im Februar und gilt jahresunabhängig (Zeiten sind Tag/Monat-Werte, kein Jahr).
  - 25.2.: Dhuhr-Beginn 12:48 und Iqāma 12:58 (Nachbartage 12:46/12:56), kleine Abweichung.
- [ ] `announcements` (Instagram/TikTok/YouTube/PayPal-QR-Bilder von MAWAQIT) sind in `data/mawaqit-confData.json` nicht enthalten, die Seite braucht sie nicht.
- [ ] Hijri-Tageswechsel um Maghrib (optional) ist nicht gebaut. Wechsel erfolgt nach Kalendertag wie im gedruckten Plan.
- [ ] Jumuʻa: MAWAQIT meldet 14:00 (`jumuaMawaqit`). Maßgeblich ist `src/content/settings.ts` (13:00 ab 25.10.2026). MAWAQIT selbst muss ab 25.10. auf 13:00 gestellt werden, sonst weicht die App ab.
- [ ] Gebetszeiten-Seite ist druckbar (Strg+P), Layout für Papier noch nicht an den gedruckten Plan angeglichen.

## Phase 5 (Unterseiten)
- [ ] **Unterricht:** Uhrzeiten, Kosten, Altersgruppen (Arabisch: nur Kinder oder auch Erwachsene?) und Anmeldeweg fehlen, auf der Seite sichtbar als „TODO: folgt“. Anmeldung läuft bis dahin über WhatsApp mit vorbefülltem Text.
- [ ] **Spenden:** Verwendungszweck für laufende Kosten festlegen (sichtbares TODO auf `/spenden/`). Block „Was der Betrieb kostet“ fehlt bewusst, bis echte Zahlen vorliegen.
- [ ] **Neubau:** Render fehlt (Platzhalter), Spendenziel/Stand fehlen (kein Fortschrittsbalken). Text zu Sadaqa Jariya gegenlesen lassen (`src/app/neubau/page.tsx`).
- [ ] **Kontaktformular:** bewusst nicht gebaut (Hosting, Backend, Datenschutz offen). Platz ist als Kommentar in `src/app/kontakt/page.tsx` vermerkt. Rechts auf `/kontakt/` steht bis dahin die Standort-Karte.
- [ ] **Impressum/Datenschutz:** Text wörtlich übernommen und maschinell gegen die alte Seite geprüft. Einzige Abweichung: E-Mail-Adresse gegen Spam dargestellt (`kontakt [at] masjid-sunnah.de`, im Browser als Link). Weiter rechtlich prüfen lassen (siehe oben).
- [ ] **Ansprache „du“:** Auf der ganzen Seite jetzt „du“ (Vorgabe „So findest du uns“). Die Rechtstexte bleiben wörtlich bei „Sie“. Falls „Sie“ gewünscht ist: Texte in `src/app/**` und `src/components/StandortSection.tsx`.
- [ ] `font-mono` für die Koordinaten in `StandortKarte` ist keine Markenschrift (Systemschrift). Auf Wunsch auf Montserrat umstellen.
