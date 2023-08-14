import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.jsx'
// import {Custom} from './object'
extend({ OrbitControls })

export default function Experience(){
    const three = useThree()

    const group = useRef()
    const cube = useRef()
    const sphere = useRef()
    const plane = useRef()

    useFrame((state, delta)=>{//equivalente a função animate/tick
        cube.current.rotation.y += delta

        // state.camera.position.x = Math.cos(state.clock.elapsedTime)*3
        // state.camera.position.z = Math.sin(state.clock.elapsedTime)*3
        // state.camera.lookAt(0,0,0)
    })
    return <>
        <CustomObject />
        <orbitControls args={[three.camera, three.gl.domElement]} />
        <directionalLight />
        <ambientLight intensity={0.5} />
        <group ref={group}>
            <mesh ref={sphere}scale={1} rotation={[0,0,0]} position={[-2,0,0]}>
                <sphereGeometry args={[1.5,32,32]} />
                <meshStandardMaterial color='red' />
            </mesh>
            <mesh ref={cube}scale={1} position={[2,0,0]}>
                <boxGeometry args={[1.5,1.5,1.5]} />
                <meshStandardMaterial color='purple' />
            </mesh>
            <mesh ref={plane}position-y={-2} rotation={[-Math.PI*0.5,0,0]} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow' />
            </mesh>
        </group>

    </>
}