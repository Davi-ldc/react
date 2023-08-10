import { useEffect, useState } from "react"

export default function Cliker({keyName, Color='red', increment}){
    useEffect(()=>{
        console.log('nasci')
        return ()=>{
            // localStorage.removeItem(keyName)
            console.log('mori')
        }
    }, [])
    // useEffect(()=>{
    //     const savedcount = parseInt(localStorage.getItem('count')??0)
    //     // ??0 faz com que se count for null vai retornar um 0
    //     //parseint é pq o localStorage sempre salva as coisas como str
    //     setcount(savedcount)//quando o cara recaregar a pagina o numero ainda vai ser o mesmo
    // },[]) o problema aq é que agnt ta chamando setcount 2 vezes, mais so precisa chamar uma por isso mevemos o codigo 

    //const countState = useState(0)//retorna uma array com 0 e uma função
    // const count = countState[0]
    // const setcount = countState[1]

    const [count, setcount] = useState(parseInt(localStorage.getItem(keyName)??0))//retorna uma variavel que agnt pode mudar
    const buttononclik =()=>{
        setcount(count => count + 1)//a função toda vai ser chamada quando mudamos count
        // o react so vai atualizar a função
        increment()//atualiza o counter global
    }
    useEffect(() => {
        localStorage.setItem(keyName, count)
    },[count])// se você quiser que essa função for rodada so no primeiro frame manda uma array vazia
    //vai rodar sempre que count mudar

    return <div>
        <div> count: {count}</div>
        <button onClick={buttononclik} style={{backgroundColor: Color}}> clik me </button>
    </div>
}