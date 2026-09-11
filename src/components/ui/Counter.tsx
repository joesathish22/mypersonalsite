"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function Counter({ to, suffix = "", duration = 1.4, className }: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    if (reducedMotion) {
      const frame = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
