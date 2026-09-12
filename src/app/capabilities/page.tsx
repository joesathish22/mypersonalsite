import type { Metadata } from "next";
import Link from "next/link";
import { capabilities } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = buildMetadata({
  path: "/capabilities",
  title: "Technology Strategy & Software Engineering Capabilities",
  description:
    "Six areas of technology capability — strategy, software engineering, cloud & DevOps, AI & intelligent systems, cybersecurity and digital transformation — delivered by S. Sathish Kumar.",
});

export default function CapabilitiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Capabilities", path: "/capabilities" }]} />

      <section className="relative bg-void pb-16 pt-10 sm:pb-20">
        <div className="container-page">
          <SectionHeading as="h1" eyebrow={capabilities.eyebrow} lines={capabilities.heading} className="max-w-3xl" />
          <RevealText delay={0.1}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
              {capabilities.intro}
            </p>
          </RevealText>
        </div>
      </section>

      <section className="relative bg-void pb-28 sm:pb-36">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {capabilities.groups.map((group, index) => (
              <li key={group.key}>
                <RevealText delay={(index % 4) * 0.06} className="h-full">
                  <TiltCard className="h-full p-8">
                    <span className="text-xs font-medium text-muted-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-5 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                      {group.heading}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {group.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line px-3 py-1 text-xs text-muted-dim"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </RevealText>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-20 sm:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <RevealText>
            <p className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
              Looking for how these capabilities translate into a service?
            </p>
          </RevealText>
          <RevealText delay={0.06}>
            <Link
              href="/services"
              className="text-sm font-medium text-accent-soft underline decoration-line underline-offset-4 hover:decoration-accent-soft"
            >
              See Services →
            </Link>
          </RevealText>
          <RevealText delay={0.12}>
            <MagneticButton href={capabilities.cta.href}>{capabilities.cta.label}</MagneticButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
