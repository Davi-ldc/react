import { useEffect, useState } from "react";

export function useControls(vehicleApi, chassisApi, engineForce){//
    let [controls, setControls] = useState({})

    const [q, setIsQPressed] = useState(false);
    useEffect(() => {

        const keyDownPressHandler = (e) => {
          if (e.key.toLowerCase() === "q") {
            setIsQPressed(true);
          } else {
            setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
          }//retorna uma copia do objeto só que a tecla.lower() precionada vai ser setada pra true
        };

        const keyUpPressHandler = (e) => {
          if (e.key.toLowerCase() === "q") {
            console.log('oi')
            setIsQPressed(false);
          } else {
            setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
          }
        };

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
          vehicleApi.applyEngineForce(engineForce, 2);
          vehicleApi.applyEngineForce(engineForce, 3);
        } else if (controls.s) {
          vehicleApi.applyEngineForce(-engineForce, 2);
          vehicleApi.applyEngineForce(-engineForce, 3);
        } else {
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }

        if (q) {
          const brakeForce = 5;
          for (let i = 0; i < 4; i++) {
            setTimeout(() => {
              vehicleApi.setBrake(brakeForce, i);
            }, 10 * i); // Ajuste o valor do timeout conforme necessário
          }
        } else {
          for (let i = 0; i < 4; i++) {
            vehicleApi.setBrake(0, i);
          }
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
      }, [controls, vehicleApi, chassisApi, q]);


    return controls
}