export type QualityTier = "mobile" | "desktop";

export type SceneQuality = {
  dpr: [number, number];
  nodeCount: number;
  connectionCount: number;
  particleCount: number;
  wireframeDetail: number;
};

export function getSceneQuality(isMobile: boolean): SceneQuality {
  if (isMobile) {
    return {
      dpr: [1, 1.5],
      nodeCount: 14,
      connectionCount: 10,
      particleCount: 220,
      wireframeDetail: 1,
    };
  }

  return {
    dpr: [1, 2],
    nodeCount: 26,
    connectionCount: 20,
    particleCount: 550,
    wireframeDetail: 2,
  };
}

export type CinematicSceneQuality = {
  particleCount: number;
};

/**
 * A lighter tier for the deep-page hero visuals (CinematicTechnologyScene) —
 * these are supporting, ~400-500px visuals, not the full-viewport flagship
 * scenes `getSceneQuality` tunes for, so they get their own, smaller budget.
 * Node/connection counts for these scenes come from each variant's fixed
 * layout (src/lib/three/cinematic-layouts.ts), not from this tier.
 */
export function getCinematicSceneQuality(isMobile: boolean): CinematicSceneQuality {
  return { particleCount: isMobile ? 50 : 160 };
}
