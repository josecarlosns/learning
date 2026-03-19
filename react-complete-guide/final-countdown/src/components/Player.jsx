import { useRef, useState } from 'react';

export default function Player() {
  const [playerName, setPlayerName] = useState();
  const playerNameInput = useRef();

  const greeting = `Welcome ${playerName && playerName.length > 0 ? playerName : 'unknown entity'}!`;

  function handleClick() {
    const { value } = playerNameInput.current;

    setPlayerName(value.trim());
  }

  return (
    <section id="player">
      <h2>{greeting}</h2>
      <p>
        <input ref={playerNameInput} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
