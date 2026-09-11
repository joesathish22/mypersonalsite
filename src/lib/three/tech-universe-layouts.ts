import { fibonacciSphere } from "./fibonacci-sphere";

export type Vec3 = [number, number, number];

// Deterministic PRNG — layouts must be stable across renders and SSR.
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

/** Stage 1 — Strategy: an abstract architectural grid, mapped flat. */
export function strategyLayout(count: number): Vec3[] {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const seeded = mulberry32(11);
  const points: Vec3[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col - (cols - 1) / 2) * 0.95;
    const y = (row - (rows - 1) / 2) * 0.85;
    const z = (seeded() - 0.5) * 0.4;
    points.push([x, y, z]);
  }

  return points;
}

/** Stage 2 — Build: layered rings, a structure assembling itself upward. */
export function buildLayout(count: number): Vec3[] {
  const layers = 5;
  const perLayer = Math.ceil(count / layers);
  const points: Vec3[] = [];

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(i / perLayer);
    const indexInLayer = i % perLayer;
    const angle = (indexInLayer / perLayer) * Math.PI * 2;
    const radius = 0.85 + layer * 0.08;
    const y = (layer - (layers - 1) / 2) * 0.72;
    points.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
  }

  return points;
}

/** Stage 3 — Scale: the network expands — more spread, more reach. */
export function scaleLayout(count: number): Vec3[] {
  return fibonacciSphere(count, 2.35);
}

/** Stage 4 — Protect: the network contracts inward, ready to be shielded. */
export function protectLayout(count: number): Vec3[] {
  return fibonacciSphere(count, 0.85);
}

export const stageLayouts = [strategyLayout, buildLayout, scaleLayout, protectLayout];

export const stageCameraPositions: Vec3[] = [
  [0, 0.15, 4.4],
  [0.35, 0.35, 4.1],
  [0, 0, 5.6],
  [0, 0, 3.3],
];

/**
 * Maps overall scroll progress (0..1) to a {index, frac} pair across N
 * transitions between N+1 stages. Shared by the 3D morph and the caption
 * crossfade so the two can never drift out of sync with each other.
 */
export function getMorphSegment(progress: number, transitions: number) {
  const t = Math.min(Math.max(progress, 0), 1) * transitions;
  const clamped = Math.min(t, transitions - 0.0001);
  const index = Math.floor(clamped);
  const frac = clamped - index;
  return { index, frac };
}

/** Fixed connection topology — same edges morph between stage layouts. */
export function generateConnections(count: number, connectionCount: number): [number, number][] {
  const seeded = mulberry32(2024);
  const pairs: [number, number][] = [];

  for (let i = 0; i < connectionCount; i++) {
    const a = Math.floor(seeded() * count);
    let b = Math.floor(seeded() * count);
    if (b === a) b = (b + 1) % count;
    pairs.push([a, b]);
  }

  return pairs;
}
