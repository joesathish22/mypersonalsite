"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { NetworkGlobe } from "./NetworkGlobe";
import { Particles } from "./Particles";
import { SceneCanvas } from "./SceneCanvas";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { getSceneQuality } from "@/lib/three/quality";

type HeroSceneProps = {
  progressRef: React.RefObject<number>;
  className?: string;
};

function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ camera }) => {
    const progress = progressRef.current ?? 0;

    const targetX = 0.55 + pointer.current.x * 0.15;
    const targetY = 0.1 - pointer.current.y * 0.1 - progress * 0.35;
    const targetZ = 5.4 - progress * 1.6;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0.4, 0, 0);
  });

  return null;
}

export function HeroScene({ progressRef, className }: HeroSceneProps) {
  const isMobile = useIsMobile();
  const quality = getSceneQuality(isMobile);

  return (
    <SceneCanvas
      className={className}
      cameraPosition={[0.55, 0.1, 5.4]}
      fov={48}
      fallback={<HeroFallback />}
    >
      <fog attach="fog" args={["#05080d", 3.5, 9]} />
      <group position={[0.75, -0.1, 0]}>
        <NetworkGlobe
          radius={1.75}
          nodeCount={quality.nodeCount}
          connectionCount={quality.connectionCount}
          wireframeDetail={quality.wireframeDetail}
          autoRotateSpeed={0.035}
        />
      </group>
      <Particles count={quality.particleCount} spread={5.5} />
      <CameraRig progressRef={progressRef} />
    </SceneCanvas>
  );
}

function HeroFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 75% 40%, rgba(61,139,255,0.16), transparent 55%), radial-gradient(circle at 30% 80%, rgba(61,139,255,0.08), transparent 50%)",
      }}
    />
  );
}
