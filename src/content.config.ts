import type { ImageFunction } from "astro:content";

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Shared base schema factory for blog and drafts
function createBaseContentSchema(image: ImageFunction) {
  return z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    // Transform string to Date object - supporting both 'date' and 'pubDate'
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    banner: image().optional(), // This allows images in the content directory
    bannerCredit: z.string().optional(),
  });
}

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    createBaseContentSchema(image).extend({
      modified: z.boolean().optional(),
      modifiedDate: z.coerce.date().optional(),
      isPublished: z.boolean().optional(),
      isDraft: z.boolean().optional(),
    }),
});

const portfolio = defineCollection({
  loader: glob({ base: "./src/content/portfolio", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    url: z.string().optional(),
    github: z.string().optional(),
    tech: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
    isDraft: z.boolean().optional(),
    publishedDate: z.coerce.date().optional(),
  }),
});

const drafts = defineCollection({
  loader: glob({ base: "./src/content/drafts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    createBaseContentSchema(image).extend({
      isDraft: z.boolean().default(true),
    }),
});

export const collections = { blog, portfolio, drafts };
