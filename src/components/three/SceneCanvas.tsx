"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isWebGLAvailable } from "@/lib/three/webgl-detect";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { getSceneQuality } from "@/lib/three/quality";
import { cn } from "@/lib/utils/cn";

type SceneCanvasProps = {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  fallback?: React.ReactNode;
};

/**
 * Shared Canvas host: detects WebGL support once, renders a static fallback
 * when it's unavailable, and manages two concentric visibility zones —
 *
 * - "mounted" (wide rootMargin): the Canvas/WebGL context exists at all.
 *   Unmounting (not just pausing) when scrolled far away matters because
 *   browsers cap simultaneous live WebGL contexts (Safari and mobile
 *   especially) — with several 3D sections on one page, leaving every
 *   context alive risks the browser force-losing the oldest one.
 * - "inView" (tight, real intersection): the render loop actually runs.
 *   Mounted-but-not-visible sections sit idle (frameloop: "never") so they
 *   don't spend frame budget while still being ready the instant they're
 *   scrolled into place.
 *
 * The canvas itself stays at opacity 0 until a frame has actually been
 * drawn (one tick after `onCreated`), then fades in — so a freshly created
 * WebGL context can never be visible mid-initialization.
 */
export function SceneCanvas({
  children,
  className,
  cameraPosition = [0, 0, 5],
  fov = 50,
  fallback,
}: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const supported = useSyncExternalStore(
    () => () => {},
    () => isWebGLAvailable(),
    () => null
  );
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();
  const quality = getSceneQuality(isMobile);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        setMounted(entry.isIntersecting);
        // Reset on unmount so a later remount starts hidden again — `ready`
        // otherwise carries over stale from the previous Canvas instance
        // and would reveal the new one's uninitialized first frame.
        if (!entry.isIntersecting) setReady(false);
      },
      { rootMargin: "75% 0px 75% 0px", threshold: 0 }
    );
    const viewObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 }
    );
    mountObserver.observe(node);
    viewObserver.observe(node);

    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mountObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (supported === false) {
    return (
      <div ref={containerRef} className={className}>
        {fallback}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {supported && mounted ? (
        <Canvas
          dpr={quality.dpr}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: cameraPosition, fov }}
          frameloop={inView && tabVisible ? "always" : "never"}
          onCreated={() => {
            // One extra tick past context creation so the first real draw
            // call has actually happened before this is allowed to show.
            requestAnimationFrame(() => setReady(true));
          }}
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s ease-out" }}
        >
          {children}
        </Canvas>
      ) : null}
    </div>
  );
}
