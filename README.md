# bekjiri-astro-blog

Blog nach dem offiziellen [Astro-Tutorial](https://docs.astro.build/en/tutorial/0-introduction/) (M245, Aufgabe 7).
Statt Preact (wie im Tutorial) wird React als Insel verwendet.

- Live: https://bekjiri-astro-blog.vercel.app
- Liste: `/blog/` · Detail: `/blog/<slug>/` · Formular: `/blog/new/`

```bash
npm install
npm run dev     # http://localhost:4321
npm run build
```

Astro 7 braucht Node.js >= 22.23.4.

Das Formular (`src/components/NewPostForm.jsx`, `client:load`) ruft die Astro Action `src/actions/index.ts` auf.
Sie speichert den Beitrag als Markdown-Datei in `src/blog/`. Das geht nur lokal.
Auf Vercel ist das Dateisystem read-only: Die Action antwortet dann mit einer Fehlermeldung (501).
Alle Seiten sind statisch; nur `/_actions/*` läuft als Vercel Function.
