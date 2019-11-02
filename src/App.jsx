import React, { useState, useEffect } from "react";

function App() {
  const [gameData, setGameSettings] = useState({
    gameSettings: new Game()
  });

  const { gameSettings } = gameData;

  console.log(gameSettings);

  return (
    <>
      <h1>Working bro</h1>
    </>
  );
}

export default App;
