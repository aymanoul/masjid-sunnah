import Link from "next/link";
import type { ReactNode } from "react";

type Surface = "light" | "dark";

/** Kleines Label mit kurzem goldenem Strich davor. */
export function Label({ children, on = "light", className = "" }: { children: ReactNode; on?: Surface; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] ${
        on === "dark" ? "text-gold-light" : "text-gold-ink"
      } ${className}`}
    >
      <span aria-hidden className={`h-px w-8 ${on === "dark" ? "bg-gold-light" : "bg-gold"}`} />
      {children}
    </p>
  );
}

/** Zweifarbige Headline: erster Teil Navy (bzw. Weiß), zweiter Teil Gold. */
export function Heading({
  as: Tag = "h2",
  first,
  accent,
  after,
  on = "light",
  size = "lg",
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  first?: ReactNode;
  accent: ReactNode;
  after?: ReactNode;
  on?: Surface;
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  const sizes = {
    xl: "text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl",
    lg: "text-4xl leading-[1.1] sm:text-5xl",
    md: "text-2xl leading-tight sm:text-3xl",
  } as const;
  return (
    <Tag
      className={`font-extrabold tracking-tight ${sizes[size]} ${on === "dark" ? "text-white" : "text-navy"} ${className}`}
    >
      {first}
      {first ? " " : null}
      <span className={on === "dark" ? "text-gold" : "text-gold-deep"}>{accent}</span>
      {after ? " " : null}
      {after}
    </Tag>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

const variants = {
  gold: "bg-gold text-navy hover:bg-gold-light",
  navy: "bg-navy text-white hover:bg-navy-900",
  "outline-light": "border-2 border-white/70 text-white hover:bg-white hover:text-navy",
  "outline-dark": "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  // Hero: Großbuchstaben, weiter Buchstabenabstand, eckig mit 4 px Radius
  hero: "bg-gold text-navy uppercase tracking-[0.08em] hover:bg-gold-light",
  "hero-outline": "border border-white/45 text-white uppercase tracking-[0.08em] hover:bg-white/[0.08]",
} as const;

export function Button({ href, children, variant = "gold", size = "md", external, className = "", icon }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-colors ${
    size === "lg" ? "min-h-14 px-8 text-base" : "min-h-12 px-6 text-sm"
  } ${variants[variant]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

export function ButtonLike({ children, variant = "gold", className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      {...rest}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

/** Flächen: stone (warm), paper (Standard), navy (dunkel). */
export function Card({
  tone = "paper",
  className = "",
  children,
}: {
  tone?: "paper" | "stone" | "navy";
  className?: string;
  children: ReactNode;
}) {
  const t = {
    paper: "bg-white border border-navy/10",
    stone: "bg-stone",
    navy: "on-dark bg-navy text-white",
  } as const;
  return <div className={`rounded-sm p-8 ${t[tone]} ${className}`}>{children}</div>;
}

/** Rundes Line-Icon (einheitliche Strichstärke 1.5). */
export function IconBadge({ children, on = "light" }: { children: ReactNode; on?: Surface }) {
  return (
    <span
      className={`inline-flex size-14 items-center justify-center rounded-full border ${
        on === "dark" ? "border-gold-light/50 text-gold-light" : "border-gold text-gold-ink"
      } [&_svg]:size-6 [&_svg]:stroke-[1.5]`}
    >
      {children}
    </span>
  );
}

/** Feine konzentrische Bögen als Ornament. */
export function Arches({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "white" }) {
  const stroke = tone === "gold" ? "var(--color-gold-light)" : "#fff";
  return (
    <svg viewBox="0 0 400 220" fill="none" aria-hidden className={`pointer-events-none ${className}`}>
      {[190, 160, 130, 100, 70, 40].map((r) => (
        <path key={r} d={`M${200 - r} 220 A${r} ${r} 0 0 1 ${200 + r} 220`} stroke={stroke} strokeWidth="1" />
      ))}
    </svg>
  );
}

export function Section({
  id,
  tone = "paper",
  className = "",
  children,
}: {
  id?: string;
  tone?: "paper" | "stone" | "navy" | "white";
  className?: string;
  children: ReactNode;
}) {
  const t = {
    paper: "bg-paper",
    white: "bg-white",
    stone: "bg-stone",
    navy: "on-dark relative overflow-hidden bg-navy text-white",
  } as const;
  return (
    <section id={id} className={`${t[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}

/** Sichtbare Markierung für noch fehlende Angaben (wird entfernt, sobald die Angabe vorliegt). */
export function TodoChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-sm bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold-ink">
      TODO: {children}
    </span>
  );
}
