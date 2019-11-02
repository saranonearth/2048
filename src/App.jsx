import React, { useState, useEffect } from "react";

import Game from "./Game";
import NumContainer from "./components/NumContainer";
import Grid from "./components/Grid";
import Menu from "./components/Menu";

function App() {
  const [gameData, setGameSettings] = useState({
    gameSettings: new Game()
  });

  const newGame = () => {
    document.location.reload(true);
  };

  const keyDown = e => {
    e.preventDefault();
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      var direction = e.keyCode - 37;
      var gd = gameSettings.move(direction);
      setGameSettings({
        ...gameData,
        gameSettings: gd
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", e => {
      keyDown(e);
    });
    return () => {
      window.removeEventListener("keydown", e => {
        keyDown(e);
      });
    };
  }, []);

  return (
    <>
      <h1>
        <div className={"wrapper-for-4"}>
          <Menu newGame={newGame} gameSettings={gameSettings} />
          <div className={"container-for-4"}>
            <Grid gameSettings={gameSettings.gd} />
            <NumContainer gd={gameSettings.gd} />
          </div>
        </div>
      </h1>
    </>
  );
}

export default App;
