import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
    <Canvas 
    dpr={ [1,2] }//pixel ratio
    //minimo, maximo
    gl={{
        toneMapping:THREE.ACESFilmicToneMapping,
        antialias:true,
    }}
    camera={
        {
            fov:45,
            near:0.1,
            far: 200,
            position: [0,0,3] 
        }
    }>
        <Experience />
    </Canvas>
    </>
)