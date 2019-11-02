import React from "react";

const Menu = ({ gameSettings, newGame }) => {
  return (
    <div>
      <div className="header">
        <h1 className="title">2048</h1>
        <div className="holder">
          <div className="playAgain" onClick={newGame}>
            New Game!
          </div>
          <div className="score">
            <div className="nowScore">{gameSettings.score}</div>
            <div className="bestScore">{gameSettings.bestScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
