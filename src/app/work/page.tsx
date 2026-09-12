import type { Metadata } from "next";
import Link from "next/link";
import { selectedWork } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  EnterpriseDiagram,
  MobileDiagram,
  CloudDiagram,
  TransformDiagram,
} from "@/components/ui/WorkDiagrams";

const diagrams = [EnterpriseDiagram, MobileDiagram, CloudDiagram, TransformDiagram];

export const metadata: Metadata = buildMetadata({
  path: "/work",
  title: "Enterprise Software Development & Digital Transformation Work",
  description:
    "Enterprise web platforms, mobile applications, cloud & DevOps infrastructure and digital transformation programs built by S. Sathish Kumar, Founder & CEO of Queen Touch Technology.",
});

export default function WorkPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />

      <section className="relative bg-void pb-16 pt-10 sm:pb-20">
        <div className="container-page">
          <SectionHeading as="h1" eyebrow={selectedWork.eyebrow} lines={["Enterprise Software Development", "& Digital Transformation"]} className="max-w-3xl" />
          <RevealText delay={0.1}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
              {selectedWork.subheading}
            </p>
          </RevealText>
        </div>
      </section>

      <section className="relative bg-void pb-20 sm:pb-28">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {selectedWork.showcases.map((showcase, index) => {
              const Diagram = diagrams[index % diagrams.length];
              return (
                <li key={showcase.domain}>
                  <RevealText delay={(index % 4) * 0.06} className="h-full">
                    <TiltCard className="h-full p-8">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-medium text-muted-dim">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Diagram className="h-11 w-11 text-accent-soft/80" />
                      </div>
                      <h2 className="mt-6 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                        {showcase.domain}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{showcase.description}</p>

                      {showcase.approach ? (
                        <div className="mt-5 border-t border-line/60 pt-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dim">
                            Approach
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{showcase.approach}</p>
                        </div>
                      ) : null}
                      {showcase.outcome ? (
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dim">
                            Outcome
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{showcase.outcome}</p>
                        </div>
                      ) : null}

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {showcase.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-line px-3 py-1 text-xs text-muted-dim"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </TiltCard>
                  </RevealText>
                </li>
              );
            })}
          </ul>

          <RevealText delay={0.1} className="mt-10 max-w-2xl">
            <p className="text-sm leading-relaxed text-muted-dim">
              These are domains of technology work, not named client case studies. Detailed, named case
              studies will be published here as individual engagements are finalized for public sharing.
            </p>
          </RevealText>
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-20 sm:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <RevealText>
            <p className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
              Want to know how a project like this comes together?
            </p>
          </RevealText>
          <RevealText delay={0.06}>
            <Link
              href="/services"
              className="text-sm font-medium text-accent-soft underline decoration-line underline-offset-4 hover:decoration-accent-soft"
            >
              See the Services behind this work →
            </Link>
          </RevealText>
          <RevealText delay={0.12}>
            <MagneticButton href="/contact">Start a Conversation</MagneticButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
