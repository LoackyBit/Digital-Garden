---
title: "TIL Astro Content Collections"
date: "2026-03-01"
tags: ["til", "astro"]
stage: "raw 🗂️"
source: ["https://docs.astro.build/en/guides/content-collections/"]
summary: "Uso pratico di schema Zod e getCollection per contenuti tipizzati."
draft: false
---

## Cosa ho imparato

Con Astro Content Collections posso validare frontmatter con Zod e avere dati tipizzati in pagina senza cast manuali.

## Esempio pratico

```ts
const notes = await getCollection("notes", entry => !entry.data.draft);
```

## Pitfall / Errori comuni

- Dimenticare `z.coerce.date()` quando la data arriva come stringa.
- Usare campi frontmatter non dichiarati nello schema.
