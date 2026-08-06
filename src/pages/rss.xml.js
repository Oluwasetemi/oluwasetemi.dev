// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getEntrySlug } from "../utils/content";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Filter and sort published posts
  const publishedPosts = posts
    .filter((post) => {
      // Only include published posts that are not drafts
      return post.data.isPublished !== false && post.data.isDraft !== true;
    })
    .filter((post) => {
      // Only include posts with a date
      return post.data.date || post.data.pubDate;
    })
    .sort((a, b) => {
      const dateA = a.data.pubDate || a.data.date;
      const dateB = b.data.pubDate || b.data.date;
      return new Date(dateB) - new Date(dateA);
    });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site || "https://oluwasetemi.dev",
    items: publishedPosts.map((post) => {
      const postDate = post.data.pubDate || post.data.date;
      return {
        title: post.data.title,
        link: `/blog/${getEntrySlug(post)}/`,
        pubDate: new Date(postDate),
        description: post.data.description || "",
        categories: post.data.tags || [],
      };
    }),
  });
}
