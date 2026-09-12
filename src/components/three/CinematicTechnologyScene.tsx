"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { Particles } from "./Particles";
import { createFresnelMaterial } from "@/lib/three/shaders/fresnel";
import { getCinematicLayout, type CinematicVariant, type Vec3 } from "@/lib/three/cinematic-layouts";
import { getCinematicSceneQuality } from "@/lib/three/quality";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

const NODE_COLOR = "#dce6f2";
const LINE_COLOR = "#4d6b8a";
const ACCENT_COLOR = "#3d8bff";
const CORE_RADIUS = 0.5;

/**
 * A restrained, glowing "system core" every variant shares — the same
 * visual language as the homepage's fresnel shield (see TechUniverseScene),
 * just always present here rather than appearing only in one stage.
 */
function Core() {
  const shellRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  const glowMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  if (glowMaterialRef.current === null) {
    glowMaterialRef.current = createFresnelMaterial(ACCENT_COLOR, 0.4, 2.4);
  }
  useEffect(() => {
    if (glowRef.current && glowMaterialRef.current) {
      glowRef.current.material = glowMaterialRef.current;
    }
    return () => glowMaterialRef.current?.dispose();
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (shellRef.current) shellRef.current.rotation.y += delta * 0.05;
    if (glowRef.current) glowRef.current.rotation.y -= delta * 0.03;
  });

  return (
    <group>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[CORE_RADIUS, 1]} />
        <meshBasicMaterial color={ACCENT_COLOR} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[CORE_RADIUS * 1.45, 2]} />
      </mesh>
      <mesh>
        <sphereGeometry args={[CORE_RADIUS * 0.32, 12, 12]} />
        <meshBasicMaterial color="#eaf2ff" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function OuterNodes({ nodes }: { nodes: Vec3[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;

    nodes.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 1.2 + i * 0.7) * 0.12;
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function bulge(a: Vec3, b: Vec3): Vec3 {
  const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  return [mid[0] * 1.2, mid[1] * 1.2, mid[2] * 1.2];
}

const ORIGIN: Vec3 = [0, 0, 0];

function resolvePoint(nodes: Vec3[], index: number): Vec3 {
  return index === -1 ? ORIGIN : nodes[index];
}

/** Static arced connections — node-to-node and node-to-core alike. */
function Connections({
  nodes,
  connections,
  coreLinks,
}: {
  nodes: Vec3[];
  connections: [number, number][];
  coreLinks: number[];
}) {
  const segments = useMemo(() => {
    const list: { start: Vec3; mid: Vec3; end: Vec3 }[] = [];
    connections.forEach(([a, b]) => {
      const start = nodes[a];
      const end = nodes[b];
      list.push({ start, end, mid: bulge(start, end) });
    });
    coreLinks.forEach((i) => {
      const start = nodes[i];
      list.push({ start, end: ORIGIN, mid: bulge(start, ORIGIN) });
    });
    return list;
  }, [nodes, connections, coreLinks]);

  return (
    <>
      {segments.map((segment, i) => (
        <QuadraticBezierLine
          key={i}
          start={segment.start}
          end={segment.end}
          mid={segment.mid}
          color={LINE_COLOR}
          lineWidth={0.6}
          transparent
          opacity={0.28}
        />
      ))}
    </>
  );
}

/**
 * A handful of small traveling points of light, each cycling along its own
 * ordered stop sequence (`pulsePath`) — the same quadratic-curve travel
 * technique as NetworkGlobe's SignalPulses, generalized so "inward",
 * "forward", "layered" and "transform" motion are all the same mechanism,
 * just different stop orderings.
 */
function PathPulses({ nodes, pulsePath }: { nodes: Vec3[]; pulsePath: number[][] }) {
  const reducedMotion = useReducedMotion();
  const dotRefs = useRef<(THREE.Mesh | null)[]>([]);

  const paths = useMemo(
    () => pulsePath.slice(0, 8).map((path) => path.map((index) => resolvePoint(nodes, index))),
    [nodes, pulsePath]
  );

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime;
    const speed = 0.22;

    paths.forEach((path, pi) => {
      const mesh = dotRefs.current[pi];
      if (!mesh || path.length < 2) return;

      const segmentCount = path.length - 1;
      const localT = ((t * speed + pi * 0.37) % 1) * segmentCount;
      const segmentIndex = Math.min(Math.floor(localT), segmentCount - 1);
      const frac = localT - segmentIndex;
      const p0 = path[segmentIndex];
      const p2 = path[segmentIndex + 1];
      const mid = bulge(p0, p2);
      const mt = 1 - frac;
      const wa = mt * mt;
      const wb = 2 * mt * frac;
      const wc = frac * frac;

      mesh.position.set(
        wa * p0[0] + wb * mid[0] + wc * p2[0],
        wa * p0[1] + wb * mid[1] + wc * p2[1],
        wa * p0[2] + wb * mid[2] + wc * p2[2]
      );
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(frac * Math.PI) * 0.85;
    });
  });

  if (reducedMotion) return null;

  return (
    <>
      {paths.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color={ACCENT_COLOR} transparent opacity={0} />
        </mesh>
      ))}
    </>
  );
}

/** Extremely subtle idle drift + mouse parallax — skipped entirely under reduced motion. */
function CameraRig({ basePosition }: { basePosition: Vec3 }) {
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame(({ camera, clock }) => {
    if (reducedMotion) {
      camera.position.set(basePosition[0], basePosition[1], basePosition[2]);
      camera.lookAt(0, 0, 0);
      return;
    }

    const t = clock.elapsedTime;
    const targetX = basePosition[0] + pointer.current.x * 0.2 + Math.sin(t * 0.1) * 0.06;
    const targetY = basePosition[1] - pointer.current.y * 0.12 + Math.cos(t * 0.08) * 0.04;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, basePosition[2], 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function CinematicFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background: "radial-gradient(circle at 55% 45%, rgba(61,139,255,0.16), transparent 60%)",
      }}
    />
  );
}

type CinematicTechnologySceneProps = {
  variant: CinematicVariant;
  className?: string;
};

/**
 * A reusable, on-brand cinematic "living digital system" for the deep-page
 * heroes (/capabilities, /services, /work, /ai) — one core/lighting/material/
 * animation system shared across all four, with only node layout, connection
 * topology and pulse direction varying per `variant` (see cinematic-layouts.ts).
 * Not used on, and does not touch, the homepage's TechUniverseScene.
 */
export function CinematicTechnologyScene({ variant, className }: CinematicTechnologySceneProps) {
  const isMobile = useIsMobile();
  const layout = useMemo(() => getCinematicLayout(variant, isMobile), [variant, isMobile]);
  const quality = getCinematicSceneQuality(isMobile);

  return (
    <SceneCanvas
      className={className}
      cameraPosition={layout.cameraPosition}
      fov={layout.fov}
      fallback={<CinematicFallback />}
    >
      <fog attach="fog" args={["#05080d", 4.5, 10]} />
      <Core />
      <OuterNodes nodes={layout.nodes} />
      <Connections nodes={layout.nodes} connections={layout.connections} coreLinks={layout.coreLinks} />
      <PathPulses nodes={layout.nodes} pulsePath={layout.pulsePath} />
      <Particles count={quality.particleCount} spread={3.2} driftSpeed={0.01} />
      <CameraRig basePosition={layout.cameraPosition} />
    </SceneCanvas>
  );
}
