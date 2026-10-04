"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Kopiert einen Wert in die Zwischenablage und bestätigt es sichtbar und für Screenreader. */
export function CopyButton({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const t = document.createElement("textarea");
      t.value = value;
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); } finally { t.remove(); }
    }
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold-light/60 px-4 text-sm font-semibold text-gold-light transition-colors hover:bg-gold hover:text-navy ${className}`}
      >
        {done ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {done ? "Kopiert" : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{done ? `${label}: kopiert` : ""}</span>
    </>
  );
}
