"use client";

import { useEffect, useState } from "react";

/**
 * A brief branded transition, not a fake wait. It clears as soon as the
 * window finishes loading, capped at 900ms either way so a slow network
 * never turns this into a stall — content underneath renders regardless.
 */
export function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.readyState === "complete"
    ) {
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(92, 12 + (elapsed / 900) * 80));
      if (elapsed < 900) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(100);
      window.setTimeout(() => setVisible(false), 260);
    };

    const timeout = window.setTimeout(finish, 900);
    window.addEventListener("load", finish);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-void transition-opacity duration-300"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-foreground">
        S. Sathish Kumar
      </p>
      <div className="h-px w-40 overflow-hidden bg-line">
        <div
          className="h-full bg-accent-soft transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
