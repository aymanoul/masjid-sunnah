import type { MetadataRoute } from "next";
import { absolute } from "@/lib/base";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Vorschau-Builds: komplett sperren.
  if (process.env.NEXT_PUBLIC_NOINDEX) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide/"] },
    sitemap: absolute("/sitemap.xml"),
  };
}
