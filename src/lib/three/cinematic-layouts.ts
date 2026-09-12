export type Vec3 = [number, number, number];
export type CinematicVariant = "capabilities" | "services" | "work" | "ai" | "about" | "articles";

export type CinematicLayout = {
  /** Outer node positions. */
  nodes: Vec3[];
  /** Node-to-node connections, as index pairs into `nodes`. */
  connections: [number, number][];
  /** Node indices additionally linked to the central core. */
  coreLinks: number[];
  /**
   * Ordered stop sequences a traveling pulse-dot cycles through. `-1` means
   * "the core" (origin). One entry per independent, phase-offset pulse.
   */
  pulsePath: number[][];
  cameraPosition: Vec3;
  fov: number;
};

// Deterministic PRNG so every layout is stable across renders/SSR — the same
// small utility already duplicated locally in tech-universe-layouts.ts and
// NetworkGlobe.tsx rather than introducing a shared module for one function.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ringNodes(count: number, radius: number, tilt: number, seed: number): Vec3[] {
  const rand = mulberry32(seed);
  const nodes: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const flat = Math.sin(angle) * radius;
    const y = flat * Math.cos(tilt) + (rand() - 0.5) * 0.15;
    const z = flat * Math.sin(tilt) + (rand() - 0.5) * 0.25;
    nodes.push([x, y, z]);
  }
  return nodes;
}

/**
 * Capabilities — six disciplines visually converging into one system: a
 * tilted ring of nodes, each linked to the core, plus a light perimeter link
 * between neighbors so it reads as a connected mesh rather than six spokes.
 */
function capabilitiesLayout(isMobile: boolean): CinematicLayout {
  const count = isMobile ? 4 : 6;
  const nodes = ringNodes(count, 1.65, 0.4, 11);
  const connections: [number, number][] = [];
  for (let i = 0; i < count; i++) connections.push([i, (i + 1) % count]);
  const coreLinks = nodes.map((_, i) => i);
  const pulsePath = coreLinks.map((i) => [i, -1]);

  return { nodes, connections, coreLinks, pulsePath, cameraPosition: [0.3, 0.2, 5.1], fov: 42 };
}

/**
 * Services — Strategy → Build → Deploy → Scale, chained left to right, each
 * stage paired with a small satellite (consulting and engineering shown as
 * connected, not separate). Pulses travel forward along the chain.
 */
function servicesLayout(isMobile: boolean): CinematicLayout {
  const stageCount = isMobile ? 3 : 4;
  const rand = mulberry32(23);
  const spacing = 1.2;
  const stageNodes: Vec3[] = [];
  const satelliteNodes: Vec3[] = [];

  for (let i = 0; i < stageCount; i++) {
    const x = (i - (stageCount - 1) / 2) * spacing;
    const y = Math.sin(i * 0.9) * 0.2;
    const z = (rand() - 0.5) * 0.35;
    stageNodes.push([x, y, z]);
    satelliteNodes.push([x + (rand() - 0.5) * 0.3, y - 0.6 - rand() * 0.15, z + 0.35]);
  }

  const nodes = [...stageNodes, ...satelliteNodes];
  const connections: [number, number][] = [];
  for (let i = 0; i < stageCount - 1; i++) connections.push([i, i + 1]);
  for (let i = 0; i < stageCount; i++) connections.push([i, stageCount + i]);

  const coreLinks = [0, stageCount - 1];
  const pulsePath = [Array.from({ length: stageCount }, (_, i) => i)];

  return { nodes, connections, coreLinks, pulsePath, cameraPosition: [0, 0.1, 5.7], fov: 44 };
}

/**
 * Work — an architectural, layered "platform" structure: z-depth layers of
 * nodes with intra-layer mesh links and vertical inter-layer links. Pulses
 * travel layer to layer, reading as data moving through a stack.
 */
function workLayout(isMobile: boolean): CinematicLayout {
  const layerCount = 3;
  const perLayer = isMobile ? 2 : 3;
  const rand = mulberry32(77);
  const nodes: Vec3[] = [];

  for (let layer = 0; layer < layerCount; layer++) {
    const z = (layer - (layerCount - 1) / 2) * 0.95;
    for (let i = 0; i < perLayer; i++) {
      const x = (i - (perLayer - 1) / 2) * 0.95;
      const y = (layer - (layerCount - 1) / 2) * 0.6 + (rand() - 0.5) * 0.12;
      nodes.push([x, y, z]);
    }
  }

  const connections: [number, number][] = [];
  const interLayer: [number, number][] = [];

  for (let layer = 0; layer < layerCount; layer++) {
    const base = layer * perLayer;
    for (let i = 0; i < perLayer - 1; i++) connections.push([base + i, base + i + 1]);
  }
  for (let layer = 0; layer < layerCount - 1; layer++) {
    for (let i = 0; i < perLayer; i++) {
      const a = layer * perLayer + i;
      const b = (layer + 1) * perLayer + i;
      connections.push([a, b]);
      interLayer.push([a, b]);
    }
  }

  const coreLinks = [Math.floor(perLayer / 2)];
  const pulsePath = interLayer.map(([a, b]) => [a, b]);

  return { nodes, connections, coreLinks, pulsePath, cameraPosition: [1.15, 0.35, 4.7], fov: 44 };
}

