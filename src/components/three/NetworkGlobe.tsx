"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { fibonacciSphere } from "@/lib/three/fibonacci-sphere";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type NetworkGlobeProps = {
  radius?: number;
  nodeCount?: number;
  connectionCount?: number;
  wireframeDetail?: number;
  autoRotateSpeed?: number;
  pointerInfluence?: number;
  color?: string;
  pointerRef?: React.RefObject<{ x: number; y: number }>;
};

/**
 * An architectural wireframe globe with a sparse set of nodes and thin
 * arced connections — deliberately restrained, not a "gaming" spinning
 * sphere. Reused by the hero and the global-collaboration section.
 */
export function NetworkGlobe({
  radius = 1.7,
  nodeCount = 26,
  connectionCount = 18,
  wireframeDetail = 2,
  autoRotateSpeed = 0.04,
  pointerInfluence = 0.12,
  color = "#3d8bff",
  pointerRef,
}: NetworkGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetTilt = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const nodes = useMemo(() => fibonacciSphere(nodeCount, radius), [nodeCount, radius]);

  const connections = useMemo(() => {
    const pairs: [number, number][] = [];
    const seeded = mulberry32(1337);
    for (let i = 0; i < connectionCount; i++) {
      const a = Math.floor(seeded() * nodes.length);
      let b = Math.floor(seeded() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      pairs.push([a, b]);
    }
    return pairs;
  }, [connectionCount, nodes.length]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Autoplaying rotation is skipped for reduced motion; pointer-driven
    // tilt below still responds since it's a direct reaction to input.
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * autoRotateSpeed;
    }

    if (pointerRef?.current) {
      targetTilt.current.x = pointerRef.current.y * pointerInfluence;
      targetTilt.current.y = pointerRef.current.x * pointerInfluence;
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetTilt.current.x,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetTilt.current.y * 0.3,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[radius, wireframeDetail]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.14} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[radius * 0.997, wireframeDetail]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.06} />
      </mesh>

      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[radius * 0.014, 8, 8]} />
          <meshBasicMaterial color="#eaf2ff" transparent opacity={0.85} />
        </mesh>
      ))}

      {connections.map(([a, b], i) => (
        <QuadraticBezierLine
          key={i}
          start={nodes[a]}
          end={nodes[b]}
          mid={midpointBulge(nodes[a], nodes[b])}
          color={color}
          lineWidth={0.6}
          transparent
          opacity={0.28}
        />
      ))}
    </group>
  );
}

function midpointBulge(
  a: [number, number, number],
  b: [number, number, number]
): [number, number, number] {
  const mid = new THREE.Vector3(
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
    (a[2] + b[2]) / 2
  );
  const bulge = mid.clone().normalize().multiplyScalar(mid.length() * 1.12);
  return [bulge.x, bulge.y, bulge.z];
}

// Deterministic PRNG so the connection layout is stable across renders/SSR.
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
