# Phase 1: Analyse (Stand 2026-10-04)

## Alte Seite (aus der gelieferten HTML, nicht live abgerufen)
- Eine einzige statische HTML-Datei, CSS und JS inline. Legal-Seiten sind per JS ein-/ausgeblendete Sektionen (`showPage()`), keine eigenen URLs.
- Hinter Cloudflare (`/cdn-cgi/.../email-decode`, Turnstile). Hoster dahinter unbekannt. DNS: `2a03:4000:…` (Netcup-Adressraum), nur Indiz, nicht bestätigt.
- Kontaktformular: `method="post" action="#contact"`, Honeypot-Feld `website`, Cloudflare Turnstile. Die Verarbeitung läuft serverseitig auf dem Hoster (vermutlich PHP). Der Code dafür steht nicht in der HTML.
- Externe Requests ohne Einwilligung: Google Fonts (Cormorant Garamond, Amiri, IM Fell English SC), Cloudflare Turnstile (beim Laden), MAWAQIT-iframe im Hero. Das widerspricht der Datenschutzerklärung („keine externen Analysedienste“) und dem DSGVO-Anspruch. Die neue Seite lädt nichts davon vorab.
- TikTok: Klick-zum-Laden, 6 feste Video-IDs, zufällige Auswahl.
- Neubau-Slider referenziert `images/neubau-1.webp` … `neubau-6.webp`. Diese Bilder wurden nicht geliefert (TODO).
- Vereinsname steht in der Seite als „Marrokanischer Kulturverein“ (Falschschreibung) und als „Marokkanischer Kultur Verein Ratingen e.V.“ (korrekt, Impressum). Neu überall korrekt.
- Aktuelles: Eid-Gebet am Mittwoch, 27. Mai (vorbei) → Sektion bleibt weg.
- Stil: dunkelgrün/gold, IM Fell English SC, Emojis als Icons, Glow-Animation, „im Aufbau“-Texte, „Demnächst“-Liste. Das ist der zu vermeidende KI-Look.

## Rechtstexte
Wörtlich in `_incoming/alte-seite-text.txt` gesichert (Abschnitte „IMPRESSUM“ und „DATENSCHUTZERKLÄRUNG“). Nichts fehlt oder ist abgeschnitten.
Hinweise für dich, geändert wird nichts:
1. Impressum zitiert „§ 5 TMG“ und „§§ 7–10 TMG“. Das TMG wurde im Mai 2024 durch das DDG ersetzt. Das prüfst du mit deiner Rechtsberatung.
2. Die Datenschutzerklärung nennt weder Kontaktweg über WhatsApp/Telefon noch Karte, TikTok-Einbettung, MAWAQIT, Hoster-Namen oder Formular-Backend. Neu in der neuen Seite, nicht im alten Text: OpenStreetMap-Karte (Klick), TikTok (Klick), WhatsApp-Link. Ergänzungen nur nach deiner Freigabe (siehe TODO).
3. „Kontaktformular / E-Mail“ im Datenschutztext beschreibt nur E-Mail. Solange es kein Formular gibt, passt das.

## Logo-Prüfung (SVG bei 3× gegen PNG)
- **Alle gelieferten SVGs sind unbrauchbar.** Sie bestehen aus einem Vollflächen-Rechteck mit ausgeschnittenen Buchstaben (Pfad beginnt mit `M0,…L0,0L…` über den ganzen viewBox). Im Browser erscheint eine gefüllte Fläche statt der Schrift (horizontal-navy: goldene Fläche mit zwei Strichen). Dazu stimmt die Farbe nicht (Gold statt Navy).
- **Die PNGs sind sauber** und werden verwendet: `logo-horizontal-*.png` (2400×1147), `logo-gestapelt-*.png` (1341×1473), `kalligrafie-*.png` (1284×1265).
- Im gestapelten PNG sitzt im oberen Buchstabenbereich (mittig, Höhe der zweiten Zeile) ein kleiner grauer Schmierfleck. Er ist in navy und weiß vorhanden, also schon in der Vorlage. Prüfen und ggf. neu liefern.
- Es gibt kein Vektororiginal. Neue SVGs werden nicht erzeugt.

## Stack-Empfehlung
Next.js (App Router) + TypeScript + Tailwind, `output: 'export'`. Läuft auf jedem Hosting. Schriften selbst gehostet (`@fontsource`). Kein Formular-Backend vor Klärung des Hostings. Gebetszeiten per Build-Skript aus MAWAQIT, Fallback auf zuletzt gespeicherte Daten. Tägliche Neubauten über GitHub Action (Deployment-Weg hängt vom Hosting ab).
