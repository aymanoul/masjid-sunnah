import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Building2, Landmark, School, Users } from "lucide-react";
import { BankCard } from "@/components/BankCard";
import { Photo } from "@/components/Photo";
import { Watermark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Button, Heading, IconBadge, Label, Section } from "@/components/ui";
import { bereiche, hadith } from "@/content/neubau";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({ path: "/neubau/", title: "Projekt Neubau", description: "Neubau einer Moschee in Ratingen: Gebetsräume, Bildung, Verwaltung und Gemeinschaft. So kannst du das Projekt unterstützen." });

const icons = { gebet: Landmark, bildung: School, verwaltung: Building2, gemeinschaft: Users } as const;

export default function Neubau() {
  return (
    <>
      <Section tone="navy" className="pt-20">
        <Watermark tone="white" opacity={0.05} className="-right-24 -top-10 w-[34rem]" />
        <div className="relative max-w-3xl">
          <Label on="dark">Projekt Neubau</Label>
          <Heading as="h1" size="xl" on="dark" className="mt-6" first="Ein neues" accent="Zuhause" after="für unsere Gemeinde" />
          <p className="mt-8 max-w-xl text-lg text-white/85">
            Wir planen den Neubau einer Moschee in Ratingen: ein vollständiges Gemeindezentrum mit Räumen für Gebet, Bildung, Verwaltung und Gemeinschaft.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#spenden" size="lg">Jetzt unterstützen</Button>
          </div>
        </div>
      </Section>

      <Section tone="paper" className="!pb-0">
        <Reveal>
          <div className="aspect-[16/8] min-h-56 w-full"><Photo todo="Neubau-Render in voller Auflösung (Querformat)" /></div>
        </Reveal>
      </Section>

      <Section id="bereiche" tone="paper">
        <Reveal>
          <Label>Was entsteht</Label>
          <Heading className="mt-6 max-w-2xl" first="Vier Bereiche unter" accent="einem Dach" />
        </Reveal>
        <div className="mt-14 border-b border-navy/15">
          {bereiche.map((b, i) => {
            const Icon = icons[b.key];
            return (
              <Reveal key={b.key} delay={i * 80}>
                <div className="grid gap-4 border-t border-navy/15 py-10 sm:grid-cols-12 sm:gap-8">
                  <div className="sm:col-span-2"><IconBadge><Icon aria-hidden /></IconBadge></div>
                  <h3 className="text-2xl sm:col-span-4">{b.titel}</h3>
                  <p className="sm:col-span-6">{b.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="stone">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Label>Hadith</Label>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-sans font-medium text-3xl leading-snug text-navy">
              „{hadith.text}“
              <footer className="mt-4 font-sans text-sm text-ink/80">{hadith.quelle}</footer>
            </blockquote>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <Label>Sadaqa Jariya</Label>
            <Heading className="mt-6" as="h2" size="md" first="Eine" accent="fortlaufende" after="Wohltat" />
            {/* TODO: Text von Vorstand/Imam gegenlesen lassen */}
            <p className="mt-6">
              Sadaqa Jariya heißt „fortlaufende Wohltat“. Eine Spende für ein Haus, in dem Menschen beten und lernen, wirkt weiter, solange dort Gutes geschieht.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="spenden" tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Label>Spenden</Label>
            <Heading className="mt-6" first="Unterstütze das" accent="Projekt" />
            <p className="mt-6">Einmalig oder regelmäßig, jeder Beitrag zählt. Als Verwendungszweck bitte „{site.donate.purpose}“ angeben.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={site.donate.paypal} size="lg">Mit PayPal spenden</Button>
              <Button href="/spenden/" size="lg" variant="outline-dark">Alle Spendenwege</Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}><BankCard /></Reveal>
        </div>
      </Section>
    </>
  );
}
