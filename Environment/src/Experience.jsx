import { useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, ContactShadows,Sky, Lightformer, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { useControls} from 'leva'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    const light = useRef()
    const sky = useRef()


    // const { focus, size, samples } = useControls('SoftShadows',{
    //     focus : {
    //         value:0,
    //         min:0,
    //         max:5,
    //         step: 1,
    //     },
    //     size : {
    //         value:25,
    //         min:0,
    //         max:100,
    //         step: 1,
    //     },
    //     samples : {
    //         value:10,
    //         min:0,
    //         max:30,
    //         step: 1,
    //     },
    // })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#000000',
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 },
    })

    // const { sunPosition } = useControls('sky', {
    //     sunPosition: { value: [ 1, 2, 3 ] }
    // })


    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value: 7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 }
    })

    useHelper(light, THREE.DirectionalLightHelper,1, '#ff0000')
    //1 é o tamanho

    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
        // cube.current.position.x = 2+Math.sin(state.clock.elapsedTime)

    })

    return <>
        {/* <SoftShadows  size={ size } samples={ samples } focus={focus} /> */}
        <color args={ [ 'ivory' ] } attach='background' />

        <Perf position="top-left" />
        {/* <Sky ref={sky} sunPosition={ sunPosition } /> */}

        <OrbitControls makeDefault />

        <Environment 
            background
            preset='sunset'
            ground={ {
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            } }
        
        >
            <color args={ [ 'black' ] } attach="background" />
            <mesh position-z={-5} scale={10}>
                <Lightformer
                    position-z={ - 5 }
                    scale={ 10 }
                    color="red"
                    intensity={ 3 }
                    // form='ring'
                />
            </mesh>
        </Environment>

        {/* <directionalLight
            position={ sunPosition }
            intensity={ 1.5 }
            ref={light}
            castShadow
            shadow-mapSize={[2048,2048]}
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ - 5 }
            shadow-camera-left={ - 5 }
            /> */}
        {/* <ambientLight intensity={ 0.5 } /> */}

        <mesh position-x={ - 2 } position-y={1} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>
        
        <mesh ref={ cube } position-x={ 2 } position-y={1} scale={ 1.5 } castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity}/>
        </mesh>

        {/* <AccumulativeShadows 
            position={[0, -0.99, 0]}
            scale={10}
            color="#316d39"
            opacity={ 0.8 }
            frames={ Infinity }
            blend={100}
            temporal>
            <RandomizedLight
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 1 }
                position={ [ 1, 2, 3 ] }
                bias={ 0.001 }
            />
        </AccumulativeShadows> */}

        <ContactShadows
            position={ [ 0, - 0.99, 0 ] }
            scale={ 10 }
            resolution={ 512 }
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
        />
        {/* <mesh position-y={ -0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh> */}

    </>
}