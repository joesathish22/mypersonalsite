"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * useSyncExternalStore keeps this correct across SSR/hydration without an
 * effect-driven setState: the server snapshot is a safe default, and React
 * reconciles against the real value right after hydration.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
