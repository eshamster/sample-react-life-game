import React from 'react'
import Cell from './Cell'

export default function Board(props) {
  let cells = Array(props.cellY)
  const cellsState = props.cellsState

  for (let y = 0; y < props.cellY; y++) {
    let row = Array(props.cellX)
    for (let x = 0; x < props.cellX; x++) {
      row[x] = (
        <Cell
          key={x+":"+y}
          isLive={cellsState[x][y]}
          onClick={() => props.onClickCell(x, y)}
        />
      )
    }

    cells[y] = (
      <div
        key={y}
        className="board-row">
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
