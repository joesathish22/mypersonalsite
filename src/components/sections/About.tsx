import Image from "next/image";
import Link from "next/link";
import { about, person } from "@/lib/content/site";
import { RevealText } from "@/components/ui/RevealText";

export function About() {
  return (
    <section id="about" className="relative bg-void py-28 sm:py-36">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <RevealText>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line">
              <Image
                src={person.portrait.src}
                alt={person.portrait.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top grayscale-[15%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
              />
            </div>
            <p className="mt-4 text-sm text-muted-dim">
              {person.name} — {person.role}, {person.company}
            </p>
          </RevealText>
        </div>

        <div>
          <RevealText>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
              {about.eyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.05}>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {about.heading[0]}
              <br />
              {about.heading[1]}
            </h2>
          </RevealText>

          <div className="mt-10 space-y-6 border-t border-line pt-10">
            {about.paragraphs.map((paragraph, index) => (
              <RevealText key={paragraph} delay={0.1 + index * 0.05}>
                <p className="text-balance text-lg leading-relaxed text-muted sm:text-xl">
                  {paragraph}
                </p>
              </RevealText>
            ))}
          </div>

          <RevealText delay={0.25} className="mt-8">
            <Link
              href="/about"
              className="text-sm font-medium text-accent-soft underline decoration-line underline-offset-4 transition-colors hover:decoration-accent-soft"
            >
              Read the full story →
            </Link>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
