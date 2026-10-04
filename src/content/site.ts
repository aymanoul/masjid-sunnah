// Verbindliche Fakten. Nur hier ändern.
export const site = {
  name: "Masjid As-Sunnah",
  nameAr: "مسجد السنة",
  city: "Ratingen",
  url: "https://masjid-sunnah.de",
  association: "Marokkanischer Kultur Verein Ratingen e.V.",
  register: "Amtsgericht Düsseldorf, VR 20667",
  chairman: "Ahmed Bouraada",
  address: { street: "Am Westbahnhof 31", zip: "40878", city: "Ratingen" },
  phone: { display: "+49 163 6831832", href: "tel:+491636831832" },
  whatsapp: "https://wa.me/491636831832",
  email: { user: "kontakt", domain: "masjid-sunnah.de" },
  social: {
    instagram: "https://www.instagram.com/sunnahmoschee", // TODO: URL gegen echten Kanal prüfen
    tiktok: "https://www.tiktok.com/@sunnahmoschee", // TODO: URL gegen echten Kanal prüfen
    youtube: "https://www.youtube.com/@sunnahmoschee", // TODO: URL gegen echten Kanal prüfen
  },
  donate: {
    holder: "Marokkanischer Kultur Verein Ratingen e.V.",
    iban: "DE35 3345 0000 0042 3034 95",
    purpose: "Neubau",
    paypal: "https://paypal.me/MasjidSunnaRatingen",
  },
} as const;

export const nav = [
  { href: "/gebetszeiten/", label: "Gebetszeiten" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/unterricht/", label: "Unterricht" },
  { href: "/neubau/", label: "Neubau" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;
