import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const toKebabCase = (value: string): string => {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const getToday = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const exists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const createTilFile = async (): Promise<void> => {
  const title = process.argv.slice(2).join(" ").trim();

  if (!title) {
    process.stderr.write("Uso: npx tsx scripts/new-til.ts \"Titolo del TIL\"\n");
    process.exit(1);
  }

  const slug = toKebabCase(title);
  const date = getToday();
  const outputDir = path.join(process.cwd(), "src", "content", "til");
  const fileName = `${date}-${slug}.md`;
  const filePath = path.join(outputDir, fileName);

  await mkdir(outputDir, { recursive: true });

  if (await exists(filePath)) {
    process.stderr.write(`File gia esistente: ${filePath}\n`);
    process.exit(1);
  }

  const fileContent = `---
title: "${title.replace(/"/g, "\\\"")}"
date: "${date}"
tags: ["til", "categoria"]
stage: "raw 🗂️"
source: []
summary: ""
draft: false
---

## Cosa ho imparato


## Esempio pratico

\`\`\`ts
// Inserisci un esempio pratico
\`\`\`

## Pitfall / Errori comuni

- 
`;

  await writeFile(filePath, fileContent, "utf-8");
  process.stdout.write(`${filePath}\n`);
};

createTilFile().catch(error => {
  process.stderr.write(`Errore durante la creazione del TIL: ${String(error)}\n`);
  process.exit(1);
});
