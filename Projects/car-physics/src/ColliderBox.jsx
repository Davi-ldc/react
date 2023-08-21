import { useBox } from "@react-three/cannon";
import { Leva } from 'leva'
const debug = true;

export function ColliderBox({ position, scale }) {
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