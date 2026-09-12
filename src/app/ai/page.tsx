import type { Metadata } from "next";
import Link from "next/link";
import { aiPage } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = buildMetadata({
  path: "/ai",
  title: "AI Software Development & Automation",
  description:
    "AI software development, intelligent automation and data-to-systems engineering from S. Sathish Kumar — applied as part of the broader technology strategy and software engineering discipline.",
});

export default function AiPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "AI", path: "/ai" }]} />

      <section className="relative bg-void pb-16 pt-10 sm:pb-20">
        <div className="container-page">
          <SectionHeading as="h1" eyebrow={aiPage.eyebrow} lines={aiPage.heading} className="max-w-3xl" />
          <RevealText delay={0.1}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
              {aiPage.intro}
            </p>
          </RevealText>
        </div>
      </section>

      <section className="relative bg-void pb-20 sm:pb-28">
        <div className="container-page max-w-3xl space-y-6">
          {aiPage.paragraphs.map((paragraph, index) => (
            <RevealText key={paragraph} delay={index * 0.06}>
              <p className="text-balance text-lg leading-relaxed text-muted">{paragraph}</p>
            </RevealText>
          ))}
        </div>
      </section>

      <section className="relative bg-deep py-20 sm:py-28">
        <div className="container-page">
          <RevealText>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
              The Flow
            </p>
          </RevealText>
          <RevealText delay={0.06}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4">
              {aiPage.flow.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-line bg-void/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
                    {step}
                  </span>
                  {index < aiPage.flow.length - 1 ? (
                    <span aria-hidden="true" className="text-muted-dim">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </RevealText>

          <RevealText delay={0.1} className="mt-8">
            <Link
              href="/capabilities"
              className="text-sm font-medium text-accent-soft underline decoration-line underline-offset-4 hover:decoration-accent-soft"
            >
              How AI fits into the wider Capabilities →
            </Link>
          </RevealText>
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-20 sm:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <RevealText>
            <p className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
              Exploring an AI or automation project?
            </p>
          </RevealText>
          <RevealText delay={0.06}>
            <MagneticButton href={aiPage.cta.href}>{aiPage.cta.label}</MagneticButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
