import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const donutsGroup = useRef()
    useEffect(() =>
    {
        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
    //id e tamanho, ide vem desse repo
    //https://github.com/emmelleppi/matcaps

    useFrame((state, delta) =>
    {
        for(const donut of donutsGroup.current.children)
        {
            donut.rotation.y += delta * 0.2
        }
    })  
    

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />


        <group ref={donutsGroup}>
        { [...Array(100)].map((value, index) =>
            <mesh
                key={ index }
                geometry={ torusGeometry }
                material={ material }
                position={ [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ] }
                scale={ 0.2 + Math.random() * 0.2 }
                rotation={ [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ] }
            />
        ) }
        </group>
        
        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                TEXTO EM 3D
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
        </Center>

    </>
}