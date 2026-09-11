/**
 * Single source of truth for the site's canonical URL. Every canonical tag,
 * OpenGraph URL, JSON-LD identifier, sitemap entry, and llms.txt reference
 * derives from this one constant — when the production domain is finalized,
 * setting the SITE_URL environment variable is the only change required.
 *
 * Until then this falls back to the current Vercel deployment, per explicit
 * instruction not to hard-code it in individual files.
 */
export const SITE_URL = (process.env.SITE_URL || "https://mypersonalsite-coral.vercel.app").replace(
  /\/+$/,
  ""
);

/**
 * Search engine verification tokens. Left unset until the user provides real
 * values from Google Search Console / Bing Webmaster Tools — never
 * fabricated. Metadata generation checks for these and omits the
 * corresponding tags entirely when absent.
 */
export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || undefined;
export const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION || undefined;
