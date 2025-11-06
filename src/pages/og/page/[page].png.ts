import { ImageResponse } from "@vercel/og";

export async function getStaticPaths() {
  return [
    { params: { page: "home" } },
    { params: { page: "about" } },
    { params: { page: "blog" } },
    { params: { page: "portfolio" } },
    { params: { page: "uses" } },
    { params: { page: "links" } },
  ];
}

const pageConfig: Record<
  string,
  { title: string; description: string; subtitle?: string }
> = {
  home: {
    title: "Oluwasetemi",
    subtitle: "Fullstack Engineer",
    description:
      "Building and teaching delightful web experiences with modern JavaScript, React, and AI",
  },
  about: {
    title: "About Me",
    description:
      "Fullstack Engineer passionate about web development, open source, and sharing knowledge with the community",
  },
  blog: {
    title: "Blog",
    description:
      "Thoughts on web development, JavaScript, developer experience, and building better software",
  },
  portfolio: {
    title: "Portfolio",
    description:
      "A collection of projects showcasing my work in web development, open source contributions, and experiments",
  },
  uses: {
    title: "Uses",
    description:
      "Tools, software, and hardware I use daily for development, content creation, and productivity",
  },
  links: {
    title: "Links",
    description:
      "Find me on the web - social media profiles, projects, and ways to connect",
  },
};

export async function GET({ params }: { params: { page: string } }) {
  const config = pageConfig[params.page];

  if (!config) {
    return new Response("Page not found", { status: 404 });
  }

  const html = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        gap: "60px",
      },
      children: [
        // Left side: Content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              maxWidth: "700px",
            },
            children: [
              // Header with favicon and logo
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
                          fontSize: 72,
                          fontWeight: "bold",
                          lineHeight: 1.1,
                        },
                        children: config.title,
                      },
                    },
                    // Subtitle (for home page)
                    config.subtitle && {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255, 255, 255, 0.95)",
                          fontSize: 36,
                          fontWeight: "500",
                          lineHeight: 1.3,
                        },
                        children: config.subtitle,
                      },
                    },
                    // Description
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: 28,
                          lineHeight: 1.4,
                        },
                        children: config.description,
                      },
                    },
                  ].filter(Boolean),
                },
              },
              // Footer
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                  },
                  children: {
                    type: "div",
                    props: {
                      style: {
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: 24,
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                      },
                      children:
                        params.page === "home" ? "Welcome" : params.page,
                    },
                  },
                },
              },
            ],
          },
        },
        // Right side: Headshot
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            children: {
              type: "img",
              props: {
                src: "https://res.cloudinary.com/drnqdd87d/image/upload/v1730477477/headshot/file.png",
                width: 400,
                height: 400,
                style: {
                  borderRadius: "20px",
                  border: "6px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                },
              },
            },
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
