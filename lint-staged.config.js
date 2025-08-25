export default {
  "*.js": ["eslint", "vitest run --changed"],
  "*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)": [
    "prettier --write",
  ],
};
