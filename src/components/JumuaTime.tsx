"use client";
import { useEffect, useState } from "react";
import { berlinNow } from "@/lib/prayer";
import { jumuaFor } from "@/content/settings";

/** Jumuʻa-Uhrzeit laut content/settings.ts, gilt auch ohne Neubau der Seite ab dem richtigen Tag. */
export function JumuaTime({ buildDate }: { buildDate: string }) {
  const [d, setD] = useState(buildDate);
  useEffect(() => setD(berlinNow().date), []);
  return <>{jumuaFor(d)}</>;
}
