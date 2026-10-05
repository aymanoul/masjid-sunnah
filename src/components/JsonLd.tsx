import { absolute } from "@/lib/base";
import { site } from "@/content/site";

/**
 * Schema.org „Mosque“: nur verbindliche Fakten (Name, Adresse, Telefon, E-Mail, Social-Profile, Koordinaten, Träger).
 * Keine Öffnungszeiten, Bewertungen oder Kursdaten.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Mosque",
    name: site.name,
    alternateName: site.nameAr,
    url: site.url,
    logo: absolute("/brand/logo-horizontal-navy.png"),
    telephone: site.phone.display,
    email: `${site.email.user}@${site.email.domain}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", latitude: 51.2991692, longitude: 6.8381131 },
    sameAs: [site.social.instagram, site.social.tiktok, site.social.youtube],
    parentOrganization: { "@type": "Organization", name: site.association },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
