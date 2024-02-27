import { useState } from "react";

export default function Player({ name, symbol, activePlayer, playerNameChangeHandler }) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(name);

  const onClickHandler = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      playerNameChangeHandler(symbol, username);
    }
  };

  const nameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const keyDownHandler = (event) => {
    event.key === "Enter" && setUsername(event.target.value);
    event.key === "Enter" && playerNameChangeHandler(symbol, username);
    event.key === "Enter" && setIsEditing((editing) => !editing);
  };

  let playerName = <span className="player-name">{username}</span>;

  if (isEditing) {
    playerName = (
      <input
        type="text"
        name="player-name"
        required
        value={username}
        onChange={nameChangeHandler}
        onKeyDown={keyDownHandler}
      />
    );
  }

  return (
    <li className={activePlayer === symbol ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
