import React , { useState, useEffect } from 'react'

const CountdownTimer = ({ expiryDate }) => {

    const calculateTimeLeft = () => {
        const difference = expiryDate - Date.now();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    
  return (
    <div>{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
  )
}

export default CountdownTimer