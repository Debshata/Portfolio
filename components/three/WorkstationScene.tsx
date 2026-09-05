"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import type * as THREE from "three";

/**
 * Adapted from adrianhajdin/3d-portfolio — src/components/models/contact/
 * Computer.jsx + ContactExperience.jsx. The computer GLB is that repo's asset;
 * only the lighting and ground plane are retuned to the navy/yellow palette.
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

export function WorkstationScene() {
  return (
    <>
      <ambientLight intensity={0.5} color="#eaf0f6" />
      <directionalLight position={[5, 5, 3]} intensity={2.2} color="#FFD966" />
      <directionalLight position={[5, 9, 1]} castShadow intensity={2.2} color="#F4C542" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <mesh receiveShadow position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#06213D" />
      </mesh>

      <group scale={0.03} position={[0, -1.49, -2]}>
        <Computer />
      </group>
    </>
  );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");
