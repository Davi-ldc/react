import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useWheels } from "./useWhells";
// import { useControls } from "./useControls";
// import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useControls } from "./useCrontrols";

export function Car({ thirdPerson }) {
   
    let mesh = useLoader(
      GLTFLoader,
      process.env.PUBLIC_URL + "/models/car.glb"
    ).scene;

    
  const position = [-1.5, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;

    const chassisBodyArgs = [width, height, front * 2];
    const [chassisBody, chassisApi] = useBox(
      () => ({
        allowSleep: false,
        args: chassisBodyArgs,
        mass: 150,
        position,
      }),
      useRef(null),
    );

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)


    const [vehicle, vehicleApi] = useRaycastVehicle(//monta toda a logica do carro com base nos nossos parametros
      () => ({
        chassisBody,
        wheelInfos,
        wheels,
      }),
      useRef(null),
    );

    useControls(vehicleApi, chassisApi)

    useEffect(() => {
        mesh.scale.set(0.0012, 0.0012, 0.0012);
        mesh.children[0].position.set(-365, -18, -67);
      }, [mesh]);

    return (
      <group ref={vehicle} name="vehicle">
        {/* grupo que recebe forças fisicas como repulsão, velocidade... */}
        <mesh ref={chassisBody}>
          <meshBasicMaterial transparent={true} opacity={0.3} />
          <boxGeometry args={chassisBodyArgs} />
        </mesh>

        <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />

      </group>
    )
}