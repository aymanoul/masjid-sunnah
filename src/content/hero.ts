// Hero der Startseite. Einstellungen ohne Code-Kenntnisse änderbar.
export const hero = {
  alt: "Gebetsnische der Masjid As-Sunnah in Ratingen: eine helle Wand mit Kalligrafie-Tafel, darunter die Nische mit einem blauen Gebetsteppich, links ein Tisch mit Mikrofon.",

  // Fokuspunkt des Bildausschnitts (CSS object-position: „x y“ in Prozent).
  // Kleinere y-Werte zeigen mehr vom oberen Bildrand, größere mehr vom unteren.
  focus: { mobile: "50% 22%", desktop: "50% 30%" },

  // Höhe der Bildfläche im Hero. Der Rest darunter ist das tiefe Navy (#1A2136), in das das Bild ausläuft.
  // Mobil kürzer, damit die Gebetsnische oberhalb der Headline sichtbar bleibt.
  imageHeight: { mobile: "68%", desktop: "100%" },
} as const;
