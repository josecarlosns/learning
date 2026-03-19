import { useState } from 'react';

export function Player({ initialName, symbol, isActive, onSaveName }) {
  // edit state:
  const [editing, setEditing] = useState(false);

  function handleEditClick() {
    // If true it means the player clicked on "Save"
    if (editing) onSaveName({ symbol, newName: playerName });

    // Best practice: using functions as parameters to state changing functions
    setEditing((editing) => !editing);
  }
  // name state:
  const [playerName, setPlayerName] = useState(initialName);

  function handleChange(event) {
    const newPlayerName = event.target.value;

    setPlayerName(newPlayerName);
  }

  return (
    <li className={isActive && 'active'}>
      <span className="player">
        {editing ? (
          <input
            type="text"
            className="player-name"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{editing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
