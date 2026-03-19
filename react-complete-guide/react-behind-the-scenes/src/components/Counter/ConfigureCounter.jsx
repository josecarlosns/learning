import { useState } from "react";
import { log } from "../../log";

export default function ConfigureCounter({ onSetNumber, initialNumber = 0 }) {
  log("<ConfigureCounter />", 1);

  const [enteredNumber, setEnteredNumber] = useState(initialNumber);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleOnClick() {
    onSetNumber({ number: enteredNumber });
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleOnClick}>Set</button>
    </section>
  );
}
