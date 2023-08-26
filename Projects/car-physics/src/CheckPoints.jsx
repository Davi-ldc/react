import { useState } from 'react'
import { useBox } from '@react-three/cannon';

export function CheckPoints(){
    const [checkpoints, setcheckpoints] = useState(0)
    const colisões = []

    const positions = [[-1,0.45,0.1], [0.98,0,-1.11], [-2,0,0], [-4.37, 0, 1.47]];
    const scale = [0.176,0.176,0.176]


    return <> 
        {checkpoints === 0 &&(
            <mesh position={positions[0]} scale={scale}>
                <boxGeometry />
                <meshBasicMaterial color={"#0000ff"}  />
            </mesh>)
        }
        {checkpoints === 1 &&(
            <mesh position={positions[1]} scale={scale}>
                <boxGeometry />
                <meshBasicMaterial color={"#0000ff"}  />
            </mesh>)
        }
        {checkpoints === 2 &&(
            <mesh position={positions[2]} scale={scale}>
                <boxGeometry />
                <meshBasicMaterial color={"#0000ff"}  />
            </mesh>)
        }        
        {checkpoints === 3 &&(
            <mesh position={positions[3]} scale={scale}>
                <boxGeometry />
                <meshBasicMaterial color={"#0000ff"}  />
            </mesh>)
        }
    </>
}


