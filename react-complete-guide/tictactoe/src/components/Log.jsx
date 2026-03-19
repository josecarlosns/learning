export function Log({ turns }) {
  return (
    <ol id="log">
      {turns &&
        turns.length > 0 &&
        turns.map((turn) => {
          const {
            cell: { rowIndex, colIndex },
            player,
          } = turn;

          return (
            <li
              key={`${player}${rowIndex}${colIndex}`}
            >{`Player ${player} selected [${rowIndex},${colIndex}]`}</li>
          );
        })}
    </ol>
  );
}
