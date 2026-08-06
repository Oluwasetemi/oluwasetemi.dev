import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://oluwasetemi.dev",
  env: {
    schema: {
      PUBLIC_GISCUS_REPO: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GISCUS_REPO_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GISCUS_CATEGORY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GISCUS_CATEGORY_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GOOGLE_ANALYTICS_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  markdown: {
    processor: unified(),
    syntaxHighlight: false, // Disable Astro's built-in syntax highlighting
  },
  integrations: [
    expressiveCode({
      themes: ["dracula", "github-light"],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
    }),
    mdx({
      syntaxHighlight: false, // Also disable for MDX
    }),
    react({
      include: ["**/*.{jsx,tsx}"],
      experimentalReactChildren: true,
    }),
    sitemap(),
  ],
  vite: {
    build: {
      rollupOptions: {
        external: [
          "tinify",
          "prettier",
          "ora",
          "open",
          "mkdirp",
          "axios",
          "@sindresorhus/slugify",
          "dotenv",
          "fake-useragent",
          "json-to-pretty-yaml",
          "prompts",
        ],
        onwarn(warning, warn) {
          // Suppress constructor function warnings
          if (
            // eslint-disable-next-line style/operator-linebreak
            warning.code === "TYPESCRIPT_WARNING" &&
            warning.message?.includes(
              "constructor function may be converted to a class",
            )
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: false,
  }),
});
