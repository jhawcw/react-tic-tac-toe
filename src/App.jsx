import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derievedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const activePlayer = derievedActivePlayer(gameTurns);

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[`${firstSquareSymbol}`];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleActive = (rowInd, colInd) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derievedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowInd, col: colInd }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const rematchHandler = () => {
    setGameTurns([]);
  };

  const playerNameChangeHandler = (symbol, newName) => {
    console.log("fired");
    setPlayers((prevState) => ({ ...prevState, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players["X"]}
            symbol="X"
            activePlayer={activePlayer}
            playerNameChangeHandler={playerNameChangeHandler}
          />
          <Player
            name={players["O"]}
            symbol="O"
            activePlayer={activePlayer}
            playerNameChangeHandler={playerNameChangeHandler}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematchHandler={rematchHandler}></GameOver>
        )}
        <GameBoard handleActive={handleActive} gameBoard={gameBoard}></GameBoard>
      </div>
      <Log gameTurns={gameTurns}></Log>
    </main>
  );
}

export default App;
