import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <Game
      cellX={30}
      cellY={25}
      countsToBorn={[3]}
      countsToLive={[2,3]}
    />
  );
}

export default App;
