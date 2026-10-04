import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Label, Section } from "@/components/ui";
import { datenschutz } from "@/content/datenschutz";

export const metadata: Metadata = pageMeta({ path: "/datenschutz/", title: "Datenschutzerklärung", description: "Datenschutzerklärung der Masjid As-Sunnah Ratingen." });

export default function Page() {
  return (
    <Section tone="paper" className="pt-20">
      <div className="max-w-3xl">
        <Label>Rechtliches</Label>
        <h1 className="mt-6 break-words text-[1.75rem] font-extrabold leading-tight tracking-tight hyphens-auto sm:text-5xl">Datenschutzerklärung</h1>
        <div className="mt-10 [&_h2]:mt-12 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-lg [&_p]:mt-3 [&_a]:underline">
          {datenschutz}
        </div>
      </div>
    </Section>
  );
}
