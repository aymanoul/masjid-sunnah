import type { Metadata } from "next";
import { Button, Heading, Label, Section } from "@/components/ui";
import { Watermark } from "@/components/Logo";

export const metadata: Metadata = { title: "Seite nicht gefunden", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Section tone="navy" className="min-h-[80svh] pt-20">
      <Watermark tone="white" opacity={0.05} className="-right-24 -top-10 w-[34rem]" />
      <div className="relative max-w-2xl">
        <Label on="dark">Fehler 404</Label>
        <Heading as="h1" size="xl" on="dark" className="mt-6" first="Seite nicht" accent="gefunden" />
        <p className="mt-8 max-w-xl text-lg text-white/85">Diese Seite gibt es nicht oder nicht mehr. Hier geht es weiter:</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/" size="lg">Zur Startseite</Button>
          <Button href="/gebetszeiten/" size="lg" variant="outline-light">Gebetszeiten</Button>
        </div>
      </div>
    </Section>
  );
}
