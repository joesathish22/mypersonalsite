"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animation/gsap";
import { hero } from "@/lib/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { HeroPortrait } from "./HeroPortrait";
import { ScrollCue } from "./ScrollCue";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const trigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=130%",
        scrub: 0.6,
      };

      if (prefersReduced) {
        ScrollTrigger.create({
          ...trigger,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          ...trigger,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      if (portraitRef.current) {
        tl.to(portraitRef.current, { yPercent: -10, scale: 1.05, ease: "none" }, 0);
      }
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { yPercent: -14, opacity: 0, ease: "none" },
          0.5
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-void"
    >
      <div className="absolute inset-0">
        <HeroScene progressRef={progressRef} className="h-full w-full" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(11,22,38,0.4),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent"
      />

      <div className="container-page relative z-10 grid items-center gap-14 py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-24">
        <div ref={contentRef} className="order-2 lg:order-1">
          <RevealText as="p" className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-soft">
            {hero.eyebrow}
          </RevealText>

          <RevealText delay={0.04}>
            <h1 className="mt-5 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {hero.title}
            </h1>
          </RevealText>

          <p className="mt-3 text-balance text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {hero.statementLines.map((line, index) => (
              <RevealText key={line} as="span" className="block" delay={0.08 + index * 0.07}>
                {line === hero.statementHighlight ? (
                  <span className="text-accent-soft">{line}</span>
                ) : (
                  line
                )}
              </RevealText>
            ))}
          </p>

          <RevealText delay={0.32} className="mt-6 space-y-1">
            <p className="text-lg font-medium text-foreground">{hero.subline}</p>
            <p className="text-base text-muted sm:text-lg">{hero.subline2}</p>
          </RevealText>

          <RevealText delay={0.38}>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
              {hero.supporting}
            </p>
          </RevealText>

          <RevealText delay={0.44}>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" aria-hidden="true" />
              {hero.tag}
            </span>
          </RevealText>

          <RevealText delay={0.5} className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </MagneticButton>
            <MagneticButton href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </MagneticButton>
          </RevealText>
        </div>

        <div className="order-1 lg:order-2">
          <HeroPortrait ref={portraitRef} />
        </div>
      </div>

      <ScrollCue />

      <Link
        href="#impact"
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-4 focus:right-4 focus:z-20 focus:rounded-full focus:bg-panel focus:px-4 focus:py-2 focus:text-sm"
      >
        Continue to Impact section
      </Link>
    </section>
  );
}
