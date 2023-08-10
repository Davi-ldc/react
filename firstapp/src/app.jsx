import { useState } from "react";
import Cliker from "./cliker";

export default function App(){
    const [hascliker, sethascliker] = useState(false)

    return <>
                
                <button onClick={()=>{sethascliker(!hascliker)}}>{hascliker ? 'Hide':'Show'} cliker</button>
                {hascliker ? <Cliker></Cliker> : null    }
           </>
}