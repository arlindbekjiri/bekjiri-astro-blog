---
title: "Content Collections"
pubDate: 2026-11-04
description: "Mit Content Collections prüft Astro die Frontmatter aller Beiträge mit einem Schema."
author: "Arlind Bekjiri"
---

Alle Beiträge liegen als Markdown-Dateien in `src/blog/`. Die Datei `src/content.config.ts` legt fest, welche Felder jeder Beitrag haben muss.

Fehlt zum Beispiel der Titel, bricht der Build mit einer klaren Fehlermeldung ab.
