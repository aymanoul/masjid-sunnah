"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** E-Mail gegen Spam-Harvester: im statischen HTML steht „kontakt [at] …“, erst im Browser wird ein mailto-Link daraus. */
export function Email({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const addr = `${site.email.user}@${site.email.domain}`;
  if (!ready) return <span className={className}>{site.email.user} [at] {site.email.domain}</span>;
  return (
    <a href={`mailto:${addr}`} className={`underline-offset-4 hover:underline ${className}`}>
      {addr}
    </a>
  );
}
