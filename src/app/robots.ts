import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/site-config";

// This is a single public page with no private routes, so every recognized
// crawler — search and AI alike — is allowed unrestricted access. Listed
// explicitly (rather than relying only on the wildcard) so it's clear at a
// glance which crawlers were deliberately considered.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "OAI-AdsBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
