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
    subtitle: "Software Engineer & Developer Advocate",
    description:
      "Building delightful web experiences with modern JavaScript, React, and developer tools",
  },
  about: {
    title: "About Me",
    description:
      "Software Engineer passionate about web development, open source, and sharing knowledge with the community",
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
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
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
                    fontSize: 80,
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
                    fontSize: 40,
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
                    fontSize: 32,
                    lineHeight: 1.4,
                    maxWidth: "900px",
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
              width: "100%",
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
                children: params.page === "home" ? "Welcome" : params.page,
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
