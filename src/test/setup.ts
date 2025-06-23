import "@testing-library/jest-dom";

// Mock Astro globals
(globalThis as any).Astro = {
  env: {
    DEV: true,
    PROD: false,
    BASE_URL: "/",
    SITE: "https://oluwasetemi.dev",
  },
};
