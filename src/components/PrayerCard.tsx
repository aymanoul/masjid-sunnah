"use client";
import { useEffect, useState } from "react";
import { berlinNow, data, fmtLeft, hijri, nextPrayer, prayers, SHURUQ } from "@/lib/prayer";
import { jumuaFor } from "@/content/settings";

/** Heutige Gebetszeiten mit Live-Countdown. Alles clientseitig, keine Daten an Dritte. */
export function PrayerCard({ buildDate }: { buildDate: string }) {
  // Server und erster Client-Render nutzen das Build-Datum (kein Hydration-Fehler). Danach läuft die Uhr.
  const [now, setNow] = useState<{ date: string; secs: number } | null>(null);
  useEffect(() => {
    const tick = () => setNow(berlinNow());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const date = now?.date ?? buildDate;
  const times = data.days[date] ?? data.days[buildDate];
  const next = now ? nextPrayer(now) : null;
  const nextKey = next && !next.tomorrow ? next.prayer.key : next?.tomorrow ? "fajr" : null;

  return (
    <div className="rounded-sm bg-white text-navy shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
      <div className="border-b border-navy/10 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-ink">Nächstes Gebet</p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-4xl font-black tracking-tight sm:text-5xl">
            {next ? next.prayer.name : "–"}
            {next?.tomorrow ? <span className="ml-3 text-base font-semibold text-ink/70">morgen</span> : null}
          </p>
          <p role="timer" aria-live="off" className="text-3xl font-extrabold tabular-nums text-gold-deep sm:text-4xl">
            {next ? fmtLeft(next.left) : "--:--:--"}
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-5 divide-x divide-navy/10 border-b border-navy/10">
        {prayers.map((p) => {
          const active = nextKey === p.key;
          return (
            <li key={p.key} className={`px-1 py-5 text-center sm:py-6 ${active ? "bg-navy text-white" : ""}`} aria-current={active ? "true" : undefined}>
              <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] ${active ? "text-gold-light" : "text-ink/70"}`}>{p.name}</p>
              <p className="mt-2 text-base font-bold tabular-nums sm:text-xl">{times?.[p.begin] ?? "--:--"}</p>
              <p className={`mt-1 text-[0.65rem] tabular-nums sm:text-xs ${active ? "text-white/75" : "text-ink/70"}`}>Iqāma {times?.[p.iq] ?? "--:--"}</p>
            </li>
          );
        })}
      </ul>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-5 p-6 text-sm sm:grid-cols-[auto_auto_1fr] sm:p-8">
        <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">Shurūq</dt><dd className="mt-1 text-lg font-bold tabular-nums">{times?.[SHURUQ] ?? "--:--"}</dd></div>
        <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">Jumuʻa</dt><dd className="mt-1 text-lg font-bold tabular-nums">{jumuaFor(date)} Uhr</dd></div>
        <div className="col-span-2 sm:col-span-1"><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">Hijri-Datum</dt><dd className="mt-1 text-lg font-bold">{hijri(date)}</dd></div>
      </dl>

    </div>
  );
}
