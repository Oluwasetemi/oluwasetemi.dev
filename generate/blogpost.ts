// TODO: I need a better image generation workflow, the current one is not efficient, and while its free, I wanna go cost-effective.

import slugify from "@sindresorhus/slugify";
import axios from "axios";
import dotenv from "dotenv";
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

type CachedFormData = {
  postType: PostType;
  title: string;
  description: string;
  tags: string;
  isPublished: boolean;
  unsplashPhotoId?: string;
  timestamp: number;
};

// Get the root path to our project (Like `__dirname`).
const root = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(root, ".env"),
});

const fromRoot = (...p: string[]): string => path.join(root, "..", ...p);
const cacheFilePath = path.join(root, ".cache-blogpost.json");

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

async function getPhotoDetails(unsplashPhotoId: string): Promise<{
  downloadUrl: string;
  credit: string;
}> {
  // eslint-disable-next-line node/no-process-env
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY not found in environment variables");
  }

  const response = await axios({
    url: `https://api.unsplash.com/photos/${unsplashPhotoId}`,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  const { urls, user, links } = response.data;

  // Trigger download tracking (required by Unsplash API guidelines)
  await axios({
    url: links.download_location,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  return {
    downloadUrl: `${urls.raw}&w=2070&q=90&fm=jpg`,
    credit: `Photo by [${user.name}](${user.links.html}?utm_source=oluwasetemi.dev&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=oluwasetemi.dev&utm_medium=referral)`,
  };
}

// Cache management functions
function loadCache(): CachedFormData | null {
  try {
    if (fs.existsSync(cacheFilePath)) {
      const cacheData = fs.readFileSync(cacheFilePath, "utf-8");
      return JSON.parse(cacheData);
    }
  } catch (error) {
    console.error("⚠️ Error loading cache:", error);
  }
  return null;
}

function saveCache(data: CachedFormData): void {
  try {
    fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("⚠️ Error saving cache:", error);
  }
}

function clearCache(): void {
  try {
    if (fs.existsSync(cacheFilePath)) {
      fs.unlinkSync(cacheFilePath);
    }
  } catch (error) {
    console.error("⚠️ Error clearing cache:", error);
  }
}

function extractUnsplashPhotoId(input: string): string {
  // Pattern for Unsplash photo ID (10-11 characters: alphanumeric, underscores, hyphens)
  // Examples: "MGXSVqffa_Y", "RMUSYeC4r5I", "abc-def_123"
  const idPattern = /[\w-]{10,11}(?![\w-])/;

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
  cachedPhotoId?: string,
): Promise<string | null> {
  const imagesDestination = path.join(destination, "images");

  let unsplashPhotoId: string | undefined = cachedPhotoId;

  // Only prompt if no cached photo ID
  if (!cachedPhotoId) {
    await open(`https://unsplash.com/s/photos/${encodeURIComponent(title)}`, {
      wait: false,
    });

    const response = (await prompts([
      {
        type: "text",
        name: "unsplashPhotoId",
        message: `What's the Unsplash Photo URL for the banner? (e.g., 'EidIT3cPydQ' from https://unsplash.com/photos/description-EidIT3cPydQ)`,
      },
    ])) as { unsplashPhotoId?: string };

    unsplashPhotoId = response.unsplashPhotoId;
  } else {
    console.log(`📷 Using cached photo ID: ${cachedPhotoId}`);
  }

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

      // Save photo ID to cache for retry
      const cachedData = loadCache();
      if (cachedData) {
        saveCache({
          ...cachedData,
          unsplashPhotoId: cleanPhotoId,
        });
      }

      // Get photo details from Unsplash API
      spinner.text = "🔄 Fetching photo from Unsplash API...";
      const { downloadUrl, credit } = await getPhotoDetails(cleanPhotoId);

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
        downloadUrl,
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

      const bannerCredit = credit;

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
    // Check for cached data
    const cachedData = loadCache();
    let shouldResume = false;

    if (cachedData) {
      const ageInMinutes = Math.floor(
        (Date.now() - cachedData.timestamp) / 1000 / 60,
      );
      console.log(
        `📦 Found cached data from ${ageInMinutes} minute${ageInMinutes !== 1 ? "s" : ""} ago`,
      );
      console.log(`   Title: "${cachedData.title}"`);

      const { resume } = (await prompts([
        {
          type: "confirm",
          name: "resume",
          message: "Do you want to resume from cached data?",
          initial: true,
        },
      ])) as { resume: boolean };

      shouldResume = resume;

      if (!shouldResume) {
        clearCache();
      }
    }

    // Get form data (either from cache or prompts)
    let postType: PostType;
    let title: string;
    let description: string;
    let tags: string;
    let isPublished: boolean;

    if (shouldResume && cachedData) {
      // Use cached data
      postType = cachedData.postType;
      title = cachedData.title;
      description = cachedData.description;
      tags = cachedData.tags;
      isPublished = cachedData.isPublished;
      console.log("✅ Using cached data");
    } else {
      // Collect new data
      const postTypeResponse = (await prompts([
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
      postType = postTypeResponse.postType;

      const formResponse = (await prompts([
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

      title = formResponse.title;
      description = formResponse.description;
      tags = formResponse.tags;
      isPublished = formResponse.isPublished;

      // Save cache after collecting form data
      saveCache({
        postType,
        title,
        description,
        tags,
        isPublished,
        timestamp: Date.now(),
      });
    }

    const slug = slugify(title);
    const destination = fromRoot("/src/content/blog", slug);
    mkdirpSync(destination);

    let bannerCredit: string | null = null;
    if (postType !== "youtube") {
      bannerCredit = await getBannerPhoto(
        title,
        destination,
        cachedData?.unsplashPhotoId,
      );
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

    // Clear cache only if everything succeeded
    // For blog posts, image must have succeeded (bannerCredit not null)
    // For youtube posts, no image is needed
    const shouldClearCache =
      postType === "youtube" || (postType === "blog" && bannerCredit !== null);

    if (shouldClearCache) {
      clearCache();
      console.log(
        `${destination.replace(process.cwd(), "")} is all ready for you`,
      );
    } else {
      console.log(
        `${destination.replace(process.cwd(), "")} is all ready for you`,
      );
      console.log("⚠️ Image processing failed - cache kept for retry");
    }
  } catch (error) {
    console.error("Error generating blog post:", error);
    console.log("💾 Cache saved - run again to resume");
    process.exit(1);
  }
}

// Run the generator
generateBlogPost();

/* eslint no-console:0 */
