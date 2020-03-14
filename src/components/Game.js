import React from 'react'
import Board from './Board'
import StepButton from './StepButton'
import PlayButton from './PlayButton'
import ClearButton from './ClearButton'
import ResetButton from './ResetButton'
import NumberSelector from './NumbersSelector'

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: this.createCellsStateRandomly(),
      isPlaying: false,
      updateIntv: 100, /* ms */
      intvId: undefined,
      countsToBorn: [3],
      countsToKeep: [2,3],
    }
  }

  // --- updating --- //

  countAroundLivings(x, y, cells) {
    const cellX = this.props.cellX
    const cellY = this.props.cellY

    const left = (x > 0) ? x - 1 : cellX - 1
    const up   = (y > 0) ? y - 1 : cellY - 1
    const right = (x < cellX - 1) ? x + 1 : 0
    const down  = (y < cellY - 1) ? y + 1 : 0

    const checkCell = (x, y) => {
      return (cells[y * cellX + x]) ? 1 : 0
    }

    return checkCell(left, up) + checkCell(x, up) + checkCell(right, up) +
      checkCell(left, y) /* ignore self */ + checkCell(right, y) +
      checkCell(left, down) + checkCell(x, down) + checkCell(right, down)
  }

  isLiveInNext(x, y, cells) {
    const count = this.countAroundLivings(x, y, cells)
    const countsToLive =
          (cells[y * this.props.cellX + x]) ?
          this.state.countsToKeep :
          this.state.countsToBorn

    return countsToLive.includes(count)
  }

  update() {
    const cellX = this.props.cellX
    const cellY = this.props.cellY
    const nextCells = Array(cellX * cellY)

    for (let y = 0; y < cellY; y++) {
      for (let x = 0; x < cellX; x++) {
        nextCells[y * cellX + x] =
          this.isLiveInNext(x, y, this.state.cells)
      }
    }

    this.setState({cells: nextCells})
  }

  // --- playing --- //

  play() {
    if (this.state.isPlaying) {
      return
    }
    this.setState({
      isPlaying: true,
      intvId: setInterval(() => this.update(), this.state.updateIntv)
    })
  }

  stop() {
    if (!this.state.isPlaying) {
      return
    }
    clearInterval(this.state.intvId)
    this.setState({
      isPlaying: false,
      intvId: undefined,
    })
  }

  togglePlaying() {
    if (this.state.isPlaying) {
      this.stop()
    } else {
      this.play()
    }
  }

  // --- change cell state --- //

  toggleOneCellState(index) {
    const cells = this.state.cells.slice()
    if (index < 0 || index >= cells.length) {
      throw `Index should be in range [0, ${cells.length}], but got ${index}`
    }

    cells[index] = !cells[index]

    this.setState({
      cells: cells,
    })
  }

  killAllCells() {
    this.setState({
      cells: Array(this.calcCellNum()).fill(false)
    })
  }

  createCellsStateRandomly() {
    const cells = Array(this.calcCellNum())
    for (let i = 0; i < cells.length; i++) {
      cells[i] = Math.random() > 0.5
    }
    return cells
  }

  // --- set living conditions --- //

  toggleNumberSelect(num, arr) {
    if (num < 0 || num > 8) {
      throw "Selection number should be [0, 8]"
    }

    let res = arr.slice()
    if (res.includes(num)) {
      return arr.filter(n => {return n !== num})
    } else {
      res.push(num)
    }
    return res
  }

  // --- utils --- //

  calcCellNum() {
    return this.props.cellX * this.props.cellY
  }

  // --- render --- //

  render() {
    return (
      <div>
        <Board
          cellX={this.props.cellX}
          cellY={this.props.cellY}
          cellsState={this.state.cells}
          onClickCell={index => this.toggleOneCellState(index)}
        />
        <StepButton
          onClick={() => this.update()}
        />
        <PlayButton
          isPlaying={this.state.isPlaying}
          onClick={() => this.togglePlaying()}
        />
        <ClearButton
          onClick={() => this.killAllCells()}
        />
        <ResetButton
          onClick={() => this.setState({
            cells: this.createCellsStateRandomly()
          })}
        />
        <ul>
          <li>
            BORN: Required around cells to born
            <NumberSelector
              maxNum={8}
              selectedValues={this.state.countsToBorn}
              onClickNum={(n) => {
                this.setState({
                  countsToBorn: this.toggleNumberSelect(n, this.state.countsToBorn),
                })
              }}
            />
          </li>
          <li>
            KEEP: Required around cells to keep living
            <NumberSelector
              maxNum={8}
              selectedValues={this.state.countsToKeep}
              onClickNum={(n) => {
                this.setState({
                  countsToKeep: this.toggleNumberSelect(n, this.state.countsToKeep),
                })
              }}
            />
          </li>
        </ul>
      </div>
    )
  }
}
