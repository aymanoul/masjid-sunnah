import { Watermark } from "./Logo";

/**
 * Foto oder neutraler Platzhalter (Stone-Fläche mit dezenter Kalligrafie).
 * Solange `src` fehlt, steht sichtbar "TODO: echtes Foto" im Bild. Keine Stock- oder KI-Bilder.
 */
export function Photo({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt = "",
  todo,
  className = "",
  chip = true,
  chipText,
}: {
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  todo: string; // Beschreibung, was hier hin soll
  className?: string;
  chip?: boolean;
  chipText?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} srcSet={srcSet} sizes={sizes} width={width} height={height} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" decoding="async" />;
  }
  return (
    <div className={`relative h-full w-full overflow-hidden bg-stone ${className}`} role="img" aria-label={`Platzhalter: ${todo}`}>
      <Watermark tone="navy" opacity={0.06} className="left-1/2 top-1/2 w-[70%] max-w-[28rem] -translate-x-1/2 -translate-y-1/2" />
      {chip ? (
        <span className="absolute bottom-3 left-3 rounded-sm bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold leading-tight text-gold-ink">
          {chipText ?? `TODO: echtes Foto – ${todo}`}
        </span>
      ) : null}
    </div>
  );
}
