import { SITE_URL } from "@/lib/config/site-config";
import { person, qtt } from "@/lib/content/site";

// Shared @id anchors for the linked-data graph — defined once here so the
// root layout's Person/Organization/WebSite graph and every page's
// BreadcrumbList/ProfessionalService/Article schema reference the exact same
// entities instead of duplicating or drifting from them.
export const personId = `${SITE_URL}/#person`;
export const organizationId = `${person.qttUrl}/#organization`;
export const profilePageId = `${SITE_URL}/#profilepage`;
export const websiteId = `${SITE_URL}/#website`;

export type BreadcrumbItem = { name: string; path: string };

/**
 * BreadcrumbList schema for a non-home page. `path` is site-relative
 * ("/capabilities"); the home page itself is always the first crumb.
 */
export function breadcrumbList(items: BreadcrumbItem[]) {
  const crumbs = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/**
 * ProfessionalService schema for /services — describes the actual services
 * offered through Queen Touch Technology, tied to the existing
 * Person/Organization entities rather than a standalone, disconnected node.
 */
export function professionalServiceSchema(serviceNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/services/#service`,
    name: `${person.company} — Technology Consulting & Software Development`,
    provider: { "@id": personId },
    areaServed: "Worldwide",
    url: `${SITE_URL}/services`,
    description: qtt.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: serviceNames.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/**
 * Article schema, ready for /articles/[slug] the moment real posts exist.
 * Inert (never rendered) while the articles content array stays empty.
 */
export function articleSchema(article: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/articles/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: { "@id": personId },
    publisher: { "@id": organizationId },
  };
}
