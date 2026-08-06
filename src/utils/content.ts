import type { CollectionEntry } from "astro:content";

type ContentEntry = CollectionEntry<"blog"> | CollectionEntry<"portfolio">;

export function getEntrySlug(entry: Pick<ContentEntry, "id">): string {
  return entry.id
    .replace(/\/index\.(?:md|mdx)$/, "")
    .replace(/\.(?:md|mdx)$/, "");
}
