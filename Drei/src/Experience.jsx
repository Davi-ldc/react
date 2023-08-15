import { useThree, extend } from '@react-three/fiber'
import { OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    const sphere = useRef()

    return <>
        <OrbitControls enableDamping={true} makeDefault/> 
        {/* makeDefault faz com que os helpers do drei saibam q esse é o controlhe padrão 
        de camera. Ai qnd vc mecher no helper que muda a posição do cubo não vai mecher a
        camera */}
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls 
        depthTest={false} 
        anchor={[0,0,0]}//posição em relação ao centro do objeto (0,0,0) é o centro
        lineWidth={ 6 }//"gordura" das linhas
        axisColors={ [ '#9381ff', '#ff4d6d', '#7ae582' ] }//cores 
        scale={ 1}
        //fixed={true}//fica sempre no mesmo tamanho normalmente qnd vc vai pra longe o tamanho dele diminue
        >
        {/* depthTest faz com que ele ignore perspectiva e fique por cima das coisas */}
            <mesh position-x={ - 2 } ref={sphere}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </PivotControls>
        <mesh position-x={ 2 } scale={ 1.5 } ref={cube}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
            <Html position={[1,1,0]} wrapperClass='label' center distanceFactor={6} occlude={[cube,sphere]}>to no centro</Html>
            {/* position é em relação ao centro da esfera 
            wrapperClass=nome da classe (pra acessar no css)
            center é pra o texto rotacionar em volta do centro do cubo
            distanceFactor é o tanto que ele diminue qnd vc vai pra longe
            occlude é pra ele n aparecer se tiver atraz de alguma coisa*/}
        </mesh>
        <TransformControls object={cube} />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial 
            color="greenyellow"
            resolution={1024} 
            // blur={ [ 1000, 1000 ] }
            // mixBlur={ 1 }
            mirror={0.75}
            />
            {/* reflete as coisas e so funciona em planos
            mixblur é o quão desfocado ta a reflexão
            e mirror vai de 0 a um sendo 1 um reflexo perfeito da cena e 0 não reflete quase nada*/}
        </mesh>
        
        <Float speed={5}>{/*da a impressão de que o texto ta flutuando  */}
            <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={2} 
            color='salmon'
            position={[0,2,-2]}
            maxWidth={10}
            textAlign='center'
            /* maxWidth é o maximo de largura que o texto pode ter sem ter quebra de linha*/
            >
                R3F é FODA
                <meshNormalMaterial side={THREE.DoubleSide} />
                {/* n tem poblema não fornecer material */}
            </Text>
        </Float>

        {/* <Html>oi</Html> */}
        {/* um texto em 2d que ta sempre na mesma posição (3d) */}

    </>
}