import { useBox } from "@react-three/cannon";

export function CheckPoint({ handleCollide, position, scale }) {

    const [ ref, api ] = useBox(() => ({
      args: scale,
      position,
      type: 'Static',
      collisionResponse: false,
      onCollide: handleCollide,
    }));

    
    return (
      <mesh position={position} scale={scale}>
        <boxGeometry />
        <meshBasicMaterial color={'#0000ff'} />
      </mesh>
    );
  }