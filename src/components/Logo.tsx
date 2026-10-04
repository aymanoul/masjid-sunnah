import { asset } from "@/lib/base";

// Das Logo ist ein Bild: nicht umfärben, nicht verzerren, keine Effekte.
// Navy auf hellem Grund, Weiß auf dunklem Grund. Maße = Seitenverhältnis der SVG-Dateien.
const files = {
  horizontal: { w: 2000, h: 956, base: "logo-horizontal" },
  stacked: { w: 1600, h: 1757, base: "logo-gestapelt" },
  calligraphy: { w: 1600, h: 1576, base: "kalligrafie" },
} as const;

export function Logo({
  variant = "horizontal",
  tone,
  height,
  className = "",
  decorative = false,
}: {
  variant?: keyof typeof files;
  tone: "navy" | "white";
  height: number;
  className?: string;
  decorative?: boolean;
}) {
  const f = files[variant];
  const width = Math.round((height * f.w) / f.h);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/brand/${f.base}-${tone === "navy" ? "navy" : "weiss"}.svg`)}
      width={width}
      height={height}
      alt={decorative ? "" : "Masjid As-Sunnah Ratingen"}
      aria-hidden={decorative || undefined}
      className={className}
      style={{ height, width }}
    />
  );
}

// Große, sehr blasse Kalligrafie als Hintergrund (3–6 % Deckkraft), nur Dekoration.
export function Watermark({
  tone = "white",
  opacity = 0.05,
  className = "",
}: {
  tone?: "navy" | "white";
  opacity?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/brand/kalligrafie-${tone === "navy" ? "navy" : "weiss"}.svg`)}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ opacity }}
    />
  );
}
