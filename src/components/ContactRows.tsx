import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Email } from "./Email";
import { site } from "@/content/site";

/** Adresse, WhatsApp, E-Mail (und optional Telefon) wie im Footer. */
export function ContactRows({ on = "light", phone = false }: { on?: "light" | "dark"; phone?: boolean }) {
  const icon = `mt-1 size-5 shrink-0 stroke-[1.5] ${on === "dark" ? "text-gold" : "text-gold-ink"}`;
  const link = `underline-offset-4 hover:underline ${on === "dark" ? "hover:text-gold" : ""}`;
  return (
    <address className="space-y-4 not-italic">
      <p className="flex gap-3">
        <MapPin className={icon} aria-hidden />
        <span>
          <strong className={on === "dark" ? "text-white" : "text-navy"}>{site.name}</strong>
          <br />
          {site.address.street}
          <br />
          {site.address.zip} {site.address.city}
        </span>
      </p>
      {phone ? (
        <p className="flex gap-3">
          <Phone className={icon} aria-hidden />
          <a href={site.phone.href} className={link}>{site.phone.display}</a>
        </p>
      ) : null}
      <p className="flex gap-3">
        <MessageCircle className={icon} aria-hidden />
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>
          WhatsApp: {site.phone.display}
        </a>
      </p>
      <p className="flex gap-3">
        <Mail className={icon} aria-hidden />
        <Email />
      </p>
    </address>
  );
}
