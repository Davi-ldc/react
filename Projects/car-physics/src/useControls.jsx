import { useEffect, useState } from "react";

export function useControls(vehicleApi, chassisApi){//
    let [controls, setControls] = useState({})

    useEffect(() => {
        const keyDownPressHandler = (e) => {
          setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
        }//retorna uma copia do objeto só que a tecla.lower() precionada vai ser setada pra true

    
        const keyUpPressHandler = (e) => {
          setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
        }//retorna um copia do objeto mais a tecla q deixou de ser pressionada vira false
      
        window.addEventListener("keydown", keyDownPressHandler);
        window.addEventListener("keyup", keyUpPressHandler);
        return () => {
          window.removeEventListener("keydown", keyDownPressHandler);
          window.removeEventListener("keyup", keyUpPressHandler);
        }
      }, []);//evento que atualiza o objeto
    

    
      useEffect(() => {
        if(!vehicleApi || !chassisApi) return;
    
        if (controls.w) {
          vehicleApi.applyEngineForce(75, 2);
          vehicleApi.applyEngineForce(75, 3);
        } else if (controls.s) {
          vehicleApi.applyEngineForce(-75, 2);
          vehicleApi.applyEngineForce(-75, 3);
        } else {
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
    
        if (controls.a) {
          vehicleApi.setSteeringValue(0.35, 2);
          vehicleApi.setSteeringValue(0.35, 3);
          vehicleApi.setSteeringValue(-0.1, 0);
          vehicleApi.setSteeringValue(-0.1, 1);
        } else if (controls.d) {
          vehicleApi.setSteeringValue(-0.35, 2);
          vehicleApi.setSteeringValue(-0.35, 3);
          vehicleApi.setSteeringValue(0.1, 0);
          vehicleApi.setSteeringValue(0.1, 1);
        } else {
          for(let i = 0; i < 4; i++) {
            vehicleApi.setSteeringValue(0, i);
          }
        }
    
    
        if (controls.r) {
          chassisApi.position.set(-1.5, 0.5, 3);
          chassisApi.velocity.set(0, 0, 0);
          chassisApi.angularVelocity.set(0, 0, 0);
          chassisApi.rotation.set(0, 0, 0);
        }
      }, [controls, vehicleApi, chassisApi]);


    return controls
}