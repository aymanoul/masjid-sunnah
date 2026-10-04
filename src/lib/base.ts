// Unterpfad für Vorschau-Hosting (z. B. GitHub Pages: /masjid-sunnah). Auf der Hauptdomain leer lassen.
export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => base + path;
