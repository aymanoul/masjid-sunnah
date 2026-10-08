import { asset } from "@/lib/base";

// Fotos der Moschee. Weitere Fotos hier eintragen und im Code über <Photo {...photos.name} /> einsetzen.
// Es werden nur echte Fotos der Gemeinde verwendet, keine Stock- oder KI-Bilder.
// Die WebP-Dateien in public/images/ sind aus den Originalen in quellen/fotos/ erzeugt (640, 960, 1280, 1920 px breit).
const webp = (name: string) => ({
  src: asset(`/images/${name}-1280.webp`),
  srcSet: [640, 960, 1280, 1920].map((w) => `${asset(`/images/${name}-${w}.webp`)} ${w}w`).join(", "),
});

export const photos = {
  gebetsraum: {
    ...webp("gebetsraum"),
    width: 1920,
    height: 1081,
    alt: "Gebetsraum der Masjid As-Sunnah: eine helle Gebetsnische mit blauem Gebetsteppich davor, links ein Tisch mit Mikrofon, rechts ein Aufsteller zum Projekt Neubau.",
  },
  gebetsnische: {
    ...webp("gebetsnische"),
    width: 1920,
    height: 1440,
    alt: "Die Gebetsnische mit weißem Rundbogen, darüber das Glaubensbekenntnis in arabischer Kalligrafie, links ein Regal mit Qur’an-Ausgaben und eine Wanduhr.",
  },
  saeulen: {
    ...webp("saeulen"),
    width: 1920,
    height: 1081,
    alt: "Der Gebetsraum mit hellen, gefliesten Säulen und türkisem Gebetsteppich, links eine Reihe Stühle.",
  },
  minbar: {
    ...webp("minbar"),
    width: 1920,
    height: 1081,
    alt: "Die hölzerne Kanzel (Minbar) mit türkisen Stufen in einer Ecke des Gebetsraums, daneben ein Bücherregal.",
  },
  quranRegal: {
    ...webp("quran-regal"),
    width: 1920,
    height: 1079,
    alt: "Qur’an-Ausgaben mit goldverzierten Buchrücken in einem weißen Regal.",
  },
  // WebP in 800/1600 px, dazu ein JPG als Rückfall für Browser ohne WebP (<picture>).
  unterrichtsraum: {
    src: asset("/images/unterrichtsraum-1600.webp"),
    srcSet: [800, 1600].map((w) => `${asset(`/images/unterrichtsraum-${w}.webp`)} ${w}w`).join(", "),
    jpg: asset("/images/unterrichtsraum.jpg"),
    width: 1600,
    height: 901,
    alt: "Unterrichtsraum der Masjid As-Sunnah Ratingen mit Tischen, Whiteboard und Leinwand",
  },
} as const;

/** Reihenfolge der Bildergalerie „Einblicke in die Moschee“. */
export const einblicke = [photos.gebetsraum, photos.gebetsnische, photos.saeulen, photos.minbar, photos.quranRegal, photos.unterrichtsraum];
