import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/site-config";

// A single indexable page. No lastModified is set — there is no real
// per-content revision tracking to report, and inventing a date would be
// exactly the kind of fabrication this project avoids elsewhere.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
