"use client";

import dynamic from "next/dynamic";
import { GltfSceneFrame } from "@/components/three/GltfSceneFrame";

const ArchiveHeroScene = dynamic(
  () => import("@/components/three/ArchiveHeroScene").then((m) => m.ArchiveHeroScene),
  { ssr: false, loading: () => null }
);

export function ArchiveHeroCanvas() {
  return (
    <GltfSceneFrame
      label="DC://ARCHIVE/TERMINAL"
      readoutLeft="FIG. 00 — WORKSTATION"
      readoutRight="DRAG TO ORBIT"
      aspect="aspect-square"
      cameraPosition={[0, 1.2, 6]}
      fov={45}
      fallbackLabel="Archive workstation — 3D view unavailable"
      srDescription="Interactive 3D model of the archive workstation: a desk terminal with drifting data particles."
      SceneComponent={ArchiveHeroScene}
      sceneProps={{}}
    />
  );
}
