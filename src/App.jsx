import React, { useState, useEffect } from "react";

import Game from "./Game";
import NumContainer from "./components/NumContainer";
import Grid from "./components/Grid";
import Menu from "./components/Menu";

function App() {
  const [gameData, setGameSettings] = useState({
    gameSettings: new Game()
  });

  const { gameSettings } = gameData;

  return (
    <>
      <h1>
        <div className={"wrapper-for-4"}>
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
