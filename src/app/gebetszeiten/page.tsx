import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { Button, Heading, Label, Section } from "@/components/ui";
import { FotoHero } from "@/components/FotoHero";
import { PrayerMonth } from "@/components/PrayerMonth";
import { photos } from "@/content/photos";
import { berlinNow } from "@/lib/prayer";

export const metadata: Metadata = pageMeta({ path: "/gebetszeiten/", title: "Gebetszeiten", description: "Gebetszeiten der Masjid As-Sunnah in Ratingen: Monatsplan mit Beginn und Iqāma, Jumuʻa und Hijri-Datum." });

const MAWAQIT = "https://mawaqit.net/de/msjd-lsn-ratingen-40878-germany";

export default function Gebetszeiten() {
  const buildDate = berlinNow().date;
  return (
    <>
      <div className="no-print">
        <FotoHero bild={photos.gebetsraum}>
          <div className="max-w-3xl">
            <Label on="dark">Gebetszeiten</Label>
            <Heading as="h1" size="xl" on="dark" className="mt-6" first="Unser" accent="Gebetsplan" />
            <p className="mt-6 max-w-xl text-white/85">
              Beginn und Iqāma für jeden Tag. Die Iqāma ist der zweite Aufruf, mit ihr beginnt das gemeinsame Gebet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="https://mawaqit.net/de/msjd-lsn-ratingen-40878-germany" variant="outline-light" icon={<ArrowUpRight className="size-4" aria-hidden />}>
                Zeiten auch in der MAWAQIT-App
              </Button>
            </div>
          </div>
        </FotoHero>
      </div>

      <Section tone="paper">
        <PrayerMonth buildDate={buildDate} />
        <div className="mt-12 grid gap-8 text-sm md:grid-cols-2 no-print">
          <p>
            Die Zeiten pflegen wir in MAWAQIT und übernehmen sie automatisch. Das Hijri-Datum folgt dem Umm-al-Qura-Kalender, gezählt nach Kalendertag.
          </p>
          <p>
            Jumuʻa: Die Uhrzeit steht im Plan an jedem Freitag. Bei der Umstellung auf Winterzeit am 25.10.2026 wechselt sie von 14:00 auf 13:00 Uhr.
          </p>
        </div>
        <p className="mt-6 text-xs text-ink/70 no-print">
          Alle Zeiten in Berliner Zeit. <a href={MAWAQIT} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Zur MAWAQIT-Seite der Moschee</a>.
        </p>
      </Section>
    </>
  );
}
