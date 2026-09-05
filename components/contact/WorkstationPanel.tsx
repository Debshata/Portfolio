"use client";

import dynamic from "next/dynamic";
import { GltfSceneFrame } from "@/components/three/GltfSceneFrame";

const WorkstationScene = dynamic(
  () => import("@/components/three/WorkstationScene").then((m) => m.WorkstationScene),
  { ssr: false, loading: () => null }
);

export function WorkstationPanel() {
  return (
    <GltfSceneFrame
      label="Research Workstation"
      readoutLeft="STATION // ONLINE"
      readoutRight="DRAG TO ORBIT"
      aspect="aspect-[4/3]"
      cameraPosition={[0, 3, 7]}
      fov={45}
      shadows
      fallbackLabel="Research workstation — 3D model unavailable"
      srDescription="Interactive 3D model of a desk workstation representing the research terminal this portfolio is built around."
      SceneComponent={WorkstationScene}
      sceneProps={{}}
    />
  );
}
