import * as React from 'react'
import Cell from './Cell'
import Cells from '../utils/Cells'

type BoardProps = {
  width: number;
  height: number;
  cellsState: Cells;
  onClickCell: (x: number, y: number) => void;
}

export default function Board(props: BoardProps) {
  let cells = Array(props.height)
  const cellsState = props.cellsState

  for (let y = 0; y < props.height; y++) {
    let row = Array(props.width)
    for (let x = 0; x < props.width; x++) {
      row[x] = (
        <Cell
          key={x+":"+y}
          isLive={cellsState.getCellState(x, y)}
          onClick={() => props.onClickCell(x, y)}
        />
      )
    }

    cells[y] = (
      <div
        key={y}
        className="board__row">
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
