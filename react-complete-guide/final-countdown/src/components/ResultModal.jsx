import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ResultModal({ result, targetTime, timeLeft, ref }) {
  const dialogRef = useRef();

  let score = 0;
  if (result === 'Win') score = (1 - timeLeft / targetTime) * 100;

  useImperativeHandle(ref, () => {
    return {
      show() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef} className="result-modal">
      {result === 'Lost' ? (
        <h2>You {result}</h2>
      ) : (
        <>
          <h2>
            Your Score is <strong>{score.toFixed(1)}%</strong>
          </h2>
          <p>
            You stopped the timer with <strong>{timeLeft} seconds left</strong>
          </p>
        </>
      )}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal'),
  );
}
