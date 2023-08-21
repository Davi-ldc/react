import { useBox } from "@react-three/cannon";
import { useControls  } from 'leva'
import { useState } from "react";


export function ColliderBox({ position, scale, debug }) {

  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
}