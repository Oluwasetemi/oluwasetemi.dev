import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  shortcuts: {
    "text-gradient":
      "text-transparent bg-clip-text bg-gradient-to-tl from-green-300 via-teal-400 to-purple-500",
    "bg-main": "bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])",
    "text-common": "text-[#5D8392]",
    "logo": "i-ri-reactjs-fill w-6em h-6em transform transition-800 hover:rotate-180",
    "btn": "px-4 py-1 bg-blue-500 text-white rounded",
    "card": "p-4 shadow-md border rounded-lg",
    "input":
      "px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200",
  },
  rules: [
    ["w-fill", { width: "-webkit-fill-available" }],
    ["custom-shadow", { "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }],
    [
      /^grid-cols-(\d+)$/,
      ([, d]) => ({
        "grid-template-columns": `repeat(${d}, minmax(0, 1fr))`,
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        // You can add more icon collections here
        ic: () => import("@iconify-json/ic/icons.json").then(i => i.default),
        mdi: () => import("@iconify-json/mdi/icons.json").then(i => i.default),
        ri: () => import("@iconify-json/ri/icons.json").then(i => i.default),
      },
    }),
    presetWebFonts({
      fonts: {
        strong: "Rubik Iso",
        fast: "Ubuntu",
        hand: "Caveat",
        mono: {
          name: "IBM Plex Mono",
          italic: true,
        },
      },
    }),
  ],
});
