import { site } from "@/content/site";

// Unterpfad für Vorschau-Hosting (z. B. GitHub Pages: /masjid-sunnah). Auf der Hauptdomain leer lassen.
export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => base + path;

// Ursprung für absolute URLs (Open Graph, Sitemap, Schema.org). Vorschau: NEXT_PUBLIC_SITE_URL setzen.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");
export const absolute = (path: string) => siteUrl + asset(path);
