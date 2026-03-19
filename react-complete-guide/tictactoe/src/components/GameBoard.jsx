

export default function GameBoard({ onSelectSquare, board }) {


  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare({ rowIndex, colIndex })}
                  disabled={cell && cell !== ''}
                >
                  {cell}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
