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
    

    
    useEffect(()=>{
        if (controls.w) {
            vehicleApi.applyEngineForce(100, 2);//100 é a força 2 é a roda
            vehicleApi.applyEngineForce(100, 3);
          } else if (controls.s) {
            vehicleApi.applyEngineForce(-100, 2);
            vehicleApi.applyEngineForce(-100, 3);
          } else {//volta a força pra 0
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
          }

          if (controls.a) {
            vehicleApi.setSteeringValue(0.35, 2);//muda a direção da roda da frente
            vehicleApi.setSteeringValue(0.35, 3);
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);//muda a direção da roda de traz pro carro "virar mais rapido"
          } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.35, 2);
            vehicleApi.setSteeringValue(-0.35, 3);
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
          } else {
            for(let i = 0; i < 4; i++) {//se nada for precionado então pra cada roda a direção dela vai ser 0 (pra frente)
              vehicleApi.setSteeringValue(0, i);
            }
          }
      
    })


    return controls
}