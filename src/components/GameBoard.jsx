export default function GameBoard(props) {
  return (
    <ol id="game-board">
      {props.gameBoard.map((row, index) => {
        return (
          <li key={index}>
            <ol>
              {row.map((playerSymbol, sqIndex) => {
                return (
                  <li key={sqIndex}>
                    <button
                      onClick={() => {
                        props.handleActive(index, sqIndex);
                      }}
                      disabled={playerSymbol ? "disabled" : undefined}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
