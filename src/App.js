import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <Board
      cellX={30}
      cellY={25}
      countsToBorn={[3]}
      countsToLive={[2,3]}
    />
  );
}

export default App;
