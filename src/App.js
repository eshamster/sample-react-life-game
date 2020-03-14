import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <Game
      cellX={30}
      cellY={25}
    />
  );
}

export default App;
