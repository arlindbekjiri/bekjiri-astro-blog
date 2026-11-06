---
title: "Deployment auf Vercel"
pubDate: 2026-11-05
description: "Mit dem Adapter @astrojs/vercel läuft der Blog statisch und nur das Formular als Function."
author: "Arlind Bekjiri"
---

Der Adapter `@astrojs/vercel` macht aus statischen Seiten normale Dateien im CDN. Nur die Action für das Formular wird zu einer Vercel Function.

Jeder Push auf `main` startet automatisch einen neuen Build.
