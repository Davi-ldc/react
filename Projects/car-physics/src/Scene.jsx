import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";
import { CheckPoints } from "./CheckPoints";
import { Perf } from 'r3f-perf'
import useGame from './useGame'


export function Scene() {

  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-6/2, 3.9/2, 6.21/2]);
  const state = useGame((state) => state)
  console.log(state)



  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "k") {
        // random is necessary to trigger a state change
        if(thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson); 
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />
      <Perf position="top-left" logsPerSecond={5}/>
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && (
        <OrbitControls target={[-2.64/2, -0.71/2, 0.03/2]} />
      )}
      <Ground />
      <Track />
      <Car thirdPerson={thirdPerson} />
      <CheckPoints />
    </Suspense>
  );
}