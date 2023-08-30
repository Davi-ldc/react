import React, { useState, useEffect } from 'react';
import "./index.css"
import { createRoot } from 'react-dom/client'
import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { TimerProvider, useTimer } from './TimerContext';
import { useMemo } from 'react';

function App() {
  const [countdown, setCountdown] = useState(3);
  const [startTime, setStartTime] = useState(Date.now());
  const [countdownAudio] = useState(() => new Audio('./countdown.mp3'));

  const t = useTimer()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    else {
      t.startTimer()
    }
  }, [countdown]);

  const memoizedPhysics = useMemo(() => (
    <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
      <Scene startTime={startTime} />
    </Physics>
  ), [startTime]);

  return (
    <div className="app-container">
      <Canvas>
        {memoizedPhysics}
      </Canvas>
    
    {countdown > 0 ? (
      <div className="countdown-container">
        <div className="countdown-text">{countdown}</div>
        
      </div>
    ) : (
      <div className="timer-container">
        {(t.elapsedTime / 1000).toFixed(2)}
      </div>
    )}

 


      <div className="controls">
        <p>w a s d anda</p>
        <p>setas pra girar no ar</p>
        <p>r reseta</p>
        <p>k troca a visão</p>
        <p>barra de espaço da um boost</p>
        <p>shift freia</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(  <TimerProvider>
  <App />
</TimerProvider>);
