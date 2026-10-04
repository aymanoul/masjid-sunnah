import type { Metadata } from "next";
import { BookOpen, Building2, Clock, GraduationCap, HandHeart, Landmark, MapPin, Moon, Users } from "lucide-react";
import { Logo, Watermark } from "@/components/Logo";
import { Arches, Button, Card, Heading, IconBadge, Label, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const colors = [
  { name: "navy", hex: "#212242", use: "Headlines, dunkle Flächen, Footer, Buttons", dark: true },
  { name: "navy-900", hex: "#16172E", use: "Header, Overlays, Hover", dark: true },
  { name: "gold", hex: "#CA9E4E", use: "Akzent, Primär-Button, Linien (Text nur auf Navy)", dark: false },
  { name: "gold-light", hex: "#D6B880", use: "Feine Linien, Labels auf Navy", dark: false },
  { name: "gold-deep", hex: "#A57B2B", use: "Große Headline-Akzente auf Hell (≥ 3:1)", dark: true },
  { name: "gold-ink", hex: "#84601C", use: "Labels/Text auf Hell (≥ 4.5:1)", dark: true },
  { name: "stone", hex: "#EDEBE6", use: "Warme helle Sektionen", dark: false },
  { name: "paper", hex: "#F8F9FB", use: "Standard-Hintergrund", dark: false },
  { name: "blue", hex: "#345CA0", use: "Sparsam: Sekundär-Akzent, Fokus-Ring", dark: true },
  { name: "ink", hex: "#24284A", use: "Fließtext", dark: true },
];

// WCAG-Kontrast, zur Build-Zeit berechnet.
function lum(h: string) {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const pairs: [string, string, string, number][] = [
  ["Fließtext (ink) auf Paper", "#24284A", "#F8F9FB", 4.5],
  ["Navy auf Stone", "#212242", "#EDEBE6", 4.5],
  ["Gold-ink auf Stone (Labels)", "#84601C", "#EDEBE6", 4.5],
  ["Gold-ink auf Weiß", "#84601C", "#FFFFFF", 4.5],
  ["Gold-deep auf Paper (große Headline)", "#A57B2B", "#F8F9FB", 3],
  ["Gold auf Navy", "#CA9E4E", "#212242", 4.5],
  ["Gold-light auf Navy (Labels)", "#D6B880", "#212242", 4.5],
  ["Navy auf Gold (Button)", "#212242", "#CA9E4E", 4.5],
  ["Weiß auf Navy-900", "#FFFFFF", "#16172E", 4.5],
  ["Gold (Rohwert) auf Weiß, nicht für Text", "#CA9E4E", "#FFFFFF", 4.5],
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-navy/10 py-12">
      <Label>{title}</Label>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function Styleguide() {
  return (
    <>
      <Section tone="navy" className="pt-20">
        <Watermark tone="white" opacity={0.05} className="-right-24 -top-10 w-[34rem]" />
        <div className="relative">
          <Label on="dark">Design-System</Label>
          <Heading as="h1" size="xl" on="dark" className="mt-6" first="Styleguide" accent="Masjid As-Sunnah" />
          <p className="mt-6 max-w-xl text-white/80">
            Interne Referenz. Farben, Schriften, Bausteine und Logo-Regeln. Die Seite ist nicht indexiert und wird vor dem Livegang entfernt (TODO).
          </p>
        </div>
      </Section>

      <Section>
        <Block title="Farben">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {colors.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-sm border border-navy/10 bg-white">
                <div className="h-24" style={{ background: c.hex }} />
                <div className="p-4 text-sm">
                  <p className="font-bold text-navy">{c.name}</p>
                  <p className="font-mono text-xs text-ink/70">{c.hex}</p>
                  <p className="mt-2 text-xs leading-snug text-ink/80">{c.use}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-12 text-lg">Kontraste (WCAG AA)</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead><tr className="border-b border-navy/20 text-xs uppercase tracking-wider text-ink/70"><th className="py-2 pr-4">Paarung</th><th className="py-2 pr-4">Verhältnis</th><th className="py-2">Ziel</th></tr></thead>
              <tbody>
                {pairs.map(([n, f, b, min]) => {
                  const r = ratio(f, b);
                  const ok = r >= min;
                  return (
                    <tr key={n} className="border-b border-navy/10">
                      <td className="py-2 pr-4"><span className="mr-3 inline-block rounded-sm px-2 py-0.5 text-xs font-bold" style={{ color: f, background: b }}>Aa</span>{n}</td>
                      <td className="py-2 pr-4 font-mono">{r.toFixed(2)} : 1</td>
                      <td className="py-2">{ok ? `erfüllt (≥ ${min})` : `nicht erfüllt (≥ ${min}), nicht so verwenden`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="Typografie">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs text-ink/70">Montserrat 900/800 · Headlines</p>
              <p className="text-5xl font-black leading-none tracking-tight text-navy sm:text-6xl">Ein Ort des <span className="text-gold-deep">Gebets</span></p>
              <p className="text-xs text-ink/70">Montserrat 400/500 · Fließtext 17 px / 1.7</p>
              <p className="max-w-lg">Die Masjid As-Sunnah ist ein Ort des Gebets, der Bildung und des Zusammenhalts für Muslime in Ratingen. Wir orientieren uns an Qur&apos;an und Sunnah.</p>
              <p className="text-xs text-ink/70">Montserrat 600, Versalien, große Laufweite · Labels</p>
              <Label>Gebetszeiten</Label>
            </div>
            <div className="space-y-6">
              <p className="text-xs text-ink/70">Prata · nur Akzente, z. B. Zitate</p>
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl leading-snug text-navy">
                „Wer für Allah eine Moschee baut, dem baut Allah ein Haus im Paradies.“
                <footer className="mt-3 font-sans text-sm text-ink/80">Prophet Mohammed ﷺ · Sahih Muslim</footer>
              </blockquote>
              <p className="text-xs text-ink/70">Amiri · Arabisch, <code>lang=&quot;ar&quot; dir=&quot;rtl&quot;</code></p>
              <p lang="ar" dir="rtl" className="text-3xl text-navy">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            </div>
          </div>
        </Block>

        <Block title="Zweifarbige Headlines & Labels">
          <div className="space-y-10">
            <div><Label>Gebetszeiten</Label><Heading className="mt-4" first="Unsere" accent="Gebetszeiten" /></div>
            <div><Label>Unterricht</Label><Heading className="mt-4" size="md" first="Arabisch und" accent="Qur'an" after="lernen" /></div>
            <div className="on-dark bg-navy p-8"><Label on="dark">Neubau</Label><Heading className="mt-4" on="dark" first="Ein neues" accent="Zuhause" /></div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/spenden/">Spenden</Button>
            <Button href="/gebetszeiten/" variant="navy">Gebetszeiten</Button>
            <Button href="/neubau/" variant="outline-dark">Mehr zum Neubau</Button>
            <Button href="/spenden/" size="lg">Jetzt unterstützen</Button>
          </div>
          <div className="on-dark mt-6 flex flex-wrap gap-4 bg-navy p-6">
            <Button href="/spenden/">Spenden</Button>
            <Button href="/gebetszeiten/" variant="outline-light">Gebetszeiten</Button>
          </div>
        </Block>

        <Block title="Karten & Line-Icons">
          <div className="grid gap-6 md:grid-cols-3">
            <Card tone="stone"><IconBadge><Clock /></IconBadge><h3 className="mt-6 text-xl">Fünf Gebete</h3><p className="mt-2 text-sm">Täglich und Jumuʻa. Zeiten stehen aktuell auf der Gebetszeiten-Seite.</p></Card>
            <Card tone="paper"><IconBadge><GraduationCap /></IconBadge><h3 className="mt-6 text-xl">Unterricht</h3><p className="mt-2 text-sm">Arabisch in drei Stufen, Qur&apos;an jeden Sonntag.</p></Card>
            <Card tone="navy"><IconBadge on="dark"><Landmark /></IconBadge><h3 className="mt-6 text-xl !text-white">Neubau</h3><p className="mt-2 text-sm text-white/80">Ein Gemeindezentrum für Gebet, Bildung und Gemeinschaft.</p></Card>
          </div>
          <ul className="mt-8 flex flex-wrap gap-4 text-navy [&_svg]:size-7 [&_svg]:stroke-[1.5]">
            {[BookOpen, Building2, Clock, GraduationCap, HandHeart, Landmark, MapPin, Moon, Users].map((I, i) => (<li key={i} className="flex size-14 items-center justify-center rounded-sm border border-navy/10 bg-white"><I aria-hidden /></li>))}
          </ul>
          <p className="mt-3 text-xs text-ink/70">Lucide, Strichstärke 1.5, einheitlich. Keine Emojis.</p>
        </Block>

        <Block title="Ornament & Textur">
          <div className="on-dark relative h-72 overflow-hidden bg-navy">
            <Watermark tone="white" opacity={0.05} className="-left-10 top-1/2 w-[26rem] -translate-y-1/2" />
            <Arches className="absolute bottom-0 right-8 w-80" />
            <p className="relative p-8 text-sm text-white/80">Kalligrafie-Wasserzeichen bei 5 % und feine konzentrische Bögen.</p>
          </div>
        </Block>

        <Block title="Logo">
          <p className="max-w-2xl text-sm">Das Logo ist ein Bild: nicht umfärben, nicht verzerren, keine Effekte. Navy auf hellem Grund, Weiß auf dunklem. Header-Höhe 64 px (mobil 52 px).</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex flex-wrap items-center gap-8 bg-white p-8"><Logo tone="navy" height={64} /><Logo tone="navy" height={160} /></div>
            <div className="on-dark flex flex-wrap items-center gap-8 bg-navy p-8"><Logo tone="white" height={64} /><Logo tone="white" height={160} /></div>
            <div className="flex flex-wrap items-center gap-8 bg-stone p-8"><Logo variant="stacked" tone="navy" height={160} /><Logo variant="calligraphy" tone="navy" height={120} /></div>
            <div className="on-dark flex flex-wrap items-center gap-8 bg-navy-900 p-8"><Logo variant="stacked" tone="white" height={160} /><Logo variant="calligraphy" tone="white" height={120} /></div>
          </div>
        </Block>

        <Block title="Raster">
          <div className="flex flex-wrap items-end gap-4">
            {[8, 16, 24, 32, 48, 64, 96].map((n) => (<div key={n} className="text-center text-xs"><div className="bg-gold" style={{ width: n, height: n }} /><span>{n}</span></div>))}
          </div>
          <Reveal className="mt-8 max-w-sm rounded-sm bg-white p-6 text-sm">Einblenden beim Scrollen (dezent, respektiert <code>prefers-reduced-motion</code>).</Reveal>
        </Block>
      </Section>
    </>
  );
}
