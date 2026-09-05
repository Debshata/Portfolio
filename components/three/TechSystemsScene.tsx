"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/neural-network.glb";
const TARGET_SIZE = 6;

/**
 * Artificial neural network — layered neuron clusters joined by swept
 * connections. The source model ships two off-palette materials (cyan edges,
 * electric-blue nodes); both are re-authored here in the archive palette so the
 * panel reads as part of the system rather than a dropped-in asset.
 */
export function TechSystemsScene() {
  const { scene } = useGLTF(MODEL);
  const spinRef = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const root = scene.clone(true);

    const neuron = new THREE.MeshStandardMaterial({
      color: "#FFD84A",
      emissive: "#FFD84A",
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.1
    });
    const connection = new THREE.MeshStandardMaterial({
      color: "#C8A93E",
      emissive: "#C8A93E",
      emissiveIntensity: 0.12,
      roughness: 0.7,
      metalness: 0.2,
      transparent: true,
      opacity: 0.55
    });

    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      // "Sweep*" is the swept tube carrying every inter-layer connection;
      // everything else is a "Cube_<layer>_<n>" neuron.
      child.material = child.name.startsWith("Sweep") ? connection : neuron;
      child.castShadow = false;
      child.receiveShadow = false;
    });

    // Centre on the origin and normalise scale — the export is in Cinema 4D
    // units, so hard-coded numbers would not survive a model swap.
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_SIZE / Math.max(size.x, size.y, size.z);

    root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    root.scale.setScalar(scale);

    return root;
  }, [scene]);

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.14;
  });

  return (
    <>
      <ambientLight intensity={0.6} color="#8E9AAF" />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#FFD84A" />
      <directionalLight position={[-5, -2, -4]} intensity={0.9} color="#C8A93E" />
      <pointLight position={[0, 0, 3]} intensity={12} color="#FFE66D" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={(Math.PI * 4) / 5}
        enableDamping
        dampingFactor={0.08}
      />

      <group ref={spinRef} rotation={[0.12, 0, 0]}>
        <primitive object={model} />
      </group>
    </>
  );
}

useGLTF.preload(MODEL);
