"use client";

import { Suspense, useEffect, useState, type ComponentType } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useInView } from "@/lib/three/useInView";
import { hasWebGL } from "@/lib/three/hasWebGL";
import { cn } from "@/lib/utils";

interface GltfSceneFrameProps<P extends object> {
  label: string;
  readoutLeft: string;
  readoutRight: string;
  srDescription: string;
  fallbackLabel: string;
  aspect?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  shadows?: boolean;
  className?: string;
  SceneComponent: ComponentType<P>;
  sceneProps: P;
}

/**
 * Host for the GLB scenes sourced from adrianhajdin/3d-portfolio: defers
 * mounting until the panel scrolls into view, and falls back to a labelled
 * static tile when WebGL is unavailable or reduced motion is requested.
 */
export function GltfSceneFrame<P extends object>({
  label,
  readoutLeft,
  readoutRight,
  srDescription,
  fallbackLabel,
  aspect = "aspect-[4/3]",
  cameraPosition = [0, 3, 7],
  fov = 45,
  shadows = false,
  className,
  SceneComponent,
  sceneProps
}: GltfSceneFrameProps<P>) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(hasWebGL());
  }, []);

  const showScene = inView && !reducedMotion && webglSupported;

  return (
    <div ref={ref} className={className}>
      {/* The instrument frame is a genuine object — a readout panel with a
          model inside it — so it keeps its box where the surrounding record
          content does not. */}
      <div className="border border-hair bg-panel/30">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-hair px-3 py-2 font-mono text-meta uppercase">
          <span className="text-accent-muted">{label}</span>
          <span className="text-mute">{readoutLeft}</span>
        </div>
        <div className={cn("relative w-full", aspect)}>
          {showScene ? (
            <Suspense fallback={null}>
              <Canvas
                shadows={shadows}
                dpr={[1, 1.75]}
                camera={{ position: cameraPosition, fov }}
                gl={{ antialias: true }}
              >
                <SceneComponent {...sceneProps} />
              </Canvas>
            </Suspense>
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
              <span className="max-w-measure-sm font-mono text-label uppercase text-mute">{fallbackLabel}</span>
            </div>
          )}
          <span className="sr-only">{srDescription}</span>
        </div>
        <div className="border-t border-hair px-3 py-1.5 text-right font-mono text-meta uppercase text-mute">
          {readoutRight}
        </div>
      </div>
    </div>
  );
}
