"use client";

import { useRef } from "react";
import { NetworkGlobe } from "./NetworkGlobe";
import { Particles } from "./Particles";
import { SceneCanvas } from "./SceneCanvas";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { getSceneQuality } from "@/lib/three/quality";

/**
 * Standalone globe for the Global Collaboration section. Pointer position
 * within the host element drives a subtle tilt; otherwise it rotates on
 * its own — a representation of global connectivity, not real client data.
 */
export function GlobalNetworkScene({ className }: { className?: string }) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const quality = getSceneQuality(isMobile);

  return (
    <div
      className={className}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointerRef.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      }}
    >
      <SceneCanvas
        className="h-full w-full"
        cameraPosition={[0, 0, 4.6]}
        fov={45}
        fallback={<GlobalFallback />}
      >
        <fog attach="fog" args={["#07111f", 3.5, 8]} />
        <NetworkGlobe
          radius={1.9}
          nodeCount={quality.nodeCount}
          connectionCount={quality.connectionCount}
          wireframeDetail={quality.wireframeDetail}
          autoRotateSpeed={0.05}
          pointerInfluence={0.25}
          pointerRef={pointerRef}
        />
        <Particles count={Math.round(quality.particleCount * 0.6)} spread={4.5} />
      </SceneCanvas>
    </div>
  );
}

function GlobalFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(61,139,255,0.18), transparent 60%)",
      }}
    />
  );
}
