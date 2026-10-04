"use client"

import type React from "react"
import { useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import { MapPin, Navigation } from "lucide-react"

interface StandortKarteProps {
  name?: string
  strasse?: string
  ort?: string
  lat?: number
  lng?: number
  className?: string
}

export function StandortKarte({
  name = "Masjid As-Sunnah",
  strasse = "Am Westbahnhof 31",
  ort = "40878 Ratingen",
  lat = 51.2991692,
  lng = 6.8381131,
  className = "",
}: StandortKarteProps) {
  const [offen, setOffen] = useState(false)
  const [hover, setHover] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-60, 60], [6, -6]), { stiffness: 260, damping: 30 })
  const ry = useSpring(useTransform(mx, [-60, 60], [-6, 6]), { stiffness: 260, damping: 30 })

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - (r.left + r.width / 2))
    my.set(e.clientY - (r.top + r.height / 2))
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHover(false)
  }

  const koord = `${lat.toFixed(4)}° N · ${lng.toFixed(4)}° E`
  const route = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const draw = (delay: number, duration = 0.7) =>
    reduce
      ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration, delay, ease: "easeOut" as const },
        }

  return (
    <div className={`w-full max-w-[420px] ${className}`} style={{ perspective: 1000 }}>
      <motion.button
        ref={ref}
        type="button"
        aria-expanded={offen}
        aria-label={offen ? "Kartenansicht schließen" : "Kartenansicht öffnen"}
        onClick={() => setOffen((v) => !v)}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        className="relative block w-full overflow-hidden rounded-2xl border border-navy/10 bg-stone text-left
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        animate={{ height: offen ? 320 : 168 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }}
      >
        {/* feines Raster im geschlossenen Zustand */}
        <motion.svg
          aria-hidden
          className="absolute inset-0 h-full w-full text-navy"
          animate={{ opacity: offen ? 0 : 0.05 }}
          transition={{ duration: 0.3 }}
        >
          <defs>
            <pattern id="sk-raster" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sk-raster)" />
        </motion.svg>

        {/* dekorative Kartenansicht (keine echte Karte) */}
        <AnimatePresence>
          {offen && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: reduce ? 0 : 0.08 }}
            >
              <div className="absolute inset-0 bg-paper" />
              <svg className="absolute inset-0 h-full w-full text-navy" preserveAspectRatio="none">
                <motion.line x1="0%" y1="38%" x2="100%" y2="30%" stroke="currentColor" strokeOpacity="0.22" strokeWidth="5" {...draw(0.15)} />
                <motion.line x1="0%" y1="70%" x2="100%" y2="66%" stroke="currentColor" strokeOpacity="0.18" strokeWidth="4" {...draw(0.25)} />
                <motion.line x1="34%" y1="0%" x2="30%" y2="100%" stroke="currentColor" strokeOpacity="0.16" strokeWidth="3" {...draw(0.35, 0.6)} />
                <motion.line x1="72%" y1="0%" x2="76%" y2="100%" stroke="currentColor" strokeOpacity="0.16" strokeWidth="3" {...draw(0.45, 0.6)} />
                {[18, 52, 86].map((y, i) => (
                  <motion.line key={`h${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" {...draw(0.55 + i * 0.08, 0.5)} />
                ))}
                {[12, 48, 58, 90].map((x, i) => (
                  <motion.line key={`v${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" {...draw(0.6 + i * 0.08, 0.5)} />
                ))}
              </svg>

              {/* Häuserblöcke in Stone */}
              {[
                "top-[42%] left-[8%] w-[16%] h-[18%]",
                "top-[10%] left-[38%] w-[13%] h-[14%]",
                "top-[74%] left-[78%] w-[16%] h-[16%]",
                "top-[8%] right-[6%] w-[12%] h-[16%]",
                "top-[76%] left-[38%] w-[14%] h-[12%]",
              ].map((c, i) => (
                <motion.div
                  key={c}
                  className={`absolute rounded-[3px] border border-navy/10 bg-stone ${c}`}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : 0.45 + i * 0.06 }}
                />
              ))}

              {/* Pin in Gold */}
              <motion.div
                className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full"
                initial={{ scale: reduce ? 1 : 0, y: reduce ? 0 : -16 }}
                animate={{ scale: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 18, delay: 0.3 }}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#CA9E4E" />
                  <circle cx="12" cy="9" r="2.6" fill="#212242" />
                </svg>
              </motion.div>

              {/* Verlauf nach unten für lesbaren Text */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inhalt */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold-ink"
              animate={{ opacity: offen ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <MapPin size={18} strokeWidth={1.5} />
            </motion.span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
              {offen ? "Schließen" : "Karte ansehen"}
            </span>
          </div>

          <div className="space-y-1.5">
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink"
              animate={{ x: hover && !reduce ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
            >
              {name}
            </motion.p>
            <motion.p
              className="text-lg font-semibold leading-snug text-navy"
              animate={{ x: hover && !reduce ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
            >
              {strasse}
              <br />
              {ort}
            </motion.p>
            <AnimatePresence>
              {offen && (
                <motion.p
                  className="font-mono text-xs text-ink/70"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {koord}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.div
              className="h-px origin-left bg-gradient-to-r from-gold via-gold/40 to-transparent"
              initial={{ scaleX: 0.3 }}
              animate={{ scaleX: hover || offen ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.button>

      {/* Route: externer Link, erst beim Klick, kein Embed */}
      <a
        href={route}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white
                   transition-colors hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <Navigation size={16} strokeWidth={1.5} />
        Route planen
        <span className="sr-only">(öffnet Google Maps in neuem Tab)</span>
      </a>
    </div>
  )
}
