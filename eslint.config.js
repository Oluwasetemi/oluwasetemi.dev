import setemiojo from "@setemiojo/eslint-config";

export default setemiojo(
  {
    ignores: [
      "node_modules",
      "**/node_modules/**",
      "public",
      "**/public/**",
      "backup",
      "**/backup/**",
    ],
    formatters: true,
    astro: true,
    typescript: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md", "Layout.astro"],
        },
      ],
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "style/brace-style": "off",
      "format/prettier": "off",
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "style/brace-style": "off",
      "format/prettier": "off",
      "style/operator-linebreak": "off",
      "style/arrow-parens": "off",
    },
  },
);
