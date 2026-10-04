import type { Metadata } from "next";
import { absolute, asset } from "./base";
import { isIndexable } from "@/content/seo";

const siteName = "Masjid As-Sunnah Ratingen";
export const ogImage = { url: asset("/og-image.png"), width: 1200, height: 630, alt: siteName };

/** Titel, Beschreibung, Canonical, Open Graph, Twitter und robots für eine Seite. */
export function pageMeta({ path, title, description, absoluteTitle }: { path: string; title: string; description: string; absoluteTitle?: boolean }): Metadata {
  const full = absoluteTitle ? title : `${title} · ${siteName}`;
  const noindex = process.env.NEXT_PUBLIC_NOINDEX ? { index: false, follow: false } : !isIndexable(path) ? { index: false, follow: true } : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: asset(path) },
    robots: noindex,
    openGraph: { type: "website", locale: "de_DE", siteName, title: full, description, url: asset(path), images: [ogImage] },
    twitter: { card: "summary_large_image", title: full, description, images: [ogImage.url] },
  };
}

export { absolute };
