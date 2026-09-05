"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import type * as THREE from "three";
import { ArchiveParticles } from "./ArchiveParticles";

/**
 * Hero centrepiece. Model and structure come from adrianhajdin/3d-portfolio
 * (public/models/computer-optimized-transformed.glb + Computer.jsx); the
 * lighting rig follows their HeroLights.jsx pattern, recoloured to the
 * DC Archives accent palette.
 */
type ComputerGLTF = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

function Computer() {
  const { nodes, materials } = useGLTF(
    "/models/computer-optimized-transformed.glb"
  ) as unknown as ComputerGLTF;

  return (
    <group dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_1?.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_2?.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

export function ArchiveHeroScene() {
  return (
    <>
      <ambientLight intensity={0.35} color="#8E9AAF" />
      <spotLight position={[2, 5, 6]} angle={0.35} penumbra={0.6} intensity={90} color="#FFD84A" />
      <spotLight position={[-3, 5, 5]} angle={0.4} penumbra={1} intensity={45} color="#FFE66D" />
      <pointLight position={[0, 1, 2]} intensity={12} color="#C8A93E" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.08}
      />

      <ArchiveParticles count={110} />

      <group scale={0.018} position={[0, -1.1, 0]} rotation={[0, -Math.PI / 5, 0]}>
        <Computer />
      </group>
    </>
  );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");
