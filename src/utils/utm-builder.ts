/**
 * UTM Parameter Builder Utility
 * Helps create properly formatted UTM tracking URLs
 */

export type UTMParams = {
  source: string; // Required: e.g., 'twitter', 'newsletter', 'google'
  medium: string; // Required: e.g., 'social', 'email', 'cpc'
  campaign: string; // Required: e.g., 'summer_sale', 'product_launch'
  term?: string; // Optional: for paid keywords
  content?: string; // Optional: for A/B testing differentiation
};

/**
 * Build a URL with UTM parameters
 * @param baseUrl - The base URL (can be relative or absolute)
 * @param params - UTM parameters object
 * @returns URL string with UTM parameters appended
 */
export function buildUTMUrl(baseUrl: string, params: UTMParams): string {
  const url = new URL(baseUrl, "https://oluwasetemi.dev");

  url.searchParams.set("utm_source", params.source);
  url.searchParams.set("utm_medium", params.medium);
  url.searchParams.set("utm_campaign", params.campaign);

  if (params.term) {
    url.searchParams.set("utm_term", params.term);
  }

  if (params.content) {
    url.searchParams.set("utm_content", params.content);
  }

  return url.toString();
}

/**
 * Extract UTM parameters from current URL
 * Useful for reading campaign data on the page
 */
export function getUTMParams(): Partial<UTMParams> | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm: Partial<UTMParams> = {};

  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const term = params.get("utm_term");
  const content = params.get("utm_content");

  if (!source && !medium && !campaign) {
    return null; // No UTM params present
  }

  if (source) utm.source = source;
  if (medium) utm.medium = medium;
  if (campaign) utm.campaign = campaign;
  if (term) utm.term = term;
  if (content) utm.content = content;

  return utm;
}

/**
 * Common UTM presets for quick use
 */
export const UTMPresets = {
  twitter: (campaign: string) => ({
    source: "twitter",
    medium: "social",
    campaign,
  }),

  linkedin: (campaign: string) => ({
    source: "linkedin",
    medium: "social",
    campaign,
  }),

  github: (campaign: string) => ({
    source: "github",
    medium: "referral",
    campaign,
  }),

  newsletter: (campaign: string) => ({
    source: "newsletter",
    medium: "email",
    campaign,
  }),

  googleAds: (campaign: string, keyword?: string) => ({
    source: "google",
    medium: "cpc",
    campaign,
    term: keyword,
  }),
};

/**
 * Example usage:
 *
 * import { buildUTMUrl, UTMPresets } from '@/utils/utm-builder';
 *
 * // Manual
 * const url1 = buildUTMUrl('/blog/post', {
 *   source: 'twitter',
 *   medium: 'social',
 *   campaign: 'blog_promotion'
 * });
 *
 * // Using presets
 * const url2 = buildUTMUrl('/blog/post', UTMPresets.twitter('blog_promotion'));
 *
 * // With A/B testing
 * const url3 = buildUTMUrl('/landing', {
 *   source: 'email',
 *   medium: 'newsletter',
 *   campaign: 'product_launch',
 *   content: 'variant_a'
 * });
 */
