"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import {
  stageLayouts,
  stageCameraPositions,
  stageConnectionActivity,
  generateConnections,
  getMorphSegment,
} from "@/lib/three/tech-universe-layouts";
import { createFresnelMaterial } from "@/lib/three/shaders/fresnel";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { getSceneQuality } from "@/lib/three/quality";
import { Particles } from "./Particles";

const CURVE_SEGMENTS = 14;
const TRANSITIONS = stageLayouts.length - 1;

// A muted slate-blue for the everyday network — vivid accent blue is
// reserved for the shield and the traveling pulses, so it reads as a
// deliberate highlight rather than the network being blue all over.
const LINE_COLOR = "#4d6b8a";
const NODE_COLOR = "#dce6f2";
const ACCENT_COLOR = "#3d8bff";

// Fraction of the current camera distance the network is shifted right by,
// clearing a protected zone on the left third of the frame for the caption
// text. Expressed as a function of distance (not a fixed world unit) so the
// apparent screen-space shift stays consistent across the very different
// camera distances used per stage.
const RIGHT_SHIFT_FACTOR = 0.34;
const PULSE_COUNT = 8;

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
  const pulseConnections = useMemo(
    () => connections.slice(0, Math.min(PULSE_COUNT, connections.length)),
    [connections]
  );

  const positions = useRef(new Float32Array(count * 3));
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const shieldCoreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const reducedMotion = useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });
  const tilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Refs (not useMemo) — their uniforms/props are mutated every frame below,
  // and refs are the sanctioned mutable escape hatch for that in React's
  // eyes.
  const shieldMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  if (shieldMaterialRef.current === null) {
    shieldMaterialRef.current = createFresnelMaterial(ACCENT_COLOR, 0, 2.6);
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
        color: LINE_COLOR,
        transparent: true,
        opacity: 0.22,
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
  useFrame(({ camera, clock }) => {
    const { index, frac } = getMorphSegment(progressRef.current ?? 0, TRANSITIONS);
    const from = layouts[index];
    const to = layouts[index + 1] ?? layouts[index];
    const buf = positions.current;
    const t = clock.elapsedTime;

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
        // A restrained per-node pulse — reads as quiet system activity
        // rather than a uniform, mechanical throb.
        const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 1.6 + i * 0.6) * 0.14;
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    // Same edges throughout — only how visible they are shifts per stage,
    // plus a slow per-edge shimmer so activity reads as intermittent data
    // movement rather than a static wireframe or a uniform flicker.
    const activityFrom = stageConnectionActivity[index];
    const activityTo = stageConnectionActivity[index + 1] ?? stageConnectionActivity[index];
    const activity = THREE.MathUtils.lerp(activityFrom, activityTo, frac);

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

      const shimmer = reducedMotion ? 1 : 0.78 + 0.22 * Math.sin(t * 0.35 + li * 0.9);
      (line.material as THREE.LineBasicMaterial).opacity = 0.22 * activity * shimmer;
    });

    // Traveling points of light along a handful of connections — restrained
    // "connection activity" rather than a busy, noisy network.
    if (!reducedMotion) {
      pulseConnections.forEach(([a, b], pi) => {
        const dot = pulseRefs.current[pi];
        if (!dot) return;
        const speed = 0.16;
        const pt = (t * speed + pi * 0.29) % 1;
        const p0x = buf[a * 3], p0y = buf[a * 3 + 1], p0z = buf[a * 3 + 2];
        const p2x = buf[b * 3], p2y = buf[b * 3 + 1], p2z = buf[b * 3 + 2];
        const cx = ((p0x + p2x) / 2) * 1.18;
        const cy = ((p0y + p2y) / 2) * 1.18;
        const cz = ((p0z + p2z) / 2) * 1.18;
        const mt = 1 - pt;
        const wa = mt * mt, wb = 2 * mt * pt, wc = pt * pt;
        dot.position.set(
          wa * p0x + wb * cx + wc * p2x,
          wa * p0y + wb * cy + wc * p2y,
          wa * p0z + wb * cz + wc * p2z
        );
        (dot.material as THREE.MeshBasicMaterial).opacity =
          Math.sin(pt * Math.PI) * 0.85 * activity;
      });
    }

    // The shield only appears during the final (Scale -> Protect) segment,
    // scaled down and layered so it reads as coalescing from the network
    // rather than a decorative sphere placed behind it.
    const shieldT = index === TRANSITIONS - 1 ? frac : 0;
    if (shieldRef.current && shieldCoreRef.current) {
      const visible = shieldT > 0.01;
      shieldRef.current.visible = visible;
      shieldCoreRef.current.visible = visible;
      shieldRef.current.scale.setScalar(0.72 + shieldT * 0.28);
      shieldCoreRef.current.scale.setScalar(0.68 + shieldT * 0.32);
      if (shieldMaterialRef.current) {
        shieldMaterialRef.current.uniforms.uOpacity.value = shieldT * 0.48;
      }
      const coreMat = shieldCoreRef.current.material as THREE.MeshBasicMaterial;
      coreMat.opacity = shieldT * 0.22;
      if (!reducedMotion) {
        shieldRef.current.rotation.y += 0.0018;
        shieldCoreRef.current.rotation.y -= 0.0012;
        shieldCoreRef.current.rotation.x += 0.0007;
      }
    }

    const camFrom = stageCameraPositions[index];
    const camTo = stageCameraPositions[index + 1] ?? stageCameraPositions[index];
    const camZ = THREE.MathUtils.lerp(camFrom[2], camTo[2], frac);
    camera.position.x = THREE.MathUtils.lerp(camFrom[0], camTo[0], frac);
    camera.position.y = THREE.MathUtils.lerp(camFrom[1], camTo[1], frac);
    camera.position.z = camZ;

    if (!reducedMotion) {
      // A barely-perceptible idle drift — cinematic life, not a wobble.
      camera.position.x += Math.sin(t * 0.12) * 0.035;
      camera.position.y += Math.cos(t * 0.09) * 0.025;
    }
    camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      // Shift the whole network right, proportional to camera distance so
      // the apparent screen-space offset stays consistent across stages —
      // this is the "protected content zone": the network never occupies
      // the left ~35–40% of the frame, where the caption text lives.
      groupRef.current.position.x = camZ * RIGHT_SHIFT_FACTOR;

      if (!reducedMotion) {
        groupRef.current.rotation.y += 0.0008;

        tilt.current.x = THREE.MathUtils.lerp(tilt.current.x, pointer.current.y * 0.08, 0.04);
        tilt.current.y = THREE.MathUtils.lerp(tilt.current.y, pointer.current.x * 0.08, 0.04);
        groupRef.current.rotation.x = tilt.current.x;
        groupRef.current.rotation.z = tilt.current.y * 0.4;
      }
    }
  }, -1);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.9} />
      </instancedMesh>

      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      {pulseConnections.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.032, 6, 6]} />
          <meshBasicMaterial color={ACCENT_COLOR} transparent opacity={0} />
        </mesh>
      ))}

      {/* Outer fresnel shell — the visible "shield" silhouette. */}
      <mesh ref={shieldRef} visible={false}>
        <icosahedronGeometry args={[1.28, 2]} />
      </mesh>
      {/* A thinner inner lattice, counter-rotating — reads as a structure
          the network assembled, not a single decorative glowing orb. */}
      <mesh ref={shieldCoreRef} visible={false}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color={ACCENT_COLOR} wireframe transparent opacity={0} />
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
      <Particles count={Math.round(quality.particleCount * 0.32)} spread={4.5} driftSpeed={0.008} />
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
          "radial-gradient(circle at 62% 45%, rgba(61,139,255,0.14), transparent 58%)",
      }}
    />
  );
}
