import { useEffect, useState } from "react";
import * as THREE from 'three'
import { Quaternion, Vector3 } from "three";

export function useControls(vehicleApi, chassisApi, engineForce) {
  const [controls, setControls] = useState({});
  const [shift, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      if (e.key.toLowerCase() === "shift") {
        setIsShiftPressed(true);
      } else {
        setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
      }
    };

    const keyUpPressHandler = (e) => {
      if (e.key.toLowerCase() === "shift") {
        setIsShiftPressed(false);
      } else {
        setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
      }
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    const modifiedEngineForce = engineForce;

    if (controls.w) {
      vehicleApi.applyEngineForce(modifiedEngineForce, 2);
      vehicleApi.applyEngineForce(modifiedEngineForce, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-engineForce, 2);
      vehicleApi.applyEngineForce(-engineForce, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (shift) {
      const brakeForce = 4;
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          vehicleApi.setBrake(brakeForce, i);
        }, 30 * i);
      }
    } else {
      for (let i = 0; i < 2; i++) {
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
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.n) {
      chassisApi.velocity.set(0,0,-2.5);
    }
    else
    {
    }

    if (controls.q) {
      const brakeForce = 5;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          vehicleApi.setBrake(brakeForce, i);
          }, 10 * i); 
        }
      } else {
          for (let i = 0; i < 4; i++) {
            vehicleApi.setBrake(0, i);
          }
        }

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi, shift]);

  return controls;
}
