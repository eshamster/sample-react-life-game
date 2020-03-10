 import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    let cellsState = Array(props.cellX * props.cellY)
    for (let i = 0; i < cellsState.length; i++) {
      cellsState[i] = (Math.random() > 0.5) ? true : false
    }

    this.state = {
      cellsState: cellsState,
    }
  }

  render() {
    return (
      <div>
        <Board
          cellX={this.props.cellX}
          cellY={this.props.cellY}
          cellsState={this.state.cellsState}
        />
      </div>
    )
  }
}
