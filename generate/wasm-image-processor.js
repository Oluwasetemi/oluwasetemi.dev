import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
import https from "node:https";
import sharp from "sharp";

/**
 * Sharp-based image processor (uses WebAssembly under the hood)
 */
export class WASMImageProcessor {
  /**
   * Download image from URL
   * @param {string} url - Image URL
   * @returns {Promise<Buffer>} Image buffer
   */
  async downloadImage(url) {
    return new Promise((resolve, reject) => {
      const downloadWithRedirects = (currentUrl, redirectCount = 0) => {
        if (redirectCount > 5) {
          reject(new Error("Too many redirects"));
          return;
        }

        https
          .get(currentUrl, (response) => {
            // Handle redirects
            if (
              response.statusCode >= 300 &&
              response.statusCode < 400 &&
              response.headers.location
            ) {
              const redirectUrl = response.headers.location;
              // console.log(`📍 Redirecting to: ${redirectUrl}`);
              downloadWithRedirects(redirectUrl, redirectCount + 1);
              return;
            }

            if (response.statusCode !== 200) {
              reject(
                new Error(`Failed to download image: ${response.statusCode}`),
              );
              return;
            }
            const chunks = [];
            response.on("data", (chunk) => chunks.push(chunk));
            response.on("end", () => resolve(Buffer.concat(chunks)));
            response.on("error", reject);
          })
          .on("error", reject);
      };

      downloadWithRedirects(url);
    });
  }

  /**
   * Resize and compress image using Sharp (WebAssembly-powered)
   * @param {string} imageUrl - URL of the image to process
   * @param {object} options - Processing options
   * @param {number} options.width - Target width
   * @param {number} options.height - Target height (optional)
   * @param {number} options.quality - JPEG quality (1-100, default 85)
   * @param {string} options.format - Output format ('jpeg', 'webp', 'avif', default 'jpeg')
   * @returns {Promise<Buffer>} Processed image buffer
   */
  async resizeImage(imageUrl, options = {}) {
    const { width, height, quality = 85, format = "jpeg" } = options;

    try {
      // console.log(`🌐 Downloading image from: ${imageUrl}`);
      const imageBuffer = await this.downloadImage(imageUrl);

      // console.log(`📐 Processing image with Sharp (${format}, quality: ${quality})`);

      let sharpInstance = sharp(imageBuffer);

      // Configure resize options
      if (height) {
        sharpInstance = sharpInstance.resize(width, height);
      } else {
        sharpInstance = sharpInstance.resize(width);
      }

      // Configure output format and quality
      switch (format) {
        case "webp":
          sharpInstance = sharpInstance.webp({ quality });
          break;
        case "avif":
          sharpInstance = sharpInstance.avif({ quality });
          break;
        case "png":
          sharpInstance = sharpInstance.png({ quality });
          break;
        case "jpeg":
        default:
          sharpInstance = sharpInstance.jpeg({ quality });
          break;
      }

      const processedBuffer = await sharpInstance.toBuffer();

      // console.log(`✅ Sharp processing complete`);
      return processedBuffer;
    } catch (error) {
      console.error("❌ Sharp image processing failed:", error);
      throw error;
    }
  }

  /**
   * Process image and save to file
   * @param {string} imageUrl - Source image URL
   * @param {string} outputPath - Output file path
   * @param {object} options - Processing options
   */
  async processAndSave(imageUrl, outputPath, options = {}) {
    try {
      const processedBuffer = await this.resizeImage(imageUrl, options);
      await fs.writeFile(outputPath, processedBuffer);
      // console.log(`💾 Saved processed image to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error("❌ Failed to process and save image:", error);
      throw error;
    }
  }
}

/**
 * Fallback image processor that tries TinyPNG first, then WASM
 * @param {string} imageUrl - Source image URL
 * @param {string} outputPath - Output file path
 * @param {object} options - Processing options
 * @param {Function} tinyPngProcessor - TinyPNG processing function (optional)
 */
export async function processImageWithFallback(
  imageUrl,
  outputPath,
  options = {},
  tinyPngProcessor = null,
) {
  // Try TinyPNG first if processor provided
  if (tinyPngProcessor) {
    try {
      // console.log("🔧 Attempting TinyPNG processing...");
      return await tinyPngProcessor(imageUrl, outputPath, options);
    } catch (error) {
      console.warn(
        "⚠️ TinyPNG failed, falling back to WebAssembly:",
        error.message,
      );
    }
  }

  // Fallback to Sharp (WebAssembly-powered)
  // console.log("🔄 Using Sharp fallback...");
  const processor = new WASMImageProcessor();

  return await processor.processAndSave(imageUrl, outputPath, options);
}
