import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource/prata/400.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { asset } from "@/lib/base";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Masjid As-Sunnah Ratingen", template: "%s · Masjid As-Sunnah Ratingen" },
  description: "Masjid As-Sunnah in Ratingen: Gebetszeiten, Unterricht und Neubau-Projekt.",
  icons: {
    icon: [
      { url: asset("/icons/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/icons/favicon-16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: asset("/icons/apple-touch-icon.png"),
  },
  applicationName: "Masjid As-Sunnah",
  appleWebApp: { capable: true, title: "Masjid As-Sunnah", statusBarStyle: "black-translucent" },
  // Vorschau-Builds (GitHub Pages) werden nicht von Suchmaschinen indexiert.
  robots: process.env.NEXT_PUBLIC_NOINDEX ? { index: false, follow: false } : undefined,
  // TODO (Phase 6): Open-Graph-Bild /og-image.png pro Seite, Schema.org Mosque
};

export const viewport: Viewport = { themeColor: "#212242", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
