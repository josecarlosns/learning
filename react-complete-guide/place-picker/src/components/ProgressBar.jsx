import { useEffect, useState } from "react";

const TIMER = 3000;
const INTERVAL = 10;

export default function ProgressBar({ maxTime = TIMER, updateInterval = INTERVAL }) {
  const [remainingTime, setRemainingtime] = useState(maxTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingtime((prevTime) => prevTime - updateInterval);
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [updateInterval]);

  return <progress value={remainingTime} max={TIMER} />;
}
