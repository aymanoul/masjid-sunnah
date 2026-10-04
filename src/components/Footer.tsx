import Link from "next/link";
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Email } from "./Email";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "./icons";
import { nav, site } from "@/content/site";

const social = [
  { href: site.social.instagram, label: "Instagram @sunnahmoschee", Icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok @sunnahmoschee", Icon: TiktokIcon },
  { href: site.social.youtube, label: "YouTube @sunnahmoschee", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="on-dark bg-navy-900 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo tone="white" height={96} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Ein Ort des Gebets, des Wissens und der Gemeinschaft in Ratingen. Offen für alle Geschwister.
          </p>
          <ul className="mt-6 flex gap-2">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-light">Seiten</h2>
          <ul className="mt-5 space-y-1 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-block py-1.5 hover:text-gold">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/spenden/" className="inline-block py-1.5 hover:text-gold">Spenden</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-light">Kontakt</h2>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
              <span>{site.address.street}<br />{site.address.zip} {site.address.city}</span></p>
            <p className="flex gap-3"><Phone className="size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
              <a href={site.phone.href} className="hover:text-gold">{site.phone.display}</a></p>
            <p className="flex gap-3"><MessageCircle className="size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp schreiben</a></p>
            <p className="flex gap-3"><Mail className="size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden /><Email className="hover:text-gold" /></p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-6 text-xs sm:px-8">
          <p>© {new Date().getFullYear()} {site.association} · VR 20667</p>
          <ul className="flex items-center gap-6">
            <li><Link href="/impressum/" className="hover:text-gold">Impressum</Link></li>
            <li><Link href="/datenschutz/" className="hover:text-gold">Datenschutz</Link></li>
            <li>
              <a href="#top" className="inline-flex items-center gap-1.5 hover:text-gold">
                Nach oben <ArrowUp className="size-4" strokeWidth={1.5} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
