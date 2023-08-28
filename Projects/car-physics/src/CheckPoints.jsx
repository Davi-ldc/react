import { useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { useState, useEffect } from 'react';
import useGame from './useGame';
import { CheckPoint } from './CheckPoint';

export function CheckPoints(){
    const end = useGame((state) => state.end)
    const [checkpoints, setCheckpoints] = useState(0)
    const [time, setTime] = useState(0.0);
    const [checkpointSound] = useState(() => new Audio('./checkpoint.mp3'));
    const [lapSound] = useState(() => new Audio('./lap.mp3'));
    const [finishSound] = useState(() => new Audio('./finish.mp3'));
    const positions = [[-1,0.45,0.1], [0.98,0,-1.11], [-2,0,0], [-4.37, 0, 1.47]];
    const scale = [0.176,0.176,0.176]


    const handleCollide = ()=>{
        playCheckpointSound()
        if (checkpoints === 3){
            setCheckpoints(0)
        }
        else{
            setCheckpoints(checkpoints+1)
        }
    }

    const playCheckpointSound = () => {
        checkpointSound.volume = 0.05;
        checkpointSound.play();
      };
    
    const playLapSound = () => {
        lapSound.volume = 0.4;
        lapSound.play();
      };
    
    const playFinishSound = () => {
        finishSound.volume = 0.05;
        finishSound.play();
      };
      
      return (
        <>
          {checkpoints === 0 && (
            <CheckPoint handleCollide={handleCollide} position={positions[0]} scale={scale} />
          )}
          {checkpoints === 1 && (
            <CheckPoint handleCollide={handleCollide} position={positions[1]} scale={scale} />
          )}
          {checkpoints === 2 && (
            <CheckPoint handleCollide={handleCollide} position={positions[2]} scale={scale} />
          )}
          {checkpoints === 3 && (
            <CheckPoint handleCollide={handleCollide} position={positions[3]} scale={scale} />
          )}
        </>
      );
}