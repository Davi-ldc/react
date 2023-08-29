import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(performance.now() - startTime);
      }, 10); // Atualiza a cada 10 milissegundos

      return () => clearInterval(interval);
    }
  }, [isRunning, startTime]);

  const startTimer = () => {
    setStartTime(performance.now());
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider value={{ elapsedTime, isRunning, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
