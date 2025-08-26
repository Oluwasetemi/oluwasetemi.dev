import slugify from "@sindresorhus/slugify";
import axios from "axios";
import dotenv from "dotenv";
import fakeUa from "fake-useragent";
import jsToYaml from "json-to-pretty-yaml";
import { mkdirpSync } from "mkdirp";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import open from "open";
import ora from "ora";
import prettier from "prettier";
import prompts from "prompts";
import tinify from "tinify";

import { processImageWithFallback } from "./wasm-image-processor.js";

// Types
type PostType = "blog" | "youtube";

type BlogPostData = {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[] | null;
  isPublished: boolean;
  isDraft: boolean;
  banner?: string;
  bannerCredit?: string | null;
};

// Get the root path to our project (Like `__dirname`).
const root = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(root, ".env"),
});

const fromRoot = (...p: string[]): string => path.join(root, "..", ...p);

// eslint-disable-next-line node/no-process-env
tinify.key = process.env.TINY_PNG_API_KEY || "";

const padLeft0 = (n: number): string => n.toString().padStart(2, "0");

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`;
}

function listify(a: string | undefined): string[] | null {
  return a && a.trim().length
    ? a
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
}

function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((o, [key, value]) => {
    if (value) {
      o[key as keyof T] = value;
    }
    return o;
  }, {} as Partial<T>);
}

async function getPhotoCredit(unsplashPhotoId: string): Promise<string> {
  const response = await axios({
    url: `https://unsplash.com/photos/${unsplashPhotoId}`,
    headers: { "User-Agent": fakeUa() },
  });

  const match = response.data.match(/Photo by (?<name>.*?) on Unsplash/) || {
    groups: { name: "Unknown" },
  };

  const {
    groups: { name },
  } = match;
  return `Photo by [${name}](https://unsplash.com/photos/${unsplashPhotoId})`;
}

function extractUnsplashPhotoId(input: string): string {
  // Pattern for Unsplash photo ID (10-11 alphanumeric characters)
  // Most Unsplash IDs are mixed case alphanumeric strings
  const idPattern = /[A-Z0-9]{10,11}(?![A-Z0-9])/i;

  // 1️⃣ Handle URLs: https://unsplash.com/photos/...
  const urlMatch = input.match(/unsplash\.com\/photos\/([^/?]+)/i);
  if (urlMatch) {
    const afterPhotos = urlMatch[1]; // e.g. "a-bottle-of-blue-liquid-next-to-a-rock-RMUSYeC4r5I"

    // First check if there's an ID at the end after a dash
    const segments = afterPhotos.split("-");
    const lastSegment = segments[segments.length - 1];
    if (idPattern.test(lastSegment)) {
      return lastSegment;
    }

    // If no ID found after dash, check if the whole path segment is an ID
    if (idPattern.test(afterPhotos)) {
      return afterPhotos;
    }
  }

  // 2️⃣ Handle plain strings: look for ID pattern anywhere in the string
  const matches = input.match(idPattern);
  if (matches) {
    return matches[0];
  }

  // If no ID pattern is found, return empty string
  return "";
}

