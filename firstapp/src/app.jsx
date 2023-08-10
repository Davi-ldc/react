import { useEffect, useState } from "react";
import Cliker from "./cliker";

export default function App({children}){
    const [hascliker, sethascliker] = useState(false)
    const [count, setcount] = useState(parseInt(localStorage.getItem('globalc')??0))

    useEffect(() => {
        localStorage.setItem('globalc', count)
    },[count])

    const increment = ()=>{
        setcount(count=> count + 1)
    }
    return <>
                {children}
                <div>Total count: {count}</div>
                <button onClick={()=>{sethascliker(!hascliker)}}>{hascliker ? 'Hide':'Show'} cliker</button>
                {hascliker ? <><Cliker increment={increment} keyName='countA' Color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } /><Cliker increment={increment} keyName='countB' Color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } /><Cliker increment={increment} keyName='countC' Color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } /></> : null}
                
           </>
}