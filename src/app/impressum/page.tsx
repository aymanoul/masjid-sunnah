import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Label, Section } from "@/components/ui";
import { impressum } from "@/content/impressum";

export const metadata: Metadata = pageMeta({ path: "/impressum/", title: "Impressum", description: "Impressum der Masjid As-Sunnah Ratingen, Marokkanischer Kultur Verein Ratingen e.V." });

export default function Page() {
  return (
    <Section tone="paper" className="pt-20">
      <div className="max-w-3xl">
        <Label>Rechtliches</Label>
        <h1 className="mt-6 break-words text-[1.75rem] font-extrabold leading-tight tracking-tight hyphens-auto sm:text-5xl">Impressum</h1>
        <div className="mt-10 [&_h2]:mt-12 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-lg [&_p]:mt-3 [&_a]:underline">
          {impressum}
        </div>
      </div>
    </Section>
  );
}
