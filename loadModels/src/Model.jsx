// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { useGLTF, Clone } from '@react-three/drei'

//CORAÇÂO PISCA PISCA NEON ESTRELHINA nessa ferramenta
//https://gltf.pmnd.rs/ 

// export default function Model(){
//     // const model = useLoader(GLTFLoader, './hamburger.glb')
//     // console.log(model)

//     // const model = useLoader(
//     //     GLTFLoader,
//     //     './hamburger.glb',
//     //     (loader) =>
//     //     {
//     //         const dracoLoader = new DRACOLoader()
//     //         dracoLoader.setDecoderPath('./draco/')
//     //         loader.setDRACOLoader(dracoLoader)
//     //     }
//     // )

//     // const model = useGLTF('./hamburger.glb')
//     const model = useGLTF('./hamburger-draco.glb')


//     return <>
//         <Clone object={ model.scene } scale={ 0.35 } position-x={ - 4 } />
//         <Clone object={ model.scene } scale={ 0.35 } position-x={ 0 } />
//         <Clone object={ model.scene } scale={ 0.35 } position-x={ 4 } />
//     </>
//     // clone vai criar outros meches mais é baseado no msm material e geometria
// }
// useGLTF.preload('./hamburger-draco.glb') //o modelo vai cmc a carregar mesmo antes de gnt chamar <model /> na experience
// //nesse caso ele vai cmc a carregar msm se agnt n chamar ele na experience

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/hamburger.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.82, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, 1.77, 0]}
      />
    </group>
  );
}

useGLTF.preload("/hamburger.glb");