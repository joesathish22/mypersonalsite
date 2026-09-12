"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/animation/gsap";
import { techJourney } from "@/lib/content/site";
import { getMorphSegment } from "@/lib/three/tech-universe-layouts";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { RevealText } from "@/components/ui/RevealText";

const TechUniverseScene = dynamic(
  () => import("@/components/three/TechUniverseScene").then((m) => m.TechUniverseScene),
  { ssr: false }
);

const TRANSITIONS = techJourney.stages.length - 1;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

export function TechJourney() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <StaticTechJourney />;
  return <PinnedTechJourney />;
}

function PinnedTechJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let trigger: ScrollTrigger | undefined;
      let cancelled = false;

      // The pin's start/end positions are measured from live layout. If that
      // measurement happens before the web font has swapped in (next/font's
      // `display: swap` renders a fallback font first, then swaps — shifting
      // text metrics and therefore section height), ScrollTrigger bakes in
      // stale coordinates. The pinned section can then render mid-transition
      // — including an unstyled/blank-looking frame — until the *next*
      // scroll-driven update happens to correct it, which is exactly the
      // "scrolling immediately fixes it" symptom. Waiting for fonts (and one
      // more frame for layout to settle) before measuring avoids that.
      const setup = () => {
        if (cancelled || !sectionRef.current) return;

        // One screen-height of scroll per transition — ties the pin's
        // scroll runway directly to TRANSITIONS, the same number driving
        // the morph.
        const scrollDistance = `+=${TRANSITIONS * 100}%`;

        trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: scrollDistance,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;

            const { index, frac } = getMorphSegment(self.progress, TRANSITIONS);
            // Outgoing caption fades fast, incoming fades in late — leaving
            // a brief clean gap where neither overlaps and the shape morph
            // reads on its own, instead of two captions double-exposed
            // mid-scroll.
            captionRefs.current.forEach((el, i) => {
              if (!el) return;
              let opacity = 0;
              if (i === index) opacity = 1 - smoothstep(0, 0.32, frac);
              else if (i === index + 1) opacity = smoothstep(0.68, 1, frac);
              el.style.opacity = String(opacity);
              el.style.transform = `translateY(${(1 - opacity) * 18}px)`;
              el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
            });
          },
        });

        // Fonts may still cause a late layout shift after this trigger is
        // created (e.g. a slow connection finishing the swap after
        // `fonts.ready` already resolved once for an earlier section) — one
        // more refresh once the whole page has finished loading catches it.
        const onLoad = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
          ScrollTrigger.refresh();
        } else {
          window.addEventListener("load", onLoad, { once: true });
        }
      };

      const fontsReady = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts
        ?.ready;

      if (fontsReady) {
        fontsReady.then(() => requestAnimationFrame(setup));
      } else {
        requestAnimationFrame(setup);
      }

      return () => {
        cancelled = true;
        trigger?.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-deep"
      // Belt-and-suspenders: an inline style applies immediately with the
      // server-rendered HTML, with no dependency on the stylesheet having
      // loaded/parsed yet — guarantees this never paints as unstyled white.
      style={{ backgroundColor: "#07111f" }}
    >
      <div className="absolute inset-0">
        <TechUniverseScene progressRef={progressRef} className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/50"
      />
      {/* Protected content zone: a left-side scrim keeps the caption's
          contrast solid regardless of what the network is doing behind it —
          text stays the anchor, the 3D never has to compete with it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-deep via-deep/75 to-transparent"
      />

      <div className="container-page relative flex h-full items-center">
        <div className="relative w-full max-w-lg">
          {techJourney.stages.map((stage, i) => (
            <div
              key={stage.key}
              ref={(el) => {
                captionRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
                {stage.index} / {String(techJourney.stages.length).padStart(2, "0")} —{" "}
                {techJourney.eyebrow}
              </span>
              <h3 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                {stage.label}
              </h3>
              <p className="mt-5 max-w-md text-balance text-lg leading-relaxed text-foreground/80">
                {stage.description}
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line/80 bg-void/50 px-3.5 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2"
        aria-hidden="true"
      >
        {techJourney.stages.map((stage) => (
          <span key={stage.key} className="h-1 w-6 rounded-full bg-line" />
        ))}
      </div>

      <Link
        href="/capabilities"
        className="absolute bottom-10 right-6 z-10 text-xs font-medium text-foreground/80 underline decoration-line underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft sm:right-10"
      >
        Full capabilities →
      </Link>

      <span className="sr-only">
        {techJourney.stages.map((stage) => `${stage.label}: ${stage.description}`).join(". ")}
      </span>
    </section>
  );
}

/**
 * Reduced-motion fallback: no pin, no scroll-jack, no 3D — the same content
 * as four plain, readable blocks. Nothing here depends on animation to work.
 */
function StaticTechJourney() {
  return (
    <section id="capabilities" className="relative bg-deep py-28 sm:py-36">
      <div className="container-page">
        <RevealText>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
            {techJourney.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {techJourney.heading[0]}
            <br />
            {techJourney.heading[1]}
          </h2>
        </RevealText>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {techJourney.stages.map((stage) => (
            <RevealText key={stage.key} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-panel/30 p-8">
                <span className="text-xs font-medium text-muted-dim">{stage.index}</span>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{stage.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stage.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealText>
          ))}
        </div>

        <RevealText delay={0.15} className="mt-10">
          <Link
            href="/capabilities"
            className="text-sm font-medium text-accent-soft underline decoration-line underline-offset-4 transition-colors hover:decoration-accent-soft"
          >
            Full capabilities →
          </Link>
        </RevealText>
      </div>
    </section>
  );
}
