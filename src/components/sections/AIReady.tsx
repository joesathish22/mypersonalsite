"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { aiReady } from "@/lib/content/site";
import { RevealText } from "@/components/ui/RevealText";

const AINeuralScene = dynamic(
  () => import("@/components/three/AINeuralScene").then((m) => m.AINeuralScene),
  { ssr: false }
);

export function AIReady() {
  return (
    <section id="ai" className="relative overflow-hidden bg-void py-28 sm:py-36">
      <div className="absolute inset-0 opacity-90">
        <AINeuralScene className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/10 to-void/70"
      />

      <div className="container-page relative flex flex-col items-center text-center">
        <RevealText>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
            {aiReady.eyebrow}
          </p>
        </RevealText>
        <RevealText delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {aiReady.heading}
          </h2>
        </RevealText>
        <RevealText delay={0.1}>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted">
            {aiReady.text}
          </p>
        </RevealText>

        <RevealText delay={0.15}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
            {aiReady.flow.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-line bg-void/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
                  {step}
                </span>
                {index < aiReady.flow.length - 1 ? (
                  <span aria-hidden="true" className="text-muted-dim">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </RevealText>

        <RevealText delay={0.2} className="mt-8">
          <Link
            href="/ai"
            className="text-sm font-medium text-accent-soft underline decoration-line underline-offset-4 transition-colors hover:decoration-accent-soft"
          >
            Explore AI & Intelligent Systems →
          </Link>
        </RevealText>
      </div>
    </section>
  );
}
