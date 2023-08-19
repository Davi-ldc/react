import Model from './Model.jsx'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import CaixaDeCarregamento from './caicaDeCarregamento.jsx'
import { useControls } from 'leva'
import Fox from './fox.jsx'

export default function Experience()
{
    const { bias } = useControls({
        bias:
        {
            value: 0.04,
            min: 0,
            max: 0.3,
            step: 0.001
        }
    })
    return <>
        {/* suspense faz com que o model seja carregado de forma assincrona */}
        {/* <Suspense
            fallback={ <CaixaDeCarregamento position-y={ 0.5 } scale={ [ 2, 3, 2 ]} /> }
        >
            <Model scale={0.5}/>
        </Suspense> */}
        {/* fallback é oq aparece enquanto ele ta carregando */}

        <Fox />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias={ bias } />
        <ambientLight intensity={ 1 } />

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}