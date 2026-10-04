import type { CSSProperties } from "react";
import { preload } from "react-dom";
import { Button } from "./ui";
import { hero } from "@/content/hero";
import images from "@/content/hero-images.json";
import { asset } from "@/lib/base";

const srcSet = (ext: "avif" | "webp") => images.widths.map((w) => `${asset(`/images/hero-${w}.${ext}`)} ${w}w`).join(", ");
const SIZES = "100vw";

// Farbschichten laut Vorgabe. Das Foto selbst bleibt unbearbeitet, alles per CSS.
const FILTER = "saturate(0.7) brightness(0.92) contrast(1.05)";
const GRADIENT =
  "linear-gradient(to bottom, rgba(26,33,54,0.35) 0%, rgba(26,33,54,0.18) 30%, rgba(26,33,54,0.55) 58%, rgba(26,33,54,0.92) 80%, #1A2136 100%)";

export function Hero() {
  // Hero-Bild hat Priorität: früh laden, kein Lazy-Loading.
  preload(asset(`/images/hero-${images.widths[images.widths.length - 1]}.avif`), {
    as: "image",
    imageSrcSet: srcSet("avif"),
    imageSizes: SIZES,
    fetchPriority: "high",
    type: "image/avif",
  } as Parameters<typeof preload>[1]);

  const vars = {
    "--hero-pos-m": hero.focus.mobile,
    "--hero-pos-d": hero.focus.desktop,
    "--hero-h-m": hero.imageHeight.mobile,
    "--hero-h-d": hero.imageHeight.desktop,
  } as CSSProperties;
  const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

  return (
    <header
      style={vars}
      className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-hero-ink text-white lg:min-h-[88vh]"
    >
      {/* Bildfläche: Foto + Blaustich + Verlauf. Läuft unten in #1A2136 aus. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[var(--hero-h-m)] lg:h-[var(--hero-h-d)]">
        <picture>
          <source type="image/avif" srcSet={srcSet("avif")} sizes={SIZES} />
          <source type="image/webp" srcSet={srcSet("webp")} sizes={SIZES} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(`/images/hero-${images.widths[Math.min(1, images.widths.length - 1)]}.webp`)}
            alt={hero.alt}
            width={images.width}
            height={images.height}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{ filter: FILTER }}
            className="absolute inset-0 h-full w-full object-cover object-[var(--hero-pos-m)] lg:object-[var(--hero-pos-d)]"
          />
        </picture>
        <div aria-hidden className="absolute inset-0 bg-hero-ink opacity-35 mix-blend-multiply" />
        <div aria-hidden className="absolute inset-0" style={{ background: GRADIENT }} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-36 sm:px-8 sm:pb-20">
        <p className="hero-in mb-5 h-10 text-xl leading-10 text-white sm:h-11 sm:text-2xl sm:leading-[2.75rem]" style={delay(0)}>
          <span lang="ar" dir="rtl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
        </p>
        <h1
          className="hero-in max-w-3xl text-[clamp(2.75rem,1rem+6.5vw,4.75rem)] font-black leading-[0.98] tracking-tight text-white"
          style={delay(60)}
        >
          Ein Ort des Gebets, des Wissens und der Gemeinschaft
        </h1>
        <p
          className="hero-in mt-6 max-w-[34ch] text-[1.0625rem] font-light leading-[1.6] text-white/[0.78] sm:max-w-[60ch] sm:text-xl"
          style={delay(140)}
        >
          Die Masjid As-Sunnah in Ratingen orientiert sich an Qur’an und Sunnah und steht allen Geschwistern offen.
        </p>
        <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4" style={delay(220)}>
          <Button href="/gebetszeiten/" variant="hero" size="lg" className="w-full px-5 text-[0.8125rem] sm:w-auto sm:px-8 sm:text-sm">Gebetszeiten</Button>
          <Button href="/neubau/" variant="hero-outline" size="lg" className="w-full px-5 text-center text-[0.8125rem] sm:w-auto sm:px-8 sm:text-sm">Projekt Neubau unterstützen</Button>
        </div>
      </div>
    </header>
  );
}
