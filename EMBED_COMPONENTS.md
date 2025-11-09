# Embed Components Usage Guide

This guide shows you how to use the Tweet and YouTube embed components in your MDX blog posts.

## Tweet Component

Embed tweets from Twitter/X in your blog posts.

### Usage

```mdx
---
title: My Blog Post
---

import Tweet from "../../components/tweet.astro";

# My Blog Post

Check out this awesome tweet:

<Tweet id="1234567890123456789" />

You can also specify the theme:

<Tweet id="1234567890123456789" theme="dark" />
```

### Props

- **id** (required): The tweet ID from the URL (e.g., from `https://twitter.com/username/status/1234567890123456789`, use `1234567890123456789`)
- **theme** (optional): `'light'` or `'dark'` - defaults to `'light'`

### Example

To embed this tweet: `https://twitter.com/setemiojo/status/1234567890123456789`

```mdx
<Tweet id="1234567890123456789" />
```

---

## YouTube Component

Embed YouTube videos in your blog posts with responsive sizing.

### Usage

```mdx
---
title: My Blog Post
---

import YouTube from "../../components/youtube.astro";

# My Blog Post

Watch this tutorial:

<YouTube id="dQw4w9WgXcQ" />

With custom title and aspect ratio:

<YouTube
  id="dQw4w9WgXcQ"
  title="Tutorial: How to do something awesome"
  aspectRatio="4/3"
/>
```

### Props

- **id** (required): The YouTube video ID from the URL (e.g., from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, use `dQw4w9WgXcQ`)
- **title** (optional): Accessibility title for the iframe - defaults to `'YouTube video'`
- **aspectRatio** (optional): `'16/9'` or `'4/3'` - defaults to `'16/9'`

### Example

To embed this video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

```mdx
<YouTube id="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" />
```

---

## Using Both Components in a Blog Post

```mdx
---
title: My Amazing Blog Post
description: A post with embedded content
publishedDate: 2025-01-09
---

import Tweet from "../../components/tweet.astro";
import YouTube from "../../components/youtube.astro";

# My Amazing Blog Post

Here's some text content...

## Video Tutorial

<YouTube id="dQw4w9WgXcQ" title="Tutorial Video" />

## Community Response

People loved this! Check out this tweet:

<Tweet id="1234567890123456789" />

And here's another in dark mode:

<Tweet id="9876543210987654321" theme="dark" />
```

---

## Tips

### Finding Tweet IDs

The tweet ID is the long number at the end of the tweet URL:

- URL: `https://twitter.com/setemiojo/status/1234567890123456789`
- ID: `1234567890123456789`

### Finding YouTube Video IDs

The video ID is in the YouTube URL after `v=`:

- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ID: `dQw4w9WgXcQ`

Or for shortened URLs, it's after `youtu.be/`:

- URL: `https://youtu.be/dQw4w9WgXcQ`
- ID: `dQw4w9WgXcQ`

### Styling

Both components come with built-in styling:

- **Tweet**: Centered with responsive width
- **YouTube**: Responsive container with 8:9 or 4:3 aspect ratio, rounded corners, and shadow

The components have proper spacing (`my-8` class) and will fit nicely within your blog post layout.
