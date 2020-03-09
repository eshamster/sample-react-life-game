import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component {
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
    let cells = Array(this.props.cellY)
    const cellsState = this.state.cellsState

    for (let y = 0; y < this.props.cellY; y++) {
      let row = Array(this.props.cellX)
      for (let x = 0; x < this.props.cellX; x++) {
        const index = y * this.props.cellX + x
        row[x] = (
          <Cell isLive={cellsState[index]} />
        )
      }

      cells[y] = (
        <div className="board-row">
          {row}
        </div>
      )
    }

    return (
      <div className="board">
        <div>
          {cells}
        </div>
      </div>
    )
  }
}
