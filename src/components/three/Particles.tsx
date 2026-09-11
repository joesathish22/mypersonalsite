"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type ParticlesProps = {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  driftSpeed?: number;
};

/** Ambient depth particles — a slow, subtle drift field, not a firework. */
export function Particles({
  count = 400,
  spread = 6,
  color = "#7fb3ff",
  size = 0.012,
  driftSpeed = 0.015,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const seeded = mulberry32(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seeded() - 0.5) * spread * 2;
      arr[i * 3 + 1] = (seeded() - 0.5) * spread * 2;
      arr[i * 3 + 2] = (seeded() - 0.5) * spread * 2;
    }
    return arr;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * driftSpeed;
    pointsRef.current.rotation.x += delta * driftSpeed * 0.4;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

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
