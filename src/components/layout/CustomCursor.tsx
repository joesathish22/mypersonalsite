"use client";

import { useEffect, useRef, useState } from "react";
import { useIsCoarsePointer } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Small luminous-dot cursor for desktop, pointer-fine devices only.
 * Expands over interactive elements. Fully disabled for touch input and
 * prefers-reduced-motion, both in JS (no listeners attached) and via CSS.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isCoarse = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const disabled = isCoarse || reducedMotion;

  useEffect(() => {
    if (disabled) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pos.x = event.clientX;
      pos.y = event.clientY;
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a, button, [role='button'], input, textarea, [data-cursor='interactive']")
      );
      setActive(interactive);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-8 w-8 rounded-full border border-accent-soft/50 transition-[width,height,opacity] duration-200 ease-out"
        style={{ opacity: visible ? 1 : 0, ...(active ? { width: 48, height: 48 } : {}) }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-accent-soft shadow-[0_0_12px_2px_rgba(125,179,255,0.8)] transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
