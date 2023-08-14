import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
export default function CustomObject(){
    
    const geometryRef = useRef()
    useEffect(()=>{
        geometryRef.current.computeVertexNormals()
    },[])//chamada uma vez so depois do primeiro tick

    const verticesc = 100 * 3
    const positions = useMemo(()=>{//vai rodar so uma vez
        const positions = new Float32Array(verticesc *3)//3 vertices por triangulo e 3 cordenadas pra cada vertice
        for(let i = 0; i < verticesc; i++)
        {
            positions[i] = (Math.random()-0.5) * 3
        }
        return positions
    },[verticesc])//se verticesc roda dnv
    return <>
        <mesh>
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute 
                attach='attributes-position'
                count={verticesc}
                itemSize={3}
                array={positions}
                /> 
                {/* attributes-position vira geometry.attributes.position */}
            </bufferGeometry>
            <meshStandardMaterial color='orange' side={THREE.DoubleSide} />
        </mesh>
    </>
}
