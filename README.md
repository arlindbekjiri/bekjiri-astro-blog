# bekjiri-astro-blog

Blog für M245 Aufgabe 7 mit Astro, nach dem offiziellen [Astro-Tutorial](https://docs.astro.build/en/tutorial/0-introduction/). Statt Preact wird React für die Insel verwendet.

Live: https://bekjiri-astro-blog.vercel.app

## Lokal starten

Braucht Node.js 22.23.4 bis 24.

```bash
npm install
npm run dev
```

Danach läuft der Blog auf http://localhost:4321.

Das Formular unter `/blog/new/` speichert Beiträge nur lokal, weil das Dateisystem auf Vercel read-only ist.
