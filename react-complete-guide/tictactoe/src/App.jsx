import { useState } from 'react';

import GameBoard from './components/GameBoard';
import { Log } from './components/Log';
import { Player } from './components/Player';
import { WINNING_CONDITIONS } from './data/winning-conditions';
import { GameOver } from './components/GameOver';

const DEFAULT_PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function getBoard({ turns }) {
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  turns.forEach((turn) => {
    const {
      cell: { rowIndex, colIndex },
      player,
    } = turn;

    board[rowIndex][colIndex] = player;
  });

  return board;
}

function checkWinner({ board }) {
  for (const condition of WINNING_CONDITIONS) {
    const cellOne = board[condition[0][0]][condition[0][1]];
    const cellTwo = board[condition[1][0]][condition[1][1]];
    const cellThree = board[condition[2][0]][condition[2][1]];

    if (cellOne && cellOne === cellTwo && cellTwo === cellThree) return cellOne;
  }
  return false;
}

function getActivePlayer({ turns }) {
  let activePlayer = 'X';
  if (turns && turns.length > 0 && turns[0].player === 'X') activePlayer = 'O';

  return activePlayer;
}

function App() {
  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState(DEFAULT_PLAYERS);

  const activePlayer = getActivePlayer({ turns });

  const board = getBoard({ turns });
  const isDraw = turns.length === 9 && !winner;
  let winner;
  if (!isDraw) winner = checkWinner({ board });

  function handleSelectSquare({ rowIndex, colIndex }) {
    setTurns((prevTurns) => {
      const player = getActivePlayer({ turns: prevTurns });

      const updatedTurns = [
        {
          cell: { rowIndex, colIndex },
          player,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setTurns([]);
  }

  function handlePlayerNameChange({ symbol, newName }) {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players['X']}
            symbol="X"
            isActive={activePlayer === 'X'}
            onSaveName={handlePlayerNameChange}
          />
          <Player
            initialName={players['O']}
            symbol="O"
            isActive={activePlayer === 'O'}
            onSaveName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver
            winner={players[winner]}
            isDraw={isDraw}
            onRestart={handleRestart}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={board} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
