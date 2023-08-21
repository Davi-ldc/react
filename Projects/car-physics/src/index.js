import "./index.css"
import {createRoot} from 'react-dom/client'
import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

createRoot(document.getElementById('root')).render(
  <>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0,-2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>

    <div class="controls">
      <p>w a s d anda</p>
      <p>q freia</p>
      <p>r reseta</p>
      <p>k troca a visão</p>
  
    </div>
  </>
)
