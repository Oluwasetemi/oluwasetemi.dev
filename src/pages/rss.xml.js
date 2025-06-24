// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => data.date);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter(post => post.data.isPublished)
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      })
      .map((post) => {
        return {
          ...post.data,
          title: post.data.title,
          link: `/blog/${post.slug}/`,
          date: post.data.date || post.data.pubDate || post.data.publishDate,
          description: post.data.description || post.data.excerpt || "",
          categories: post.data.tags || [],
        };
      }),
  });
}
