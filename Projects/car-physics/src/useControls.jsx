import { useFrame } from "@react-three/fiber";
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

    if (shift) {
      const brakeForce = 1;
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

    if (controls[" "] ) {
      vehicleApi.applyEngineForce(80, 1);
      vehicleApi.applyEngineForce(80, 0);
    }
    else
    {
      vehicleApi.applyEngineForce(0, 1);
      vehicleApi.applyEngineForce(0, 0);
    }

    if (controls.arrowdown)  chassisApi.applyLocalImpulse([0, -0.4, 0], [0, 0, +1]);
    if (controls.arrowup)    chassisApi.applyLocalImpulse([0, -0.4, 0], [0, 0, -1]);
    if (controls.arrowleft)  chassisApi.applyLocalImpulse([0, -0.4, 0], [-0.5, 0, 0]);
    if (controls.arrowright) chassisApi.applyLocalImpulse([0, -0.4, 0], [+0.5, 0, 0]);

    if (controls.r) {
      chassisApi.position.set(-1.05, 0.5, 1.8);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi, shift]);

  return controls;
}
