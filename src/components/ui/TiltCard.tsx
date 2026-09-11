"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useIsCoarsePointer } from "@/lib/hooks/useMediaQuery";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Subtle pointer-reactive card: a soft glow follows the cursor and the card
 * tilts a few degrees toward it. Disabled on touch — hover has no meaning
 * there, so the card is fully usable and static instead.
 */
export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isCoarse = useIsCoarsePointer();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isCoarse || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    ref.current.style.setProperty("--glow-x", `${x}px`);
    ref.current.style.setProperty("--glow-y", `${y}px`);
    ref.current.style.setProperty("--glow-opacity", "1");
    ref.current.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateZ(0)`;
  };

  const handlePointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--glow-opacity", "0");
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-panel/40 transition-transform duration-300 ease-out will-change-transform",
        className
      )}
      style={{
        // @ts-expect-error custom properties
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-opacity": "0",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[var(--glow-opacity)] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x) var(--glow-y), rgba(61,139,255,0.14), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
