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
import { useFrame } from "@react-three/fiber";

export function Scene(startTime) {
  // useFrame(()=>{console.log((Date.now() - Time)/1000)})
  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-6/2, 3.9/2, 6.21/2]);


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
      <Car thirdPerson={thirdPerson} time={startTime} />
      <CheckPoints startTime={startTime}/>
    </Suspense>
  );
}