"use client";

import dynamic from "next/dynamic";
import { GltfSceneFrame } from "@/components/three/GltfSceneFrame";

const TechSystemsScene = dynamic(
  () => import("@/components/three/TechSystemsScene").then((m) => m.TechSystemsScene),
  { ssr: false, loading: () => null }
);

export function TechSystemsPanel() {
  return (
    <GltfSceneFrame
      label="DC://ARCHIVE/NEURAL-NET"
      readoutLeft="FIG. 04 — ARTIFICIAL NEURAL NETWORK"
      readoutRight="DRAG TO ORBIT"
      aspect="aspect-[16/10]"
      cameraPosition={[0, 0.4, 6.4]}
      fov={45}
      fallbackLabel="Artificial neural network — 3D view unavailable"
      srDescription="Interactive 3D model of an artificial neural network: layers of neuron nodes joined by weighted connections, rendered in the archive palette. Drag to orbit."
      SceneComponent={TechSystemsScene}
      sceneProps={{}}
    />
  );
}
