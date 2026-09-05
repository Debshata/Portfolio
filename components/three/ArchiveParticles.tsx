"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Adapted from adrianhajdin/3d-portfolio — src/components/models/hero_models/
 * Particles.jsx. Recoloured to the archive accent.
 */
export function ArchiveParticles({ count = 120 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 10 + 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      spd[i] = 0.004 + Math.random() * 0.004;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame(() => {
    const geometry = mesh.current?.geometry;
    if (!geometry) return;
    const attr = geometry.attributes.position;
    if (!attr) return;
    const array = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const yIndex = i * 3 + 1;
      const next = (array[yIndex] ?? 0) - (speeds[i] ?? 0.004);
      array[yIndex] = next < -3 ? Math.random() * 10 + 4 : next;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FFD84A" size={0.045} transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}
