import slugify from "@sindresorhus/slugify";
import axios from "axios";
import dotenv from "dotenv";
import fakeUa from "fake-useragent";
import jsToYaml from "json-to-pretty-yaml";
import { mkdirpSync } from "mkdirp";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import util from "node:util";
import open from "open";
import ora from "ora";
import prettier from "prettier";
import prompts from "prompts";
import tinify from "tinify";

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
        .map(s => s.trim())
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

  const { groups: { name } } = match;
  return `Photo by [${name}](https://unsplash.com/photos/${unsplashPhotoId})`;
}

async function getBannerPhoto(title: string, destination: string): Promise<string | null> {
  const imagesDestination = path.join(destination, "images");

  await open(
    `https://unsplash.com/search/photos/${encodeURIComponent(title)}`,
    {
      wait: false,
    },
  );

  const { unsplashPhotoId } = await prompts([
    {
      type: "text",
      name: "unsplashPhotoId",
      message: `What's the Unsplash Photo ID for the banner for this post?`,
    },
  ]) as { unsplashPhotoId?: string };

  mkdirpSync(imagesDestination);

  if (unsplashPhotoId) {
    const source = await tinify
      .fromUrl(
        `https://unsplash.com/photos/${unsplashPhotoId}/download?force=true`,
      )
      .resize({
        method: "scale",
        width: 2070,
      });

    const spinner = ora("compressing the image with tinypng.com").start();
    await util
      .promisify(source.toFile)
      .call(source, path.join(imagesDestination, "banner.jpg"));
    spinner.text = "compressed the image with tinypng.com";
    spinner.stop();

    const bannerCredit = await getPhotoCredit(unsplashPhotoId);
    return bannerCredit;
  }

  return null;
}

async function generateBlogPost(): Promise<void> {
  try {
    // create a prompt for blog post or youtube video post
    const { postType } = await prompts([
      {
        type: "select",
        name: "postType",
        message: "What type of post do you want to create?",
        choices: [
          { title: "Blog Post", value: "blog" },
          { title: "YouTube Video", value: "youtube" },
        ],
      },
    ]) as { postType: PostType };

    const { title, description, tags, isPublished } = await prompts([
      {
        type: "text",
        name: "title",
        message: "Title",
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
    ]) as { title: string; description: string; tags: string; isPublished: boolean };

    const slug = slugify(title);
    const destination = fromRoot("/content/blog", slug);
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

    console.log(`${destination.replace(process.cwd(), "")} is all ready for you`);
  }
  catch (error) {
    console.error("Error generating blog post:", error);
    process.exit(1);
  }
}

// Run the generator
generateBlogPost();

/* eslint no-console:0 */
