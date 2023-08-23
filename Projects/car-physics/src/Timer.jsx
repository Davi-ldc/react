import { useState, useEffect, useRef } from 'react';

const TimerComponent = () => {
    const [lastRenderTime, setLastRenderTime] = useState(performance.now());
    const deltaTimeRef = useRef(0);  

}

export default TimerComponent;
