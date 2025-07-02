
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiresInHours }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate end time
    const endTime = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresInHours]);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span className="text-red-600 font-semibold">Expired</span>;
  }

  return (
    <span className="font-mono">
      Expires in {timeLeft.hours > 0 && `${timeLeft.hours}h `}
      {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
    </span>
  );
};

export default CountdownTimer;
