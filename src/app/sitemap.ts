import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/site-config";
import { articles } from "@/lib/content/site";

// Static routes plus whatever real articles exist — no per-article entries
// are invented while `articles` stays empty, so this list grows automatically
// the moment real content is added to src/lib/content/site.ts.
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/articles", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
