import { useState, useEffect } from "react";

export default function Time({ clockFontColor }) {

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    function addTrailingZero(value) {
      return (value < 10) ? "0" + value : value;
    }

    useEffect(() => {
        const date = new Date();
        setHours(addTrailingZero(date.getHours()));
        setMinutes(addTrailingZero(date.getMinutes()));
        setSeconds(addTrailingZero(date.getSeconds()));

        const interval = setInterval(()=> {
            const date = new Date();
            setHours(addTrailingZero(date.getHours()));
            setMinutes(addTrailingZero(date.getMinutes()));
            setSeconds(addTrailingZero(date.getSeconds()));
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
      
      <div className="time" style={{ color: clockFontColor }}>
        <span class="time-hour">{hours}</span>
        <span class="time-separator">:</span>
        <span class="time-minute">{minutes}</span>
        <span class="time-separator">:</span>
        <span class="time-seconds">{seconds}</span>    
      </div>
    );
  }
  
