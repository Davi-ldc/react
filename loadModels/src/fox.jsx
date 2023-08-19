import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Fox(){

    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    console.log(animations)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() =>
    {
        const action = animations.actions[animationName]
        action.play()
        action        
        .reset()//resta a animação
        .fadeIn(0.5)//suaviliza a transição
        .play()


        return () =>
        {
            action.fadeOut(0.5)
        }
    }, [animationName ])
    
    return <>

            <primitive
            object={ fox.scene }
            scale={ 0.02 }
            position={ [ 0, -1, 0 ] }
            // rotation-y={ 0.3 }
            />
    </>
}