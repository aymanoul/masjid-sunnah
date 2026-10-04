import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { MessageCircle } from "lucide-react";
import { Button, Card, Heading, Label, Section, TodoChip } from "@/components/ui";
import { Watermark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { arabischStufen, quran } from "@/content/unterricht";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({ path: "/unterricht/", title: "Unterricht", description: "Arabisch-Unterricht in drei Stufen und Qur’an-Unterricht (Hifz) jeden Sonntag in der Masjid As-Sunnah in Ratingen." });

const wa = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;

export default function Unterricht() {
  return (
    <>
      <Section tone="navy" className="pt-20">
        <Watermark tone="white" opacity={0.05} className="-right-24 -top-10 w-[34rem]" />
        <div className="relative max-w-3xl">
          <Label on="dark">Unterricht</Label>
          <Heading as="h1" size="xl" on="dark" className="mt-6" first="Arabisch und" accent="Qur’an" after="lernen" />
          <p className="mt-8 max-w-xl text-lg text-white/85">
            Zwei Angebote in der Masjid As-Sunnah: Arabisch in drei Stufen und der Qur’an-Unterricht am Sonntag.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#arabisch" variant="gold">Arabisch</Button>
            <Button href="#quran" variant="outline-light">Qur’an</Button>
          </div>
        </div>
      </Section>

      <Section id="arabisch" tone="paper">
        <Reveal>
          <Label>Arabisch</Label>
          <Heading className="mt-6" first="Arabisch in drei" accent="Stufen" />
          <p className="mt-6 max-w-xl">Vom ersten Buchstaben bis zur Grammatik.</p>
        </Reveal>
        <ol className="mt-14 border-b border-navy/15">
          {arabischStufen.map((s, i) => (
            <li key={s.nr} className="border-t border-navy/15">
              <Reveal delay={i * 80}>
                <div className="grid gap-4 py-10 sm:grid-cols-12 sm:gap-8">
                  <p aria-hidden className="text-7xl font-black leading-none text-gold sm:col-span-2 sm:text-8xl">{s.nr}</p>
                  <div className="sm:col-span-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">Stufe {s.nr}</p>
                    <h3 className="mt-2 text-2xl">{s.titel}</h3>
                  </div>
                  <ul className="space-y-2 sm:col-span-6">
                    {s.punkte.map((p) => (
                      <li key={p} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-gold" />{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="quran" tone="navy">
        <Watermark tone="white" opacity={0.04} className="-bottom-24 -left-24 w-[30rem]" />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Label on="dark">Qur’an · Hifz</Label>
            <Heading className="mt-6" on="dark" first="Qur’an" accent="auswendig" after="lernen" />
            <p className="mt-6 text-white/85">Der Qur’an wird auswendig gelernt (Hifz), jeden Sonntag.</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <dl className="divide-y divide-white/15 border-y border-white/15">
              {[
                ["Wann", quran.wann],
                ["Für wen", quran.fuerWen],
                ["Was", quran.inhalt],
                ["Voraussetzung", quran.voraussetzung],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">{k}</dt>
                  <dd className="text-lg font-bold sm:col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-white/80">Du kannst noch nicht lesen? Starte mit dem Arabisch-Unterricht.</p>
          </Reveal>
        </div>
      </Section>

      <Section id="anmeldung" tone="stone">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Label>Anmeldung</Label>
            <Heading className="mt-6" first="Melde dich" accent="an" />
            <p className="mt-6">Schreib uns per WhatsApp.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={wa("Assalamu alaikum, ich möchte mich für den Arabisch-Unterricht anmelden.")} icon={<MessageCircle className="size-4" aria-hidden />}>Arabisch</Button>
              <Button href={wa("Assalamu alaikum, ich möchte mich für den Qur’an-Unterricht anmelden.")} variant="navy" icon={<MessageCircle className="size-4" aria-hidden />}>Qur’an</Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="grid gap-6 sm:grid-cols-3">
              {/* TODO: Angaben vom Vorstand: Uhrzeiten, Kosten, Altersgruppen (Arabisch: nur Kinder oder auch Erwachsene?), Anmeldeweg */}
              {["Uhrzeiten", "Kosten", "Altersgruppen"].map((t) => (
                <Card key={t} tone="paper" className="p-6">
                  <h3 className="text-lg">{t}</h3>
                  <p className="mt-3"><TodoChip>folgt</TodoChip></p>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
