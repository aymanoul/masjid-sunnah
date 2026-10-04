import { CopyButton } from "./CopyButton";
import { Label } from "./ui";
import { site } from "@/content/site";

/** Bankverbindung als Karte mit „IBAN kopieren“. Daten stehen in src/content/site.ts. */
export function BankCard({ id }: { id?: string }) {
  const d = site.donate;
  return (
    <div id={id} className="on-dark relative overflow-hidden rounded-sm bg-navy p-8 text-white sm:p-10">
      <Label on="dark">Bankverbindung</Label>
      <dl className="mt-8 space-y-6">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Empfänger</dt>
          <dd className="mt-1 text-lg font-bold">{d.holder}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">IBAN</dt>
          <dd className="mt-1 break-words text-xl font-bold tabular-nums tracking-wide sm:text-2xl">{d.iban}</dd>
          <div className="mt-3"><CopyButton value={d.iban.replace(/\s/g, "")} label="IBAN kopieren" /></div>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Verwendungszweck</dt>
          <dd className="mt-1 text-lg font-bold text-gold">„{d.purpose}“</dd>
        </div>
      </dl>
    </div>
  );
}
