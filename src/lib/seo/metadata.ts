import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config/site-config";
import { person } from "@/lib/content/site";

type BuildMetadataInput = {
  /** Route path starting with "/", e.g. "/about". Use "/" for the homepage. */
  path: string;
  /** Page-specific title. The root layout's `%s — S. Sathish Kumar` template applies automatically. */
  title: string;
  description: string;
  /** Set false only for pages that shouldn't be indexed (none currently). */
  index?: boolean;
};

/**
 * Every route's metadata funnels through here so canonical URLs, Open Graph
 * and Twitter cards stay consistent and always point at the production
 * domain — never the Vercel deployment URL. Next.js *replaces* (not merges)
 * a segment's `openGraph`/`twitter` object wholesale when a page defines its
 * own, so each call re-states the full shape rather than relying on
 * inheriting fields from the root layout.
 */
export function buildMetadata({ path, title, description, index = true }: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url,
      siteName: `${person.name} — ${person.company}`,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
