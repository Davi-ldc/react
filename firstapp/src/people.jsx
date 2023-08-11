import { useEffect, useState } from 'react'

export default function People()
{
    const [ people, setPeople ] = useState([])

    

    const getPeople = async ()=>{//com o async se agnt escrever awaut antes da resquete o js vai esperar a resqueste rodar pra ver o json dela e enquanto agnt espera a resposta tudo continua funcionando normal
        // const request = fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => response.json())//depois q mandar a resquet
        // .then(result => console.log(result))//dps q abrir o json

        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)
        console.log(result)
    }

    useEffect(()=>{
        getPeople()
    })

    return <div>
        <h2>People</h2>

        <ul>
            { people.map(person => 
                <li key={ person.id }>{ person.name }</li>
            ) }
        </ul>
     </div>
}