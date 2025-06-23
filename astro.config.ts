import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://oluwasetemi.dev",

  integrations: [
    mdx(),
    UnoCSS(),
    react(
      {
        include: ["**/*.{jsx,tsx}"],
        experimentalReactChildren: true,
      },
    ),
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
          if (warning.code === "TYPESCRIPT_WARNING"
            && warning.message?.includes("constructor function may be converted to a class")) {
            return;
          }
          warn(warning);
        },
      },
    },
    define: {
      // eslint-disable-next-line node/no-process-env
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },
  },

  output: "server",
  adapter: netlify({
    edgeMiddleware: false,
  }),
});
