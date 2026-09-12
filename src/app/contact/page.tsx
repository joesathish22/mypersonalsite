import type { Metadata } from "next";
import { contactPage, person } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact — Technology Strategist & Consultant",
  description:
    "Contact S. Sathish Kumar, technology strategist and consultant, Founder & CEO of Queen Touch Technology, for software development, AI, cloud, DevOps or digital transformation projects.",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <section className="relative overflow-hidden bg-void pb-28 pt-10 sm:pb-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(61,139,255,0.12),transparent_60%)]"
        />

        <div className="container-page relative grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading as="h1" eyebrow={contactPage.eyebrow} lines={contactPage.heading} />
            <RevealText delay={0.08}>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
                {contactPage.intro}
              </p>
            </RevealText>

            <RevealText delay={0.16} className="mt-10">
              <MagneticButton href={contactPage.cta.href} size="lg">
                {contactPage.cta.label}
              </MagneticButton>
            </RevealText>

            <RevealText delay={0.22} className="mt-14 max-w-md border-t border-line pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                {contactPage.guidance.heading}
              </p>
              <ul className="mt-4 space-y-2">
                {contactPage.guidance.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="text-accent-soft">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealText>
          </div>

          <RevealText delay={0.1}>
            <div className="space-y-8 border-t border-line pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                  Email
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-2 inline-block text-lg font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
                  data-cursor="interactive"
                >
                  {person.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                  Phone
                </p>
                <a
                  href={`tel:${person.phone}`}
                  className="mt-2 inline-block text-lg font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
                  data-cursor="interactive"
                >
                  {person.phoneDisplay}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                  LinkedIn
                </p>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-lg font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
                  data-cursor="interactive"
                >
                  linkedin.com/in/joesathish
                </a>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                    Location
                  </p>
                  <p className="mt-2 text-lg font-medium text-foreground">{person.locationShort}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                    Availability
                  </p>
                  <p className="mt-2 text-lg font-medium text-foreground">{person.availability}</p>
                </div>
              </div>
            </div>
          </RevealText>
        </div>
      </section>
    </>
  );
}
