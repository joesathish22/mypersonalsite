import Link from "next/link";
import { breadcrumbList, type BreadcrumbItem } from "@/lib/seo/json-ld";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/**
 * Visible breadcrumb trail for every non-home page, paired with the matching
 * BreadcrumbList JSON-LD it emits — one source of truth so the visible trail
 * and the structured data can never disagree.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="container-page pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList(items)) }}
      />
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-dim">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-muted">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-accent-soft">
                  {item.name}
                </Link>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
