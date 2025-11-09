import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      author: z.string().optional(),
      // Transform string to Date object - supporting both 'date' and 'pubDate'
      date: z.coerce.date().optional(),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      modified: z.boolean().optional(),
      modifiedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).optional(),
      isPublished: z.boolean().optional(),
      isDraft: z.boolean().optional(),
      banner: image().optional(), // This allows images in the content directory
      bannerCredit: z.string().optional(),
    }),
});

const portfolio = defineCollection({
  type: "content",
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
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      author: z.string().optional(),
      date: z.coerce.date().optional(),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).optional(),
      isDraft: z.boolean().default(true),
      banner: image().optional(),
      bannerCredit: z.string().optional(),
    }),
});

export const collections = { blog, portfolio, drafts };
