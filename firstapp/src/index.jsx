
import App from './app'
import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
<div>
        {/* so pode ter um cara aqui: e tudo que você abre tem que fecher */}
        {/* <br> não funciona tem que ser <br></br> */}
        <h1 className='nome' style={
            {
                color: 'blue',
                backgroundColor: 'red'
            }
            }>Hello React</h1>
        <p className='paragrafo'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil mollitia aliquid optio magni quod, <br></br>commodi error aspernatur est obcaecati non, sint quam molestiae voluptatum, blanditiis eaque pariatur libero architecto? Asperiores?</p>
        <App></App>
    </div>
)
