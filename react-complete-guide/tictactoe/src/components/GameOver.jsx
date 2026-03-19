export function GameOver({ winner, onRestart, isDraw = false }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {isDraw && <p>{'Draw!'}</p>}
      {winner && <p>{`${winner} won!`}</p>}
      <p>
        <button onClick={onRestart}>Restart!</button>
      </p>
    </div>
  );
}
