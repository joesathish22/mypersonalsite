import Link from "next/link";
import { contact, person } from "@/lib/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-panel py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(61,139,255,0.12),transparent_60%)]"
      />

      <div className="container-page relative grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <RevealText>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
              {contact.eyebrow}
            </p>
          </RevealText>

          <RevealText delay={0.05}>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {contact.headline[0]}
              <br />
              {contact.headline[1]}
              <br />
              <span className="text-accent-soft">{contact.headline2}</span>
            </h2>
          </RevealText>

          <RevealText delay={0.15} className="mt-10 flex flex-wrap items-center gap-6">
            <MagneticButton href={contact.cta.href} size="lg">
              {contact.cta.label}
            </MagneticButton>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
            >
              Full contact details →
            </Link>
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
                <p className="mt-2 text-lg font-medium text-foreground">
                  {person.locationShort}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-dim">
                  Availability
                </p>
                <p className="mt-2 text-lg font-medium text-foreground">
                  {person.availability}
                </p>
              </div>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
