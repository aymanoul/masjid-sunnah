import type { MetadataRoute } from "next";
import { absolute } from "@/lib/base";
import { isIndexable, pages } from "@/content/seo";

export const dynamic = "force-static";

// Nur Seiten, die indexierbar sind (keine Platzhalter-TODOs, nicht intern). Siehe src/content/seo.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(pages).filter(isIndexable).map((path) => ({ url: absolute(path) }));
}
