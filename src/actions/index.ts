import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const server = {
  createPost: defineAction({
    accept: 'form',
    input: z.object({
      title: z.string().trim().min(3, 'Titel: mindestens 3 Zeichen').max(100),
      description: z.string().trim().min(10, 'Beschreibung: mindestens 10 Zeichen').max(200),
      body: z.string().trim().min(10, 'Text: mindestens 10 Zeichen').max(10000),
    }),
    handler: async ({ title, description, body }) => {
      const slug = slugify(title);
      // "new" ist schon die Formular-Seite /blog/new/.
      if (!slug || slug === 'new') throw new ActionError({ code: 'BAD_REQUEST', message: 'Dieser Titel ergibt keinen gültigen Slug.' });

      const today = new Date().toISOString().slice(0, 10);
      // JSON.stringify ergibt gültige YAML-Strings (Anführungszeichen werden escaped).
      const file = `---
title: ${JSON.stringify(title)}
pubDate: ${today}
description: ${JSON.stringify(description)}
author: "Arlind Bekjiri"
---

${body}
`;
      const dir = path.join(process.cwd(), 'src', 'blog');
      try {
        await mkdir(dir, { recursive: true });
        // 'wx': bestehende Beiträge nie überschreiben.
        await writeFile(path.join(dir, `${slug}.md`), file, { flag: 'wx' });
      } catch (err: any) {
        if (err?.code === 'EEXIST') {
          throw new ActionError({ code: 'CONFLICT', message: `Es gibt schon einen Beitrag mit dem Slug "${slug}".` });
        }
        // Auf Vercel ist das Dateisystem read-only.
        if (['EROFS', 'EACCES', 'EPERM'].includes(err?.code)) {
          throw new ActionError({
            code: 'NOT_IMPLEMENTED',
            message: `Speichern geht nur lokal (npm run dev). Hier ist das Dateisystem schreibgeschützt (${err.code}).`,
          });
        }
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: `Datei konnte nicht gespeichert werden (${err?.code ?? 'unbekannt'}).` });
      }
      return { slug };
    },
  }),
};
