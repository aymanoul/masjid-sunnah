import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap, HandHeart, Landmark, MessageCircle, Users, DoorOpen, Building2, School } from "lucide-react";
import { Arches, Button, Card, Heading, IconBadge, Label, Section } from "@/components/ui";
import { Watermark } from "@/components/Logo";
import { Photo } from "@/components/Photo";
import { photos } from "@/content/photos";
import { PrayerCard } from "@/components/PrayerCard";
import { JumuaTime } from "@/components/JumuaTime";
import { Reveal } from "@/components/Reveal";
import { StandortSection } from "@/components/StandortSection";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";
import { berlinNow } from "@/lib/prayer";
import { events } from "@/content/events";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Masjid As-Sunnah Ratingen" },
  description: "Gebet, Wissen und Gemeinschaft in Ratingen: Gebetszeiten, Arabisch- und Qur’an-Unterricht und das Projekt Neubau.",
};

const MAWAQIT = "https://mawaqit.net/de/msjd-lsn-ratingen-40878-germany";

export default function Home() {
  const buildDate = berlinNow().date;
  const upcoming = events.filter((e) => e.date >= buildDate);

  return (
    <>
      {/* 1 · Hero */}
      <header className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 -z-10">
          <Photo todo="Hero: Gebetsraum oder Gemeinde (Querformat)" chip={false} />
          <div className="absolute inset-0 bg-navy-900/90" />
        </div>
        <Arches className="absolute -bottom-px right-0 -z-10 hidden w-[34rem] opacity-40 lg:block" />
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pb-24">
          <p className="mb-6 text-xl text-gold-light sm:text-2xl"><span lang="ar" dir="rtl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span></p>
          <h1 className="max-w-4xl text-[2.5rem] font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Ein Ort des <span className="text-gold">Gebets</span>, des <span className="text-gold">Wissens</span> und der <span className="text-gold">Gemeinschaft</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/85">
            Die Masjid As-Sunnah in Ratingen orientiert sich an Qur’an und Sunnah und steht allen Geschwistern offen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/gebetszeiten/" size="lg">Gebetszeiten</Button>
            <Button href="/neubau/" size="lg" variant="outline-light">Projekt Neubau unterstützen</Button>
          </div>
          <p className="mt-10 text-xs font-semibold text-white/60">TODO: echtes Foto – Hero (Querformat), ersetzt diese Fläche</p>
        </div>
      </header>

      {/* 2 · Gebetszeiten heute */}
      <Section id="gebetszeiten" tone="navy">
        <Watermark tone="white" opacity={0.04} className="-left-32 -top-20 w-[36rem]" />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Label on="dark">Gebetszeiten</Label>
            <Heading className="mt-6" on="dark" first="Unsere" accent="Gebetszeiten" />
            <p className="mt-6 max-w-md text-white/80">Die Zeiten für heute. Das nächste Gebet ist hervorgehoben, der Countdown läuft mit.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/gebetszeiten/" variant="gold" icon={<ArrowRight className="size-4" aria-hidden />}>Monatsübersicht</Button>
              <a href={MAWAQIT} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gold-light underline-offset-4 hover:underline">Zeiten auch in der MAWAQIT-App</a>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <PrayerCard buildDate={buildDate} />
          </Reveal>
        </div>
      </Section>

      {/* 3 · Über uns */}
      <Section id="ueber-uns" tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div className="aspect-[4/3] w-full overflow-hidden"><Photo {...photos.gebetsraum} sizes="(min-width: 1024px) 560px, 100vw" todo="Gebetsraum" /></div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <Label>Über uns</Label>
            <Heading className="mt-6" first="Eine Gemeinde im" accent="Herzen" after="Ratingens" />
            <p className="mt-8 max-w-xl">
              Die Masjid As-Sunnah ist ein Ort des Gebets, der Bildung und des Zusammenhalts für Muslime in Ratingen und der Region. Wir orientieren uns an Qur’an und Sunnah des Propheten ﷺ.
            </p>
            <p className="mt-4 max-w-xl text-sm text-ink/80">Trägerverein: {site.association}</p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              <li className="flex gap-4">
                <IconBadge><BookOpen aria-hidden /></IconBadge>
                <div><h3 className="text-lg">Qur’an &amp; Sunnah</h3><p className="mt-1 text-sm">Unsere Grundlage in Glaube, Unterricht und Gemeindeleben.</p></div>
              </li>
              <li className="flex gap-4">
                <IconBadge><DoorOpen aria-hidden /></IconBadge>
                <div><h3 className="text-lg">Für alle Geschwister offen</h3><p className="mt-1 text-sm">Jeder ist willkommen, zum Gebet wie zum Unterricht.</p></div>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 4 · Angebot (asymmetrisch) */}
      <Section id="angebot" tone="stone">
        <Reveal>
          <Label>Angebot</Label>
          <Heading className="mt-6 max-w-2xl" first="Das bieten wir" accent="Ihnen" />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Card tone="navy" className="relative flex h-full flex-col justify-between overflow-hidden p-8 sm:p-10">
              <Watermark tone="white" opacity={0.05} className="-bottom-16 -right-16 w-80" />
              <div className="relative">
                <IconBadge on="dark"><Clock aria-hidden /></IconBadge>
                <h3 className="mt-8 text-3xl !text-white">Fünf tägliche Gebete &amp; Jumuʻa</h3>
                <p className="mt-4 max-w-sm text-white/80">
                  Alle fünf Gebete in Gemeinschaft. Das Freitagsgebet beginnt um <strong className="text-gold"><JumuaTime buildDate={buildDate} /> Uhr</strong>.
                </p>
              </div>
              <Link href="/gebetszeiten/" className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold">
                Zu den Gebetszeiten <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Card>
          </Reveal>
          <div className="flex flex-col gap-6 lg:col-span-7">
            {[
              { Icon: GraduationCap, title: "Arabisch-Unterricht", text: "In drei Stufen, von den Buchstaben über das Lesen bis zur Grammatik.", href: "/unterricht/#arabisch" },
              { Icon: BookOpen, title: "Qur’an-Unterricht (Hifz)", text: "Jeden Sonntag auswendig lernen, für Männer und Frauen getrennt.", href: "/unterricht/#quran" },
              { Icon: HandHeart, title: "Gemeinschaft", text: "Iftar im Ramadan, Feste und Zeit füreinander.", href: undefined },
            ].map(({ Icon, title, text, href }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="flex items-start gap-5 rounded-sm bg-white p-6 sm:p-8">
                  <IconBadge><Icon aria-hidden /></IconBadge>
                  <div className="flex-1">
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-1 text-sm">{text}</p>
                    {href ? (
                      <Link href={href} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
                        Mehr erfahren <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 5 · Projekt Neubau (Teaser) */}
      <Section id="neubau-projekt" tone="white">
        <Reveal>
          <div className="aspect-[16/8] w-full min-h-56"><Photo todo="Neubau-Render in voller Auflösung (Querformat)" /></div>
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <Label>Projekt Neubau</Label>
            <Heading className="mt-6" first="Ein neues" accent="Zuhause" after="für unsere Gemeinde" />
            <p className="mt-8 max-w-lg">
              Wir planen den Neubau einer Moschee in Ratingen: ein Gemeindezentrum mit Räumen für Gebet, Bildung, Verwaltung und Gemeinschaft.
            </p>
            <blockquote className="mt-10 border-l-2 border-gold pl-6 font-serif text-2xl leading-snug text-navy">
              „Wer für Allah eine Moschee baut, dem baut Allah ein Haus im Paradies.“
              <footer className="mt-3 font-sans text-sm text-ink/80">Prophet Mohammed ﷺ · Sahih Muslim</footer>
            </blockquote>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/spenden/" size="lg">Jetzt unterstützen</Button>
              <Button href="/neubau/" size="lg" variant="outline-dark">Mehr zum Projekt</Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <dl className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {[
                { Icon: Landmark, t: "Gebetsräume", d: "Helle Gebetsräume für Männer und Frauen, für die täglichen Gebete, Jumuʻa und Festgebete." },
                { Icon: School, t: "Bildung", d: "Klassenräume, Bibliothek und Seminarräume für Qur’an-Unterricht, Bildung und Vorträge." },
                { Icon: Building2, t: "Verwaltung", d: "Büros und Verwaltungsräume, um die Zukunft der Gemeinde verlässlich zu gestalten." },
                { Icon: Users, t: "Gemeinschaft", d: "Eine Mehrzweckhalle, Cafeteria und Küche für Feste, Iftar-Abende und Begegnung." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="border-t border-navy/15 py-8">
                  <Icon className="size-7 stroke-[1.5] text-gold-ink" aria-hidden />
                  <dt className="mt-4 text-lg font-extrabold text-navy">{t}</dt>
                  <dd className="mt-1 text-sm">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* 6 · Aktuelles (nur bei kommenden Terminen) */}
      {upcoming.length > 0 ? (
        <Section id="aktuelles" tone="stone">
          <Label>Aktuelles</Label>
          <Heading className="mt-6" first="Kommende" accent="Termine" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcoming.map((e) => (
              <Card key={e.title + e.date} tone="paper">
                <h3 className="text-2xl">{e.title}</h3>
                {e.titleAr ? <p lang="ar" dir="rtl" className="mt-1 text-xl text-gold-ink">{e.titleAr}</p> : null}
                <p className="mt-3 font-semibold">{e.dateLabel}</p>
                {e.schedule ? (
                  <ul className="mt-4 space-y-1 text-sm">{e.schedule.map((s) => (<li key={s.label} className="flex justify-between gap-4 border-b border-navy/10 py-1"><span>{s.label}</span><span className="font-bold tabular-nums">{s.time} Uhr</span></li>))}</ul>
                ) : null}
                <p className="mt-4 text-sm">{e.place.map((l) => (<span key={l} className="block">{l}</span>))}</p>
                {e.notes ? <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">{e.notes.map((n) => (<li key={n}>{n}</li>))}</ul> : null}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 7 · Social & WhatsApp */}
      <Section id="social" tone="navy">
        <Watermark tone="white" opacity={0.04} className="-right-32 -top-24 w-[36rem]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <Label on="dark">Social Media</Label>
            <Heading className="mt-6" on="dark" first="Folgen Sie" accent="uns" />
            <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {[
                { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
                { name: "TikTok", href: site.social.tiktok, Icon: TiktokIcon },
                { name: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
              ].map(({ name, href, Icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5 text-white hover:text-gold">
                    <Icon className="size-6 text-gold" />
                    <span className="flex-1 text-lg font-bold">{name}</span>
                    <span className="text-sm text-white/70">@sunnahmoschee</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <div className="rounded-sm border border-gold/60 p-8 sm:p-10">
              <IconBadge on="dark"><MessageCircle aria-hidden /></IconBadge>
              <h3 className="mt-6 text-2xl !text-white">Direkt auf WhatsApp</h3>
              <p className="mt-3 max-w-sm text-white/80">Fragen zu Gebet, Unterricht oder Neubau? Schreiben Sie uns einfach.</p>
              <p className="mt-6 text-lg font-bold tabular-nums">{site.phone.display}</p>
              <Button href={site.whatsapp} className="mt-6">WhatsApp öffnen</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 8 · Standort (Karte ohne Embed) */}
      <StandortSection />
    </>
  );
}
