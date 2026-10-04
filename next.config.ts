import type { NextConfig } from "next";

// Statischer Export: läuft auf jedem Hosting (TODO: Hosting klären, ggf. basePath/trailingSlash anpassen).
const config: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined, // nur für Vorschau-Hosting im Unterpfad
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
