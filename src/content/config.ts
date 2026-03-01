import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const STAGE_VALUES = ["raw 🗂️", "learning 🧩", "fine-tuned 🧠"] as const;

const baseNoteSchema = z.object({
  title: z.string().min(1, "title e obbligatorio"),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  stage: z.enum(STAGE_VALUES).default("raw 🗂️"),
  source: z.array(z.string().url()).optional(),
  summary: z.string().max(160).optional(),
  draft: z.boolean().default(false),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/notes" }),
  schema: baseNoteSchema,
});

const til = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/til" }),
  schema: baseNoteSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.coerce.date(),
      modDatetime: z.coerce.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = {
  blog,
  notes,
  til,
};
