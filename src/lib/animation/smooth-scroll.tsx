"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";

type LenisRef = React.RefObject<Lenis | null>;

const SmoothScrollContext = createContext<LenisRef>({ current: null });

/** Returns a ref to the active Lenis instance (or null before/without it). */
export function useLenis(): LenisRef {
  return useContext(SmoothScrollContext);
}

/**
 * Single Lenis instance driving both native scroll smoothing and GSAP's
 * ScrollTrigger. Every scroll-linked animation in the app should register
 * through ScrollTrigger rather than adding its own scroll listener. Exposed
 * via a ref (not state) since nothing needs to re-render when it initializes.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Respect the user's preference: fall back to native scrolling and
      // let ScrollTrigger read the native scroll position directly.
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
      wheelMultiplier: 1,
    });

    lenisRef.current = instance;
    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
