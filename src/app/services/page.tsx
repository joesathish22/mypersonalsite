import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { professionalServiceSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DeepPageVisual } from "@/components/layout/DeepPageVisual";

export const metadata: Metadata = buildMetadata({
  path: "/services",
  title: "Technology Consulting & Software Development Services",
  description:
    "Technology consulting, custom software, enterprise applications, cloud & DevOps and AI automation services from S. Sathish Kumar, Founder & CEO of Queen Touch Technology.",
});

export default function ServicesPage() {
  const schema = professionalServiceSchema(services.items.map((service) => service.name));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />

      <section className="relative bg-void pb-16 pt-10 sm:pb-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading as="h1" eyebrow={services.eyebrow} lines={services.heading} />
            <RevealText delay={0.1}>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
                {services.intro}
              </p>
            </RevealText>
          </div>

          <DeepPageVisual
            variant="services"
            className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:aspect-auto lg:h-[26rem] lg:max-w-none xl:h-[30rem]"
          />
        </div>
      </section>

      <section className="relative bg-void pb-28 sm:pb-36">
        <div className="container-page">
          <ol className="divide-y divide-line/60 border-y border-line/60">
            {services.items.map((service, index) => (
              <li key={service.key} className="py-10">
                <RevealText delay={(index % 4) * 0.05}>
                  <div className="grid gap-6 lg:grid-cols-[3rem_1fr] lg:gap-10">
                    <span className="text-xs font-medium tabular-nums text-muted-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {service.name}
                      </h2>
                      <dl className="mt-5 grid gap-6 sm:grid-cols-3">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dim">
                            Problem
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-muted">{service.problem}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dim">
                            Approach
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-muted">{service.approach}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dim">
                            Outcome
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-muted">{service.outcome}</dd>
                        </div>
                      </dl>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.relatedCapabilities.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-line px-3 py-1 text-xs text-muted-dim"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealText>
              </li>
            ))}
          </ol>

          <RevealText delay={0.1} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              href="/capabilities"
              className="font-medium text-accent-soft underline decoration-line underline-offset-4 hover:decoration-accent-soft"
            >
              See the underlying Capabilities →
            </Link>
            <Link
              href="/work"
              className="font-medium text-accent-soft underline decoration-line underline-offset-4 hover:decoration-accent-soft"
            >
              See these services in practice on the Work page →
            </Link>
          </RevealText>
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-20 sm:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <RevealText>
            <p className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
              Have a project in mind?
            </p>
          </RevealText>
          <RevealText delay={0.06}>
            <MagneticButton href={services.cta.href}>{services.cta.label}</MagneticButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
