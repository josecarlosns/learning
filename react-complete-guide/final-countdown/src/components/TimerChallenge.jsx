import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

const timerDisplay = {
  start: 'Timer is not started yet',
  running: 'Timer is running',
  stopped: 'Timer has stopped',
  expired: 'Timer has expired',
};

export default function TimerChallenge({ title, targetTime }) {
  const modalRef = useRef();
  const timerRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const [timerState, setTimerState] = useState('start');

  const targetTimeDisplay = `${targetTime} second${targetTime > 1 ? 's' : ''}`;
  const buttonDisplay =
    timerState === 'running' ? 'Stop Challenge' : 'Start Challenge';

  function handleStart() {
    setTimerState('running');
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      setTimerState('expired');
      modalRef.current.show();
    }, targetTime * 1000);
  }

  function handleStop() {
    setTimerState('stopped');
    clearTimeout(timerRef.current);
    endTimeRef.current = Date.now();
    modalRef.current.show();
  }

  let timeLeft, result;
  switch (timerState) {
    case 'expired':
      result = 'Lost';
      break;
    case 'stopped':
      result = 'Win';
      const elapsedTime = endTimeRef.current - startTimeRef.current;
      timeLeft = (targetTime * 1000 - elapsedTime) / 1000;
      break;
    default:
      result = 'TBD';
      break;
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      <ResultModal
        ref={modalRef}
        result={result}
        targetTime={targetTime}
        timeLeft={timeLeft}
      />
      <p className="challenge-time">{targetTimeDisplay}</p>
      <p>
        <button onClick={timerState === 'running' ? handleStop : handleStart}>
          {buttonDisplay}
        </button>
      </p>
      <p>{timerDisplay[timerState]}</p>
    </section>
  );
}
