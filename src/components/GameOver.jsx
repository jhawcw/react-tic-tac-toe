export default function GameOver({ winner, rematchHandler }) {
  return (
    <div id="game-over">
      <h2>GAME OVER!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={rematchHandler}>Rematch!</button>
      </p>
    </div>
  );
}
