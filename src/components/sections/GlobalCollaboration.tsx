"use client";

import dynamic from "next/dynamic";
import { globalCollaboration } from "@/lib/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";

const GlobalNetworkScene = dynamic(
  () => import("@/components/three/GlobalNetworkScene").then((m) => m.GlobalNetworkScene),
  { ssr: false }
);

export function GlobalCollaboration() {
  return (
    <section id="global" className="relative overflow-hidden bg-void py-28 sm:py-36">
      <div className="absolute inset-0 opacity-80">
        <GlobalNetworkScene className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70"
      />

      <div className="container-page relative flex flex-col items-center text-center">
        <RevealText>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
            {globalCollaboration.eyebrow}
          </p>
        </RevealText>
        <RevealText delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {globalCollaboration.heading[0]}
            <br />
            {globalCollaboration.heading[1]}
          </h2>
        </RevealText>
        <RevealText delay={0.1}>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted">
            {globalCollaboration.text}
          </p>
        </RevealText>
        <RevealText delay={0.15} className="mt-10">
          <MagneticButton href={globalCollaboration.cta.href}>
            {globalCollaboration.cta.label}
          </MagneticButton>
        </RevealText>
      </div>
    </section>
  );
}
