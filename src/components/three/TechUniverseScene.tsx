"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import {
  stageLayouts,
  stageCameraPositions,
  generateConnections,
  getMorphSegment,
} from "@/lib/three/tech-universe-layouts";
import { createFresnelMaterial } from "@/lib/three/shaders/fresnel";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { getSceneQuality } from "@/lib/three/quality";

const CURVE_SEGMENTS = 14;
const TRANSITIONS = stageLayouts.length - 1;

type TechUniverseCoreProps = {
  progressRef: React.RefObject<number>;
  count: number;
  connectionCount: number;
};

/**
 * The four-stage morph (Strategy -> Build -> Scale -> Protect). One fixed
 * pool of nodes and connections is reused throughout — only their target
 * positions change — so the same network visibly reshapes itself rather
 * than swapping between four unrelated scenes.
 */
function TechUniverseCore({ progressRef, count, connectionCount }: TechUniverseCoreProps) {
  const layouts = useMemo(() => stageLayouts.map((fn) => fn(count)), [count]);
  const connections = useMemo(
    () => generateConnections(count, connectionCount),
    [count, connectionCount]
  );

  const positions = useRef(new Float32Array(count * 3));
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const reducedMotion = useReducedMotion();

  // A ref (not useMemo) — its uniform is mutated every frame below, and refs
  // are the sanctioned mutable escape hatch for that in React's eyes.
  const shieldMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  if (shieldMaterialRef.current === null) {
    shieldMaterialRef.current = createFresnelMaterial("#3d8bff", 0, 2.4);
  }
  useEffect(() => {
    // Attach imperatively in an effect — reading a ref during render (e.g.
    // directly in JSX below) isn't safe; effects are the sanctioned place.
    if (shieldRef.current && shieldMaterialRef.current) {
      shieldRef.current.material = shieldMaterialRef.current;
    }
    return () => shieldMaterialRef.current?.dispose();
  }, []);

  const lineObjects = useMemo(() => {
    return connections.map(() => {
      const geometry = new THREE.BufferGeometry();
      const arr = new Float32Array((CURVE_SEGMENTS + 1) * 3);
      geometry.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      const material = new THREE.LineBasicMaterial({
        color: "#3d8bff",
        transparent: true,
        opacity: 0.25,
      });
      return new THREE.Line(geometry, material);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections.length]);

  useEffect(() => {
    return () => {
      lineObjects.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [lineObjects]);

  // Priority -1: this must run before any other useFrame in the tree so the
  // position buffer is current when nothing downstream reads it this frame.
  useFrame(({ camera }) => {
    const { index, frac } = getMorphSegment(progressRef.current ?? 0, TRANSITIONS);
    const from = layouts[index];
    const to = layouts[index + 1] ?? layouts[index];
    const buf = positions.current;

    for (let i = 0; i < count; i++) {
      const fx = from[i][0], fy = from[i][1], fz = from[i][2];
      const tx = to[i][0], ty = to[i][1], tz = to[i][2];
      buf[i * 3] = fx + (tx - fx) * frac;
      buf[i * 3 + 1] = fy + (ty - fy) * frac;
      buf[i * 3 + 2] = fz + (tz - fz) * frac;
    }

    const mesh = nodeMeshRef.current;
    if (mesh) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(buf[i * 3], buf[i * 3 + 1], buf[i * 3 + 2]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    connections.forEach(([a, b], li) => {
      const line = lineObjects[li];
      const attr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;

      const p0x = buf[a * 3], p0y = buf[a * 3 + 1], p0z = buf[a * 3 + 2];
      const p2x = buf[b * 3], p2y = buf[b * 3 + 1], p2z = buf[b * 3 + 2];
      const cx = ((p0x + p2x) / 2) * 1.18;
      const cy = ((p0y + p2y) / 2) * 1.18;
      const cz = ((p0z + p2z) / 2) * 1.18;

      for (let s = 0; s <= CURVE_SEGMENTS; s++) {
        const st = s / CURVE_SEGMENTS;
        const mt = 1 - st;
        const wa = mt * mt, wb = 2 * mt * st, wc = st * st;
        const idx = s * 3;
        arr[idx] = wa * p0x + wb * cx + wc * p2x;
        arr[idx + 1] = wa * p0y + wb * cy + wc * p2y;
        arr[idx + 2] = wa * p0z + wb * cz + wc * p2z;
      }
      attr.needsUpdate = true;
    });

    // The shield only appears during the final (Scale -> Protect) segment.
    const shieldT = index === TRANSITIONS - 1 ? frac : 0;
    if (shieldRef.current) {
      shieldRef.current.visible = shieldT > 0.01;
      shieldRef.current.scale.setScalar(0.72 + shieldT * 0.28);
      if (shieldMaterialRef.current) {
        shieldMaterialRef.current.uniforms.uOpacity.value = shieldT * 0.6;
      }
      if (!reducedMotion) shieldRef.current.rotation.y += 0.0015;
    }

    const camFrom = stageCameraPositions[index];
    const camTo = stageCameraPositions[index + 1] ?? stageCameraPositions[index];
    camera.position.x = THREE.MathUtils.lerp(camFrom[0], camTo[0], frac);
    camera.position.y = THREE.MathUtils.lerp(camFrom[1], camTo[1], frac);
    camera.position.z = THREE.MathUtils.lerp(camFrom[2], camTo[2], frac);
    camera.lookAt(0, 0, 0);

    if (!reducedMotion && groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  }, -1);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#eaf2ff" transparent opacity={0.9} />
      </instancedMesh>

      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      <mesh ref={shieldRef} visible={false}>
        <icosahedronGeometry args={[1.55, 2]} />
      </mesh>
    </group>
  );
}

export function TechUniverseScene({
  progressRef,
  className,
}: {
  progressRef: React.RefObject<number>;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const quality = getSceneQuality(isMobile);

  return (
    <SceneCanvas
      className={className}
      cameraPosition={stageCameraPositions[0]}
      fov={46}
      fallback={<TechUniverseFallback />}
    >
      <fog attach="fog" args={["#07111f", 4, 9]} />
      <TechUniverseCore
        progressRef={progressRef}
        count={quality.nodeCount}
        connectionCount={quality.connectionCount}
      />
    </SceneCanvas>
  );
}

function TechUniverseFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, rgba(61,139,255,0.16), transparent 60%)",
      }}
    />
  );
}
