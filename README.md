[![Netlify Status](https://api.netlify.com/api/v1/badges/d20c7249-49e8-4cd8-910d-e8adabf0dc21/deploy-status)](https://app.netlify.com/sites/condescending-colden-668de7/deploys)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Oluwasetemi/oluwasetemi.dev?utm_source=oss&utm_medium=github&utm_campaign=Oluwasetemi%2Foluwasetemi.dev&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [OOS - Ojo Oluwasetemi Stephen's Blog](#oos---ojo-oluwasetemi-stephens-blog)
  - [🚀 Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Building for Production](#building-for-production)
  - [📝 Content Management](#-content-management)
    - [Blog Posts](#blog-posts)
    - [Portfolio Projects](#portfolio-projects)
  - [🎨 Styling](#-styling)
  - [🧪 Testing](#-testing)
  - [📦 Deployment](#-deployment)
  - [🔧 Configuration](#-configuration)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# OOS - Ojo Oluwasetemi Stephen's Blog

A modern, fast, and SEO-optimized personal blog and portfolio website built with [Astro](https://astro.build). Originally created with Gatsby and migrated to Astro for better performance and developer experience.

## 🚀 Features

- **⚡ Lightning Fast**: Built with Astro for optimal performance
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🎨 Modern UI**: Clean, accessible design with smooth animations
- **📝 Content Collections**: Type-safe content management with MDX
- **🔍 SEO Optimized**: Built-in sitemap, RSS feeds, and meta tags
- **📊 Portfolio Showcase**: Dedicated section for project highlights
- **🏷️ Tag System**: Organized content with tags and categories
- **🌙 Dark Mode Ready**: Prepared for future dark mode implementation
- **🧪 Testing**: Comprehensive test suite with Vitest
- **📦 TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[MDX](https://mdxjs.com)** - Markdown with JSX support
- **[React](https://reactjs.org)** - Interactive components
- **[Vitest](https://vitest.dev)** - Unit testing
- **[ESLint](https://eslint.org)** - Code linting
- **[Netlify](https://netlify.com)** - Hosting and deployment

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── blog-post-card.astro
│   ├── portfolio-card.astro
│   ├── header.astro
│   └── headerlink.astro
├── content/            # Content collections
│   ├── blog/          # Blog posts (MDX)
│   ├── portfolio/     # Portfolio projects (MDX)
│   └── config.ts      # Collection schemas
├── layouts/           # Page layouts
│   ├── layout.astro   # Base layout component
│   └── blogpost.astro # Blog post layout
├── pages/             # Astro pages
│   ├── index.astro    # Homepage
│   ├── about.astro    # About page
│   ├── blog/          # Blog pages
│   └── portfolio/     # Portfolio pages
├── styles/            # Global styles
│   └── global.css     # Tailwind imports and custom styles
└── utils/             # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **Bun** (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd oluwasetemi.dev
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

3. **Start the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

### Development

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linting
bun run lint

# Fix linting issues
bun run lint:fix

# Run tests
bun test

# Run tests with UI
bun run test:ui
```

### Building for Production

```bash
# Build the site
bun run build

# Preview the build
bun run preview
```

## 📝 Content Management

### Blog Posts

Create new blog posts in `src/content/blog/`:

```mdx
---
title: "My New Blog Post"
description: "A brief description of the post"
pubDate: 2024-01-15
tags: ["astro", "web-development", "tutorial"]
heroImage: "/path/to/image.jpg"
---

# My New Blog Post

Your content here...
```

### Portfolio Projects

Add portfolio projects in `src/content/portfolio/`:

```mdx
---
title: "Project Name"
description: "Project description"
date: 2024-01-15
tags: ["react", "typescript", "tailwind"]
url: "https://project-url.com"
github: "https://github.com/username/project"
tech: ["React", "TypeScript", "Tailwind CSS"]
heroImage: "/path/to/project-image.jpg"
---

# Project Details

Project description and details...
```

## 🎨 Styling

This project uses **Tailwind CSS v4** with a custom configuration:

- **Custom Colors**: Accent colors defined in `tailwind.config.js`
- **Custom Fonts**: IBM Plex Mono and Ubuntu font stack
- **Component Classes**: Reusable component styles in `global.css`
- **Responsive Design**: Mobile-first approach with breakpoint utilities

### Custom Styling

Add custom styles in `src/styles/global.css`:

```css
@import "tailwindcss";

@layer base {
  /* Base styles */
}

@layer components {
  /* Component styles */
}

@layer utilities {
  /* Utility styles */
}
```

## 🧪 Testing

The project includes a comprehensive test suite:

```bash
# Run all tests
bun test

# Run tests with UI
bun run test:ui

# Run tests in watch mode
bun test --watch
```

Tests are written using:

- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing
- **jsdom** - DOM environment for testing

## 📦 Deployment

This site is deployed on **Netlify** with the following features:

- **Automatic Deploys**: Connected to Git repository
- **Edge Functions**: Server-side functionality
- **CDN**: Global content delivery
- **HTTPS**: Secure by default

### Deployment Configuration

The site uses the `@astrojs/netlify` adapter for optimal Netlify integration:

```typescript
// astro.config.ts
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server",
  adapter: netlify({
    edgeMiddleware: false,
  }),
});
```

## 🔧 Configuration

### Key Configuration Files

- **`astro.config.ts`** - Astro configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.js`** - ESLint rules and settings
- **`vitest.config.ts`** - Test configuration

### Environment Variables

Create a `.env` file for local development:

```env
# Site configuration
SITE_URL=https://oluwasetemi.dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure all linting checks pass
- Maintain responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by [Ojo Oluwasetemi Stephen](https://oluwasetemi.dev)**
