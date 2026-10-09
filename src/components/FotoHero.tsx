import type { ReactNode } from "react";
import { Photo } from "./Photo";
import { Watermark } from "./Logo";

type Bild = { src: string; srcSet: string; width: number; height: number; alt: string; jpg?: string };

/**
 * Kopfbereich einer Unterseite: Foto vollflächig im Hintergrund, darüber ein Navy-Schleier
 * und die Kalligrafie als dezente transparente Ebene. Gleiche Bildbehandlung wie im Hero der Startseite.
 */
export function FotoHero({ bild, className = "", children }: { bild: Bild; className?: string; children: ReactNode }) {
  return (
    <section className={`on-dark relative isolate overflow-hidden bg-navy text-white ${className}`}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo {...bild} alt="" sizes="100vw" todo="Foto" chip={false} className="[filter:saturate(0.7)_brightness(0.92)_contrast(1.05)]" />
        <div className="absolute inset-0 bg-navy opacity-[0.72]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-900/20 to-transparent" />
      </div>
      <Watermark tone="white" opacity={0.07} className="-right-24 -top-10 w-[34rem]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 pt-28 sm:px-8 sm:py-28 sm:pt-32">{children}</div>
    </section>
  );
}
