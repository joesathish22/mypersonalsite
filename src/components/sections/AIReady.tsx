"use client";

import dynamic from "next/dynamic";
import { aiReady } from "@/lib/content/site";
import { RevealText } from "@/components/ui/RevealText";

const AINeuralScene = dynamic(
  () => import("@/components/three/AINeuralScene").then((m) => m.AINeuralScene),
  { ssr: false }
);

export function AIReady() {
  return (
    <section id="ai" className="relative overflow-hidden bg-void py-28 sm:py-36">
      <div className="absolute inset-0 opacity-70">
        <AINeuralScene className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/30 to-void"
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
      </div>
    </section>
  );
}
