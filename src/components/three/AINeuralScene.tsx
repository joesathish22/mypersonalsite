"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

type Vec3 = [number, number, number];

function buildLayers(mobile: boolean): Vec3[][] {
  const sizes = mobile ? [4, 5, 5, 3] : [5, 7, 7, 4];
  const spacingX = 1.5;

  return sizes.map((size, li) =>
    Array.from({ length: size }, (_, i): Vec3 => [
      (li - (sizes.length - 1) / 2) * spacingX,
      (i - (size - 1) / 2) * 0.5,
      0,
    ])
  );
}

/** A restrained, layered node diagram — an engineered nod to neural
 * architecture, not a cyberpunk cliché. Nodes carry a slow, phase-shifted
 * pulse (data moving through the system) and connections breathe gently;
 * nothing here reacts to scroll, so it stays lightweight. */
function NeuralNet({ mobile }: { mobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const reducedMotion = useReducedMotion();

  const layers = useMemo(() => buildLayers(mobile), [mobile]);
  const nodes = useMemo(() => layers.flat(), [layers]);

  const segmentPositions = useMemo(() => {
    const segments: number[] = [];
    for (let li = 0; li < layers.length - 1; li++) {
      layers[li].forEach((a, ai) => {
        layers[li + 1].forEach((b, bi) => {
          if ((ai + bi) % 2 === 0) {
            segments.push(a[0], a[1], a[2], b[0], b[1], b[2]);
          }
        });
      });
    }
    return new Float32Array(segments);
  }, [layers]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.1;
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.18 + 0.15 * (0.5 + 0.5 * Math.sin(t * 0.6));
    }
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = i * 0.45;
      const scale = 1 + Math.sin(t * 1.1 + phase) * 0.16;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#7fb3ff" transparent opacity={0.9} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[segmentPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMatRef} color="#3d8bff" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export function AINeuralScene({ className }: { className?: string }) {
  const isMobile = useIsMobile();

  return (
    <SceneCanvas
      className={className}
      cameraPosition={[0, 0, 5]}
      fov={42}
      fallback={<AIFallback />}
    >
      <fog attach="fog" args={["#05080d", 4, 9]} />
      <NeuralNet mobile={isMobile} />
    </SceneCanvas>
  );
}

function AIFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(61,139,255,0.14), transparent 60%)",
      }}
    />
  );
}