async function getBannerPhoto(
  title: string,
  destination: string,
): Promise<string | null> {
  const imagesDestination = path.join(destination, "images");

  await open(`https://unsplash.com/s/photos/${encodeURIComponent(title)}`, {
    wait: false,
  });

  const { unsplashPhotoId } = (await prompts([
    {
      type: "text",
      name: "unsplashPhotoId",
      message: `What's the Unsplash Photo URL for the banner? (e.g., 'EidIT3cPydQ' from https://unsplash.com/photos/description-EidIT3cPydQ)`,
    },
  ])) as { unsplashPhotoId?: string };

  mkdirpSync(imagesDestination);

  if (unsplashPhotoId) {
    const spinner = ora("🔄 Processing banner image...").start();
    try {
      // Extract and clean the photo ID
      const cleanPhotoId = extractUnsplashPhotoId(unsplashPhotoId);
      if (!cleanPhotoId) {
        spinner.fail("❌ Invalid Unsplash photo ID");
        return null;
      }
      spinner.text = `🔄 Found photo ID: ${cleanPhotoId}`;

      const unsplashDownloadUrl = `https://unsplash.com/photos/${cleanPhotoId}/download?force=true&w=2070`;

      spinner.text = "🔄 Processing image with fallback...";

      // Create TinyPNG processor function
      const tinyPngProcessor = async (
        url: string,
        outputPath: string,
        options: any,
      ) => {
        // eslint-disable-next-line node/no-process-env
        tinify.key = process.env.TINY_PNG_API_KEY || "";
        if (!tinify.key) {
          throw new Error("No TinyPNG API key configured");
        }

        const source = await tinify.fromUrl(url);
        const resized = source.resize({
          method: "scale",
          width: options.width || 2070,
        });

        const result = await resized.result();
        const buffer = await result.toBuffer();
        await fs.promises.writeFile(outputPath, buffer);
        return outputPath;
      };

      // Output path
      const outputPath = path.join(imagesDestination, "banner.jpg");

      // Use the integrated fallback approach
      await processImageWithFallback(
        unsplashDownloadUrl,
        outputPath,
        {
          width: 2070,
          quality: 90,
          format: "jpeg",
        },
        tinyPngProcessor,
      );

      // Verify the file was saved
      if (!fs.existsSync(outputPath)) {
        throw new Error("Failed to save the image");
      }

      // Get photo credit
      spinner.text = "🔄 Getting photo credit...";
      const bannerCredit = await getPhotoCredit(cleanPhotoId);

      spinner.succeed("✅ Banner image processed successfully with fallback");
      return bannerCredit;
    } catch (error) {
      console.error("❌ Error processing image:", error);

      if (error instanceof Error) {
        if (
          error.message.includes("401") ||
          error.message.includes("Invalid API key")
        ) {
          console.error(
            "🔑 TinyPNG API issue (falling back to WebAssembly processing)",
          );
        } else if (error.message.includes("429")) {
          console.error(
            "📊 TinyPNG monthly limit reached (using WebAssembly fallback)",
          );
        } else if (
          error.message.includes("403") ||
          error.message.includes("400") ||
          error.message.includes("404")
        ) {
          console.error(
            "🌐 Unsplash URL access issue (WebAssembly fallback should handle this)",
          );
          console.log(
            "💡 Try using a different Unsplash photo ID or check if the image is publicly accessible",
          );
          console.log(
            "📝 Example photo ID format: 'EidIT3cPydQ' from https://unsplash.com/photos/description-EidIT3cPydQ",
          );
        } else if (error.message.includes("download")) {
          console.error(
            "🌐 Network error downloading image. Please check your internet connection",
          );
        }
      }
      spinner?.fail("❌ Error processing image");

      return null;
    }
  }

  return null;
}

async function generateBlogPost(): Promise<void> {
  try {
    // create a prompt for blog post or youtube video post
    const { postType } = (await prompts([
      {
        type: "select",
        name: "postType",
        message: "What type of post do you want to create?",
        choices: [
          { title: "Blog Post", value: "blog" },
          { title: "YouTube Video", value: "youtube" },
        ],
      },
    ])) as { postType: PostType };

    const { title, description, tags, isPublished } = (await prompts([
      {
        type: "text",
        name: "title",
        message: "Title",
        validate: (value) =>
          value && value.trim().length > 0 ? true : "Title cannot be empty",
      },
      {
        type: "text",
        name: "description",
        message: "Description",
      },
      {
        type: "text",
        name: "tags",
        message: "Tags (comma separated)",
      },
      {
        type: "confirm",
        name: "isPublished",
        message: "Do you want to publish?",
      },
    ])) as {
      title: string;
      description: string;
      tags: string;
      isPublished: boolean;
    };

    const slug = slugify(title);
    const destination = fromRoot("/src/content/blog", slug);
    mkdirpSync(destination);

    let bannerCredit: string | null = null;
    if (postType !== "youtube") {
      bannerCredit = await getBannerPhoto(title, destination);
    }

    const postData: BlogPostData = {
      title,
      date: formatDate(new Date()),
      author: "Ojo Oluwasetemi Stephen 00S",
      description: `_${description}_`,
      tags: listify(tags),
      isPublished,
      isDraft: !isPublished,
      ...(postType !== "youtube" && { banner: "./images/banner.jpg" }),
      ...(bannerCredit && { bannerCredit }),
    };

    const yaml = jsToYaml.stringify(removeEmpty(postData));

    const markdown = await prettier.format(`---\n${yaml}\n---\n`, {
      parser: "mdx",
    });

    await fs.promises.writeFile(path.join(destination, "index.mdx"), markdown);

    console.log(
      `${destination.replace(process.cwd(), "")} is all ready for you`,
    );
  } catch (error) {
    console.error("Error generating blog post:", error);
    process.exit(1);
  }
}

// Run the generator
generateBlogPost();

/* eslint no-console:0 */
