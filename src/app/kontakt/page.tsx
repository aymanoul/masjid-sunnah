import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { ContactRows } from "@/components/ContactRows";
import { Watermark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { StandortKarte } from "@/components/StandortKarte";
import { Button, Heading, Label } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt zur Masjid As-Sunnah Ratingen: Adresse, Telefon, WhatsApp und E-Mail.",
};

export default function Kontakt() {
  return (
    <section className="grid min-h-[calc(100svh-5rem)] pt-20 lg:grid-cols-2">
      {/* Links: Navy mit Kalligrafie-Textur */}
      <div className="on-dark relative overflow-hidden bg-navy px-5 py-16 text-white sm:px-8 lg:px-16 lg:py-28">
        <Watermark tone="white" opacity={0.05} className="-bottom-20 -left-20 w-[30rem]" />
        <div className="relative max-w-md lg:ml-auto">
          <Label on="dark">Kontakt</Label>
          <Heading as="h1" size="lg" on="dark" className="mt-6" first="Schreib" accent="uns" />
          <p className="mt-6 text-white/85">Fragen zu Gebet, Unterricht oder Neubau? Am schnellsten erreichst du uns per WhatsApp.</p>
          <div className="mt-10 text-white/90"><ContactRows on="dark" phone /></div>
          <Button href={site.whatsapp} className="mt-10" size="lg" icon={<MessageCircle className="size-4" aria-hidden />}>WhatsApp öffnen</Button>
        </div>
      </div>

      {/* Rechts: Standort-Karte. TODO: Kontaktformular (Honeypot, DSGVO-Checkbox) erst, wenn Hosting/Backend und Datenschutz geklärt sind. */}
      <div className="bg-paper px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
        <Reveal className="flex h-full max-w-md flex-col justify-center lg:mr-auto">
          <Label>Standort</Label>
          <Heading className="mt-6" as="h2" size="md" first="So findest du" accent="uns" />
          <div className="mt-8"><StandortKarte /></div>
        </Reveal>
      </div>
    </section>
  );
}