/**
 * AI — Data → Intelligence → Automation → Systems across four zones along x,
 * moving from a scattered cluster to a tight, organized one. Pulses flow
 * continuously through all four zones — the most expressive variant.
 */
function aiLayout(isMobile: boolean): CinematicLayout {
  const perZone = isMobile ? 2 : 3;
  const rand = mulberry32(99);
  const zoneX = [-1.85, -0.62, 0.62, 1.85];
  const spreads = [0.62, 0.38, 0.26, 0.14];
  const nodes: Vec3[] = [];
  const zoneIndices: number[][] = [[], [], [], []];

  zoneX.forEach((x, zi) => {
    const spread = spreads[zi];
    for (let i = 0; i < perZone; i++) {
      const y = (rand() - 0.5) * spread * 2.2;
      const z = (rand() - 0.5) * spread * 2.2;
      zoneIndices[zi].push(nodes.length);
      nodes.push([x + (rand() - 0.5) * spread * 0.6, y, z]);
    }
  });

  const connections: [number, number][] = [];
  for (let zi = 0; zi < zoneX.length - 1; zi++) {
    const a = zoneIndices[zi];
    const b = zoneIndices[zi + 1];
    const span = Math.max(a.length, b.length);
    for (let i = 0; i < span; i++) connections.push([a[i % a.length], b[i % b.length]]);
  }

  const coreLinks = [zoneIndices[2][0]];
  const pulsePath = [
    zoneIndices.map((zone) => zone[0]),
    zoneIndices.map((zone) => zone[zone.length - 1]),
  ];

  return { nodes, connections, coreLinks, pulsePath, cameraPosition: [0, 0.15, 6.5], fov: 46 };
}

function scatterNodes(count: number, radius: number, seed: number): Vec3[] {
  const rand = mulberry32(seed);
  const nodes: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = radius * (0.55 + rand() * 0.45);
    nodes.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.7,
      r * Math.cos(phi) * 0.8,
    ]);
  }
  return nodes;
}

/**
 * About — a smaller, calmer ring than Capabilities: a handful of role facets
 * (strategist, builder, founder, advisor) drawn tightly into one center,
 * read as personal/centered rather than a wide ecosystem.
 */
function aboutLayout(isMobile: boolean): CinematicLayout {
  const count = isMobile ? 3 : 4;
  const nodes = ringNodes(count, 1.35, 0.5, 5);
  const connections: [number, number][] = [];
  for (let i = 0; i < count; i++) connections.push([i, (i + 1) % count]);
  const coreLinks = nodes.map((_, i) => i);
  const pulsePath = coreLinks.map((i) => [i, -1]);

  return { nodes, connections, coreLinks, pulsePath, cameraPosition: [0.2, 0.15, 4.6], fov: 40 };
}

/**
 * Articles — a loose, organic knowledge graph rather than a clean ring or
 * chain: scattered topic nodes with a sparse, randomly-paired mesh of
 * connections, only a couple tied to the core. Reads as an emerging body of
 * writing, appropriate for a page whose content is still being written.
 */
function articlesLayout(isMobile: boolean): CinematicLayout {
  const count = isMobile ? 5 : 7;
  const nodes = scatterNodes(count, 1.9, 41);
  const rand = mulberry32(53);
  const connections: [number, number][] = [];
  const pairCount = Math.round(count * 1.1);

  for (let i = 0; i < pairCount; i++) {
    const a = Math.floor(rand() * count);
    let b = Math.floor(rand() * count);
    if (b === a) b = (b + 1) % count;
    connections.push([a, b]);
  }

  const coreLinks = [0, Math.floor(count / 2)];
  const pulsePath = connections.slice(0, Math.min(6, connections.length)).map(([a, b]) => [a, b]);

  return { nodes, connections, coreLinks, pulsePath, cameraPosition: [0, 0.1, 5.9], fov: 46 };
}

export function getCinematicLayout(variant: CinematicVariant, isMobile: boolean): CinematicLayout {
  switch (variant) {
    case "capabilities":
      return capabilitiesLayout(isMobile);
    case "services":
      return servicesLayout(isMobile);
    case "work":
      return workLayout(isMobile);
    case "ai":
      return aiLayout(isMobile);
    case "about":
      return aboutLayout(isMobile);
    case "articles":
      return articlesLayout(isMobile);
  }
}
