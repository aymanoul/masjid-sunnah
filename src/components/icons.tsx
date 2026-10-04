// Marken-Icons im gleichen Line-Stil wie Lucide (24 px, Strich 1.5), da Lucide keine Marken-Icons mehr enthält.
const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>
);
export const YoutubeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 5 2.5-5 2.5z" /></svg>
);
export const TiktokIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);
