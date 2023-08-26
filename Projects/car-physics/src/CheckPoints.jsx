import { useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { useState, useEffect } from 'react';

export function CheckPoints(){
    const [checkpoints, setcheckpoints] = useState(0)
    const [time, setTime] = useState(0);
    const [checkpointSound] = useState(() => new Audio('./checkpoint.mp3'));
    const [lapSound] = useState(() => new Audio('./lap.mp3'));
    const [finishSound] = useState(() => new Audio('./finish.mp3'));
    const colisões = []

    const positions = [[-1,0.45,0.1], [0.98,0,-1.11], [-2,0,0], [-4.37, 0, 1.47]];
    const scale = [0.176,0.176,0.176]

    useEffect(() => {
        const interval = setInterval(() => {
          setTime((prevTime) => prevTime + 0.01); // Increment time by 0.01 seconds
        }, 10); // Update every 10 milliseconds (0.01 seconds)
    
        return () => {
          clearInterval(interval);
        };
      }, []);
      
    return <> 
        <Html>
            <div className="time">{time.toFixed(2)}</div>
        </Html>
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