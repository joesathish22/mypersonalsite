import type { Metadata } from "next";
import Link from "next/link";
import { articles, articleCategories, articlesPage, type ArticleCategory } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = buildMetadata({
  path: "/articles",
  title: "Technology Strategy, Software Engineering & Cloud Articles",
  description:
    "Technical articles on technology strategy, software engineering, AI, cloud, DevOps, cybersecurity and digital transformation by S. Sathish Kumar.",
});

// Where each topic area lives in depth today, for internal linking while the
// articles themselves are still being written.
const categoryLinks: Record<ArticleCategory, string> = {
  "Technology Strategy": "/capabilities",
  "Software Engineering": "/capabilities",
  AI: "/ai",
  Cloud: "/services",
  DevOps: "/services",
  Cybersecurity: "/capabilities",
  "Digital Transformation": "/work",
};

export default function ArticlesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Articles", path: "/articles" }]} />

      <section className="relative bg-void pb-16 pt-10 sm:pb-20">
        <div className="container-page">
          <SectionHeading as="h1" eyebrow={articlesPage.eyebrow} lines={articlesPage.heading} className="max-w-3xl" />
          <RevealText delay={0.1}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
              {articlesPage.intro}
            </p>
          </RevealText>
        </div>
      </section>

      <section className="relative bg-void pb-28 sm:pb-36">
        <div className="container-page">
          {articles.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <li key={article.slug}>
                  <RevealText delay={(index % 6) * 0.05} className="h-full">
                    <Link href={`/articles/${article.slug}`} className="block h-full">
                      <TiltCard className="h-full p-8">
                        <span className="text-xs font-medium text-muted-dim">{article.category}</span>
                        <h2 className="mt-4 text-xl font-semibold leading-snug text-foreground">
                          {article.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{article.description}</p>
                      </TiltCard>
                    </Link>
                  </RevealText>
                </li>
              ))}
            </ul>
          ) : (
            <RevealText>
              <p className="max-w-2xl text-balance text-lg leading-relaxed text-muted">
                {articlesPage.emptyState}
              </p>
            </RevealText>
          )}

          <RevealText delay={0.1} className="mt-14 border-t border-line pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
              Topics This Space Will Cover
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {articleCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={categoryLinks[category]}
                    className="flex items-center justify-between rounded-xl border border-line px-5 py-4 text-sm font-medium text-foreground transition-colors hover:border-accent-soft/70 hover:text-accent-soft"
                  >
                    {category}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </RevealText>
        </div>
      </section>
    </>
  );
}
