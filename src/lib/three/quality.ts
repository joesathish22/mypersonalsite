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
