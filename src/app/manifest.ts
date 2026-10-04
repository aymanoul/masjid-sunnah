import type { MetadataRoute } from "next";
import { asset } from "@/lib/base";

export const dynamic = "force-static";

// Web-App-Manifest: Name und App-Icon (Kalligrafie weiß auf Navy). Das Icon-Motiv liegt in der Mitte
// (ca. 60 %), damit es auch als „maskable“ (rund/abgerundet zugeschnitten) nicht angeschnitten wird.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Masjid As-Sunnah",
    short_name: "Masjid As-Sunnah",
    description: "Masjid As-Sunnah Ratingen: Gebetszeiten, Unterricht und Neubau.",
    lang: "de",
    start_url: asset("/") ,
    scope: asset("/"),
    display: "standalone",
    background_color: "#212242",
    theme_color: "#212242",
    icons: [
      { src: asset("/icons/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
