"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Bild = { src: string; srcSet: string; width: number; height: number; alt: string; jpg?: string };

/**
 * Bildergalerie zum Wischen. Native Scroll-Snap (funktioniert auch ohne JavaScript),
 * dazu Pfeile, Punkte und Zähler. Alle Bilder im gleichen 4:3-Ausschnitt.
 */
export function Galerie({ bilder, label, sizes }: { bilder: readonly Bild[]; label: string; sizes: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setAktiv(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const gehe = (i: number) => {
    const el = track.current;
    if (!el) return;
    const ziel = Math.max(0, Math.min(bilder.length - 1, i));
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: ziel * el.clientWidth, behavior: ruhig ? "auto" : "smooth" });
  };

  const pfeil = "absolute top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/90 text-navy transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div role="region" aria-roledescription="Karussell" aria-label={label}>
      <div className="relative">
        <div
          ref={track}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); gehe(aktiv + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); gehe(aktiv - 1); }
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {bilder.map((b, i) => (
            <figure key={b.src} role="group" aria-roledescription="Bild" aria-label={`${i + 1} von ${bilder.length}`} className="aspect-[4/3] w-full shrink-0 snap-center snap-always overflow-hidden">
              {b.jpg ? (
                <picture className="block h-full w-full">
                  <source type="image/webp" srcSet={b.srcSet} sizes={sizes} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.jpg} width={b.width} height={b.height} alt={b.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </picture>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.src} srcSet={b.srcSet} sizes={sizes} width={b.width} height={b.height} alt={b.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              )}
            </figure>
          ))}
        </div>
        <button type="button" onClick={() => gehe(aktiv - 1)} disabled={aktiv === 0} aria-label="Vorheriges Bild" className={`${pfeil} left-3 hidden sm:grid`}>
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button type="button" onClick={() => gehe(aktiv + 1)} disabled={aktiv === bilder.length - 1} aria-label="Nächstes Bild" className={`${pfeil} right-3 hidden sm:grid`}>
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-1">
          {bilder.map((b, i) => (
            <button
              key={b.src}
              type="button"
              onClick={() => gehe(i)}
              aria-label={`Bild ${i + 1} zeigen`}
              aria-current={i === aktiv ? "true" : undefined}
              className="grid h-6 w-6 place-items-center focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className={`block h-1.5 rounded-full transition-all ${i === aktiv ? "w-5 bg-gold" : "w-1.5 bg-navy/25"}`} />
            </button>
          ))}
        </div>
        <p className="text-xs font-semibold tabular-nums text-ink/70" aria-live="polite">
          {aktiv + 1} / {bilder.length}
        </p>
      </div>
    </div>
  );
}
