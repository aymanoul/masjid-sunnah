// Aktuelles / Termine. Ist keine kommende Veranstaltung eingetragen, wird die Sektion auf der Startseite ausgeblendet.
export type Event = {
  date: string; // "YYYY-MM-DD", letzter Tag der Veranstaltung
  title: string;
  titleAr?: string;
  dateLabel: string; // z. B. "Mittwoch, 27. Mai"
  place: string[]; // Zeilen
  schedule?: { label: string; time: string }[]; // z. B. Einlass, Dhikr, Gebet
  notes?: string[];
};

// TODO: aktuell keine Veranstaltung bekannt.
export const events: Event[] = [];
