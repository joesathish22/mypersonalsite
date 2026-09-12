import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";

// Empty today, by design — no fabricated articles. As real posts are added
// to the `articles` array in src/lib/content/site.ts, this route
// automatically prerenders and indexes each one; until then every slug 404s.
export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function findArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return buildMetadata({ path: `/articles/${slug}`, title: "Article", description: "" });

  return buildMetadata({
    path: `/articles/${article.slug}`,
    title: article.title,
    description: article.description,
  });
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const schema = articleSchema(article);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs
        items={[
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` },
        ]}
      />

      <article className="relative bg-void pb-28 pt-10 sm:pb-36">
        <div className="container-page max-w-3xl">
          <SectionHeading as="h1" eyebrow={article.category} lines={[article.title]} />
          <RevealText delay={0.08}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-muted sm:text-xl">
              {article.description}
            </p>
          </RevealText>
        </div>
      </article>
    </>
  );
}
