import { Heading, Label, Section } from "./ui";
import { Reveal } from "./Reveal";
import { ContactRows } from "./ContactRows";
import { StandortKarte } from "./StandortKarte";

/** Sektion „So findest du uns“ direkt über dem Footer (Startseite). Karte ist rein dekorativ, kein Embed. */
export function StandortSection() {
  return (
    <Section id="standort" tone="paper">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <Label>Standort</Label>
          <Heading className="mt-6" first="So findest du" accent="uns" />
          <div className="mt-8 max-w-sm">
            <ContactRows />
          </div>
        </Reveal>
        <Reveal className="flex justify-center md:justify-end" delay={120}>
          <StandortKarte />
        </Reveal>
      </div>
    </Section>
  );
}
