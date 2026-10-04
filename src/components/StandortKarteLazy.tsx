"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { site } from "@/content/site";

// framer-motion (ca. 40 KB) wird erst geladen, wenn die Karte fast sichtbar ist. Bis dahin steht dieselbe Kartenfläche
// als ruhige Variante da (gleiche Maße, keine Verschiebung), der Link „Route planen“ funktioniert auch ohne JavaScript.
const Karte = dynamic(() => import("./StandortKarte").then((m) => m.StandortKarte), { ssr: false });

const route = "https://www.google.com/maps/dir/?api=1&destination=51.2991692,6.8381131";

export function StandortKarteLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [laden, setLaden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || laden) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLaden(true); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, [laden]);

  if (laden) return <Karte />;
  return (
    <div ref={ref} className="w-full max-w-[420px]">
      <div className="relative flex h-[168px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-navy/10 bg-stone p-5 text-left sm:p-6">
        <div className="flex items-start justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold-ink">
            <MapPin size={18} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Karte ansehen</span>
        </div>
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">{site.name}</p>
          <p className="text-lg font-semibold leading-snug text-navy">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
          <div className="h-px w-[30%] bg-gradient-to-r from-gold via-gold/40 to-transparent" />
        </div>
      </div>
      <a
        href={route}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <Navigation size={16} strokeWidth={1.5} aria-hidden />
        Route planen
        <span className="sr-only">(öffnet Google Maps in neuem Tab)</span>
      </a>
    </div>
  );
}
