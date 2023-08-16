import { OrbitControls } from '@react-three/drei'
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const { perfVisible } = useControls({
        perfVisible: true
    })
    const { position, color, visible, choise } = useControls('sphere',{
        position : {
            value:{x:-2,y:0},
            joystick:'invertY',
            // min:-5,
            // max:5,
            step: 0.01,
        },
        color:'#ff0000',
        visible: true,
        interval:{
            min:0,
            max:5,
            value:[4,5]
        },
        button: button(()=>{
            console.log('fui clikado')
        }),
        choise: {
            options:['a','b','c']
        }
    })

    const { position2, color2, visible2 } = useControls('cube',{
        position2 : {
            value:{x:2,y:0},
            joystick:'invertY',
            // min:-5,
            // max:5,
            step: 0.01,
        },
        color2:'#ff0000',
        visible2: true
    })
    return <>
    
        { perfVisible && <Perf position="top-left" /> }
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position={ [position.x, position.y, 0]} visible={visible}>
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        <mesh position={ [position2.x, position2.y, 0] } scale={ 1.5 } visible={visible2}>
            <boxGeometry />
            <meshStandardMaterial color={color2}/>
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}