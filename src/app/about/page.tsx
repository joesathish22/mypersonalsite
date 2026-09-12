import type { Metadata } from "next";
import { aboutPage, person } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DeepPageVisual } from "@/components/layout/DeepPageVisual";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "Technology Consultant & Strategist",
  description:
    "S. Sathish Kumar is a technology consultant and strategist, Founder & CEO of Queen Touch Technology, working globally on software, cloud, AI and digital transformation.",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <section className="relative bg-void pb-20 pt-10 sm:pb-28">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading as="h1" eyebrow={aboutPage.eyebrow} lines={aboutPage.heading} />
            <RevealText delay={0.1}>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
                {aboutPage.intro}
              </p>
            </RevealText>
          </div>

          <DeepPageVisual
            variant="about"
            className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:aspect-auto lg:h-[26rem] lg:max-w-none xl:h-[30rem]"
          />
        </div>
      </section>

      <section className="relative bg-void pb-28 sm:pb-36">
        <div className="container-page max-w-3xl space-y-16">
          {aboutPage.sections.map((section, index) => (
            <RevealText key={section.heading} delay={index * 0.05} className="border-t border-line pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-balance text-lg leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </RevealText>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-20 sm:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <RevealText>
            <p className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
              {person.role} of {person.company} — see the company built to deliver this work.
            </p>
          </RevealText>
          <RevealText delay={0.08}>
            <MagneticButton href={aboutPage.cta.href} external>
              {aboutPage.cta.label}
            </MagneticButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
