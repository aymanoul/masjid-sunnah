import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BankCard } from "@/components/BankCard";
import { Watermark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Button, Heading, Label, Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({ path: "/spenden/", title: "Spenden", description: "Spenden für den Neubau und die Gemeinde der Masjid As-Sunnah Ratingen: per Überweisung, PayPal oder Dauerauftrag." });

const schritte = [
  "Öffne dein Online-Banking oder die Banking-App und wähle „Dauerauftrag anlegen“.",
  `Trage als Empfänger „${site.donate.holder}“ und die IBAN ein. Du kannst sie oben kopieren.`,
  "Wähle Betrag und Rhythmus, zum Beispiel monatlich.",
  `Schreibe als Verwendungszweck „${site.donate.purpose}“.`,
  "Bestätige den Dauerauftrag. Bei deiner Bank kannst du ihn jederzeit ändern oder beenden.",
];

export default function Spenden() {
  return (
    <>
      <Section tone="navy" className="pt-20">
        <Watermark tone="white" opacity={0.05} className="-right-24 -top-10 w-[34rem]" />
        <div className="relative max-w-3xl">
          <Label on="dark">Spenden</Label>
          <Heading as="h1" size="xl" on="dark" className="mt-6" first="Spenden:" accent="einmalig" after="oder regelmäßig" />
          <p className="mt-8 max-w-xl text-lg text-white/85">
            Jeder Beitrag zählt und ist eine Sadaqa Jariya, eine fortlaufende Wohltat.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Label>Einmalig</Label>
            <Heading className="mt-6" as="h2" size="md" first="Per Überweisung oder" accent="PayPal" />
            <div className="mt-8"><BankCard id="bank" /></div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <div className="rounded-sm bg-stone p-8">
              <h3 className="text-2xl">PayPal</h3>
              <p className="mt-3 text-sm">Spende direkt mit PayPal. Du wirst zu paypal.me weitergeleitet.</p>
              <Button href={site.donate.paypal} className="mt-6" size="lg">Mit PayPal spenden</Button>
              <p className="mt-6 text-sm">Oder an die PayPal-Adresse<br /><strong className="text-navy">paypalmasjidsunna@gmail.com</strong></p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="dauerauftrag" tone="stone">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Label>Regelmäßig</Label>
            <Heading className="mt-6" first="Per" accent="Dauerauftrag" />
            <p className="mt-6 max-w-sm">Mit einem Dauerauftrag unterstützt du die Gemeinde und den Neubau verlässlich. Auch kleine Beträge helfen.</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <ol className="divide-y divide-navy/15 border-y border-navy/15">
              {schritte.map((s, i) => (
                <li key={i} className="flex gap-5 py-5">
                  <span aria-hidden className="w-8 shrink-0 text-3xl font-black leading-none text-gold-deep">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
