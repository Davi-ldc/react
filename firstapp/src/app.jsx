import { useEffect, useMemo, useState } from "react";
import Cliker from "./cliker";
import People from "./people";

export default function App({ClikerCount, children}){
    const [hascliker, sethascliker] = useState(false)
    const [count, setcount] = useState(parseInt(localStorage.getItem('globalc')??0))

    useEffect(() => {
        localStorage.setItem('globalc', count)
    },[count])

    const increment = ()=>{
        setcount(count=> count + 1)
    }

    const colors = useMemo(()=>{
        const color = []
        for (let i =1; i<ClikerCount; i++){
            color.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)
        }
        return color
    },[ClikerCount])//sempre que a variavel dentro da array mudar agnt muda colors, se n tiver nada nelas colors sempre vai ser igual

    //const temparray = [...Array(ClikerCount)]//... retorna o valor de Array(com o tamnho clikercount)
    return <>
                {children}
                <div>Total count: {count}</div>
                <button onClick={()=>{sethascliker(!hascliker)}}>{hascliker ? 'Hide':'Show'} cliker</button>
                {hascliker ? [...Array(ClikerCount)].map((value,index)=>{
                    return <Cliker 
                    key={index}
                    increment={increment} 
                    keyName= {`count${index}`}
                    Color={colors[index]}
                     />
                }) : null}
                <People />                
           </>
}