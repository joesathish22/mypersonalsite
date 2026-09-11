"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animation/gsap";
import { cn } from "@/lib/utils/cn";

type RevealTextProps = {
  children: React.ReactNode;
  as?: "span" | "div" | "p";
  className?: string;
  delay?: number;
  y?: number;
};

export function RevealText({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";

  useGSAP(
    () => {
      if (!ref.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cn("opacity-0", className)}>
      {children}
    </Tag>
  );
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
