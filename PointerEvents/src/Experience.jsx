import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const HandleCubeClick = (event) =>{
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`)

        console.log('---')
        console.log('distance', event.distance) // Distance between camera and hit point
        console.log('point', event.point) // Hit point coordinates (in 3D)
        console.log('uv', event.uv) // UV coordinates on the geometry (in 2D)
        console.log('object', event.object) // The object that triggered the event
        console.log('eventObject', event.eventObject) // The object that was listening to the event (useful where there is objects in objects)

        console.log('---')
        console.log('x', event.x) // 2D screen coordinates of the pointer
        console.log('y', event.y) // 2D screen coordinates of the pointer

        console.log('---')
        console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
        console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
        console.log('metaKey', event.metaKey) // If the COMMAND key was pressed
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } onPo={HandleCubeClick}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        {/* onClick -> qnd for clikado
        onContextMenu-> butão esquerdo ou pressionar no mobile
        onDoubleClick-> duble click
        onPointerDown - qnd vc segura o botão
        onPointerUp quando você solta o botão*/}

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}