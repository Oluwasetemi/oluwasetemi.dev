import type { CollectionEntry } from "astro:content";

import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";

import { getEntrySlug } from "../../../utils/content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: getEntrySlug(post) },
    props: { post },
  }));
}

type Props = { post: CollectionEntry<"blog"> };

export async function GET({ props }: { props: Props }) {
  const { post } = props;
  const { title, description, date, tags } = post.data;

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const tagList = tags?.length
    ? {
        type: "div",
        props: {
          style: {
            display: "flex",
            gap: "12px",
          },
          children: tags.slice(0, 3).map((tag: string) => ({
            type: "div",
            props: {
              style: {
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: 20,
              },
              children: `#${tag}`,
            },
          })),
        },
      }
    : null;

  const html = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      children: [
        // Header with favicon and logo/site name
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "white",
              fontSize: 32,
              fontWeight: "bold",
              opacity: 0.9,
            },
            children: [
              {
                type: "img",
                props: {
                  src: "https://oluwasetemi.dev/favicon-32x32.png",
                  width: 48,
                  height: 48,
                  style: {
                    borderRadius: "8px",
                  },
                },
              },
              {
                type: "div",
                props: {
                  children: "oluwasetemi.dev",
                },
              },
            ],
          },
        },
        // Main content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            },
            children: [
              // Title
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: 64,
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    maxWidth: "900px",
                  },
                  children: title,
                },
              },
              // Description
              description && {
                type: "div",
                props: {
                  style: {
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: 32,
                    lineHeight: 1.4,
                    maxWidth: "900px",
                  },
                  children:
                    description.length > 150
                      ? `${description.substring(0, 150)}...`
                      : description,
                },
              },
            ].filter(Boolean),
          },
        },
        // Footer with date and tags
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            },
            children: [
              // Date
              {
                type: "div",
                props: {
                  style: {
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: 24,
                  },
                  children: formattedDate,
                },
              },
              // Tags
              tagList,
            ].filter(Boolean),
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
}

export const prerender = true;
