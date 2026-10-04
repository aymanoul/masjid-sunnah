"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, Watermark } from "./Logo";
import { Button } from "./ui";
import { nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/"; // nur die Startseite hat ein Hero-Foto
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !overHero || open;

  return (
    <>
      <header
        className={`on-dark fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          solid ? "bg-navy-900/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="Masjid As-Sunnah Ratingen, Startseite" className="shrink-0">
            <Logo tone="white" height={64} className="max-sm:!h-[52px] max-sm:!w-auto" />
          </Link>

          <nav aria-label="Hauptmenü" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm font-semibold tracking-wide text-white/90 transition-colors hover:text-gold-light">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/spenden/" variant="gold" className="max-sm:min-h-10 max-sm:px-4">
              Spenden
            </Button>
            <button
              type="button"
              className="inline-flex size-12 items-center justify-center text-white lg:hidden"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-7" strokeWidth={1.5} /> : <Menu className="size-7" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Vollbild-Menü für Mobil */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="on-dark fixed inset-0 z-30 overflow-hidden bg-navy-900 pt-20 lg:hidden"
      >
        <Watermark tone="white" opacity={0.05} className="-bottom-24 -right-24 w-[28rem]" />
        <nav aria-label="Mobiles Menü" className="relative flex h-full flex-col justify-center gap-2 px-8 pb-24">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-3xl font-extrabold tracking-tight text-white hover:text-gold">
              {n.label}
            </Link>
          ))}
          <Link href="/spenden/" onClick={() => setOpen(false)} className="py-3 text-3xl font-extrabold tracking-tight text-gold">
            Spenden
          </Link>
        </nav>
      </div>
    </>
  );
}
