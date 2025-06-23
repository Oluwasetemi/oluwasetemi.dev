import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://oluwasetemi.dev",
  integrations: [mdx(), UnoCSS(), react(), sitemap()],
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
          "prompts"
        ]
      }
    }
  }
});
