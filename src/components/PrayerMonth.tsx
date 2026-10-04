"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { berlinNow, data, dstShift, hijriParts, monthNames, prayers, SHURUQ, weekday, weekdayShort } from "@/lib/prayer";
import { jumuaFor } from "@/content/settings";

const months = [...new Set(Object.keys(data.days).map((d) => d.slice(0, 7)))].sort();
const cols = 2 + prayers.length * 2 + 1; // Tag, Hijri, 5 × (Beginn, Iqāma), Shurūq

/** Monatsplan im Stil des gedruckten Plans: Beginn und Iqāma, Freitage gold, Zeitumstellung blau, Balken bei Hijri-Monatswechsel. */
export function PrayerMonth({ buildDate }: { buildDate: string }) {
  const [month, setMonth] = useState(months.includes(buildDate.slice(0, 7)) ? buildDate.slice(0, 7) : months[0]);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const t = berlinNow().date;
    setToday(t);
    const h = window.location.hash.slice(1);
    if (months.includes(h)) setMonth(h);
    else if (months.includes(t.slice(0, 7))) setMonth(t.slice(0, 7));
  }, []);

  const pick = (m: string) => {
    setMonth(m);
    history.replaceState(null, "", `#${m}`);
  };

  const rows = useMemo(() => {
    let prevMonth = -1;
    return Object.keys(data.days)
      .filter((d) => d.startsWith(month))
      .map((date) => {
        const h = hijriParts(date);
        const newHijri = h.month !== prevMonth;
        prevMonth = h.month;
        return { date, t: data.days[date], h, newHijri, wd: weekday(date), dst: dstShift(date) };
      });
  }, [month]);

  return (
    <div>
      <div role="group" aria-label="Monat wählen" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:px-0 no-print">
        {months.map((m) => {
          const [y, mo] = m.split("-");
          const on = m === month;
          return (
            <button
              key={m}
              type="button"
              aria-pressed={on}
              onClick={() => pick(m)}
              className={`min-h-11 shrink-0 rounded-sm border px-4 text-sm font-semibold transition-colors ${on ? "border-navy bg-navy text-white" : "border-navy/20 bg-white text-navy hover:border-navy"}`}
            >
              {monthNames[+mo - 1].slice(0, 3)}
              <span className="ml-1 text-xs opacity-70">{y.slice(2)}</span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-8 text-2xl sm:text-3xl">
        {monthNames[+month.slice(5) - 1]} {month.slice(0, 4)}
      </h2>

      <div className="mt-6 overflow-x-auto rounded-sm border border-navy/15 bg-white">
        <table className="w-full min-w-[56rem] border-collapse text-center text-sm tabular-nums">
          <caption className="sr-only">Gebetszeiten {monthNames[+month.slice(5) - 1]} {month.slice(0, 4)}: Beginn und Iqāma</caption>
          <thead>
            <tr className="bg-navy text-white">
              <th rowSpan={2} scope="col" className="sticky left-0 z-10 bg-navy px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">Tag</th>
              <th rowSpan={2} scope="col" className="px-2 py-2 text-xs font-semibold uppercase tracking-wider">Hijri</th>
              {prayers.slice(0, 1).map((p) => <th key={p.key} colSpan={2} scope="colgroup" className="border-l border-white/20 px-2 pt-2 text-xs font-semibold uppercase tracking-wider">{p.name}</th>)}
              <th rowSpan={2} scope="col" className="border-l border-white/20 px-2 py-2 text-xs font-semibold uppercase tracking-wider">Shurūq</th>
              {prayers.slice(1).map((p) => <th key={p.key} colSpan={2} scope="colgroup" className="border-l border-white/20 px-2 pt-2 text-xs font-semibold uppercase tracking-wider">{p.name}</th>)}
            </tr>
            <tr className="bg-navy text-gold-light">
              {prayers.flatMap((p) => [
                <th key={p.key + "b"} scope="col" className="border-l border-white/20 px-2 pb-2 text-[0.7rem] font-medium">Beginn</th>,
                <th key={p.key + "i"} scope="col" className="px-2 pb-2 text-[0.7rem] font-medium">Iqāma</th>,
              ])}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const fri = r.wd === 5, isToday = r.date === today;
              const tone = r.dst ? "bg-blue/10" : fri ? "bg-gold/20" : "";
              return (
                <Fragment key={r.date}>
                  {r.newHijri ? (
                    <tr>
                      <th colSpan={cols} scope="colgroup" className="bg-navy-900 px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                        {r.h.monthName} {r.h.year}
                      </th>
                    </tr>
                  ) : null}
                  <tr className={`border-t border-navy/10 ${tone} ${isToday ? "outline outline-2 -outline-offset-2 outline-blue" : ""}`} aria-current={isToday ? "date" : undefined}>
                    <th scope="row" className={`sticky left-0 z-10 px-3 py-2 text-left font-semibold ${r.dst ? "bg-[#e0e4ee]" : fri ? "bg-[#f1e6d0]" : "bg-white"}`}>
                      <span className="inline-block w-6 text-ink/70">{weekdayShort[r.wd]}</span> {+r.date.slice(8)}.
                      {fri ? <span className="block text-[0.7rem] font-medium text-gold-ink">Jumuʻa {jumuaFor(r.date)}</span> : null}
                      {r.dst ? <span className="block text-[0.7rem] font-medium text-blue">{r.dst > 0 ? "Sommerzeit: Uhr +1 Std." : "Winterzeit: Uhr −1 Std."}</span> : null}
                      {isToday ? <span className="block text-[0.7rem] font-medium text-blue">Heute</span> : null}
                    </th>
                    <td className="px-2 py-2 text-ink/80">{r.h.day}</td>
                    {prayers.slice(0, 1).map((p) => (
                      <Fragment key={p.key}>
                        <td className="border-l border-navy/10 px-2 py-2 font-semibold">{r.t[p.begin]}</td>
                        <td className="px-2 py-2 text-ink/80">{r.t[p.iq]}</td>
                      </Fragment>
                    ))}
                    <td className="border-l border-navy/10 px-2 py-2">{r.t[SHURUQ]}</td>
                    {prayers.slice(1).map((p) => (
                      <Fragment key={p.key}>
                        <td className="border-l border-navy/10 px-2 py-2 font-semibold">{r.t[p.begin]}</td>
                        <td className="px-2 py-2 text-ink/80">{r.t[p.iq]}</td>
                      </Fragment>
                    ))}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm no-print">
        <li className="flex items-center gap-2"><span className="size-4 rounded-sm bg-gold/30" aria-hidden />Freitag (Jumuʻa)</li>
        <li className="flex items-center gap-2"><span className="size-4 rounded-sm bg-blue/20" aria-hidden />Tag der Zeitumstellung</li>
        <li className="flex items-center gap-2"><span className="size-4 rounded-sm bg-navy-900" aria-hidden />Beginn eines neuen Hijri-Monats</li>
      </ul>
    </div>
  );
}
