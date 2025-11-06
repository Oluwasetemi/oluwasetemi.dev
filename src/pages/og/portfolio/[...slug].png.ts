import type { CollectionEntry } from "astro:content";

import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const portfolioItems = await getCollection("portfolio");
  return portfolioItems.map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }));
}

type Props = {
  item: CollectionEntry<"portfolio">;
};

export async function GET({ props }: { props: Props }) {
  const { item } = props;
  const { title, description, tags, tech } = item.data;

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
        // Header with favicon, logo/site name and badge
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
              {
                type: "div",
                props: {
                  style: {
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: 24,
                    fontWeight: "600",
                  },
                  children: "PORTFOLIO",
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
                    description.length > 120
                      ? `${description.substring(0, 120)}...`
                      : description,
                },
              },
            ].filter(Boolean),
          },
        },
        // Footer with tech stack
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
            },
            children: [
              // Tech stack label
              (tech && tech.length > 0) || (tags && tags.length > 0)
                ? {
                    type: "div",
                    props: {
                      style: {
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: 20,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      },
                      children: "Built with",
                    },
                  }
                : null,
              // Tech tags
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  },
                  children: [
                    ...(tech || []).slice(0, 5).map((t) => ({
                      type: "div",
                      props: {
                        style: {
                          background: "rgba(255, 255, 255, 0.25)",
                          color: "white",
                          padding: "8px 20px",
                          borderRadius: "8px",
                          fontSize: 22,
                          fontWeight: "500",
                        },
                        children: t,
                      },
                    })),
                    ...(tags || []).slice(0, 3).map((tag) => ({
                      type: "div",
                      props: {
                        style: {
                          background: "rgba(255, 255, 255, 0.15)",
                          color: "white",
                          padding: "8px 20px",
                          borderRadius: "8px",
                          fontSize: 20,
                        },
                        children: `#${tag}`,
                      },
                    })),
                  ].filter(Boolean),
                },
              },
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
