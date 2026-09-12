"use client";

import dynamic from "next/dynamic";
import type { CinematicVariant } from "@/lib/three/cinematic-layouts";

// The deep-page hero sections (src/app/{capabilities,services,work,ai}/page.tsx)
// are Server Components — `next/dynamic(..., { ssr: false })` only works from
// a Client Component, so this thin wrapper exists purely to host that call,
// matching the same pattern already used by AIReady.tsx/GlobalCollaboration.tsx
// for their own Three.js scenes.
const CinematicTechnologyScene = dynamic(
  () => import("@/components/three/CinematicTechnologyScene").then((m) => m.CinematicTechnologyScene),
  { ssr: false }
);

export function DeepPageVisual({
  variant,
  className,
}: {
  variant: CinematicVariant;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={className}>
      <CinematicTechnologyScene variant={variant} className="h-full w-full" />
    </div>
  );
}
