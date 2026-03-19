import { useEffect, useState } from "react";

export default function QuestionTimer({
  maxValue = 10000,
  initialValue = 0,
  stepValue = 100,
  onExpire = () => {},
  decreasing = false,
  active = true
}) {
  const [currentValue, setCurrentValue] = useState(decreasing ? maxValue : initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      if (active)
        setCurrentValue((prevValue) => {
          if (decreasing) {
            if (prevValue <= 0) {
              clearInterval(timer);
              onExpire();
              return 0;
            }

            return prevValue - stepValue;
          } else {
            if (prevValue >= maxValue) {
              clearInterval(timer);
              onExpire();
              return maxValue;
            }

            return prevValue + stepValue;
          }
        });
    }, stepValue);

    return () => {
      clearInterval(timer);
    };
  }, [maxValue, decreasing, active, stepValue, onExpire]);

  return <progress id="question-time" max={maxValue} value={currentValue} />;
}
