import React from 'react'
import Board from './Board'
import NumberSetter from './NumberSetter'
import NumberSelector from './NumbersSelector'
import ControlPanel from './ControlPanel'

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    const cellX = 30
    const cellY = 25

    this.state = {
      cells: this.createCellsStateRandomly(cellX, cellY),
      isPlaying: false,
      updateIntv: 100, /* ms */
      intvId: undefined,
      countsToBorn: [3],
      countsToKeep: [2,3],
    }
  }

  // --- updating --- //

  countAroundLivings(x, y, cells) {
    const cellX = this.getCellX()
    const cellY = this.getCellY()

    const left = (x > 0) ? x - 1 : cellX - 1
    const up   = (y > 0) ? y - 1 : cellY - 1
    const right = (x < cellX - 1) ? x + 1 : 0
    const down  = (y < cellY - 1) ? y + 1 : 0

    const checkCell = (x, y) => {
      return (cells[x][y]) ? 1 : 0
    }

    return checkCell(left, up) + checkCell(x, up) + checkCell(right, up) +
      checkCell(left, y) /* ignore self */ + checkCell(right, y) +
      checkCell(left, down) + checkCell(x, down) + checkCell(right, down)
  }

  isLiveInNext(x, y, cells) {
    const count = this.countAroundLivings(x, y, cells)
    const countsToLive =
          (cells[x][y]) ?
          this.state.countsToKeep :
          this.state.countsToBorn

    return countsToLive.includes(count)
  }

  update() {
    const cellX = this.getCellX()
    const cellY = this.getCellY()
    const nextCells = this.sliceCells()

    for (let y = 0; y < cellY; y++) {
      for (let x = 0; x < cellX; x++) {
        nextCells[x][y] =
          this.isLiveInNext(x, y, this.state.cells)
      }
    }

    this.setState({cells: nextCells})
  }

  // --- playing --- //

  play(updateIntv = this.state.updateIntv) {
    if (this.isPlaying()) {
      this.stop()
    }
    this.setState({
      isPlaying: true,
      intvId: setInterval(() => this.update(), updateIntv)
    })
  }

  stop() {
    if (!this.isPlaying()) {
      return
    }
    clearInterval(this.state.intvId)
    this.setState({
      isPlaying: false,
      intvId: undefined,
    })
  }

  isPlaying() {
    return this.state.isPlaying
  }

  togglePlaying() {
    if (this.state.isPlaying) {
      this.stop()
    } else {
      this.play()
    }
  }

  setUpdateInterval(value) {
    this.setState({updateIntv: value})
    if (this.isPlaying()) {
      this.play(value)
    }
  }

  // --- change cell state --- //

  toggleOneCellState(x, y) {
    const cellX = this.getCellX()
    const cellY = this.getCellY()

    if (x < 0 || x >= cellX) {
      throw new Error(`Index should be in range [0, ${cellX}), but got ${x}`)
    }
    if (y < 0 || y >= cellY) {
      throw new Error(`Index should be in range [0, ${cellY}), but got ${y}`)
    }

    const cells = this.sliceCells()
    cells[x][y] = !cells[x][y]

    this.setState({
      cells: cells,
    })
  }

  killAllCells() {
    this.setState({
      cells: this.createCleanCells(this.getCellX(), this.getCellY())
    })
  }

  createCleanCells(cellX, cellY) {
    const cells = Array(cellX)
    for (let x = 0; x < cellX; x++) {
      cells[x] = Array(cellY).fill(false)
    }
    return cells
  }

  createCellsStateRandomly(cellX, cellY) {
    const cells = this.createCleanCells(cellX, cellY)
    this.forEachCells(cells, (x, y, _) => {
      cells[x][y] = Math.random() > 0.5
    })
    return cells
  }

  // --- set living conditions --- //

  toggleNumberSelect(num, arr) {
    if (num < 0 || num > 8) {
      throw new Error("Selection number should be [0, 8]")
    }

    let res = arr.slice()
    if (res.includes(num)) {
      return arr.filter(n => {return n !== num})
    } else {
      res.push(num)
    }
    return res
  }

  // --- cellSize --- //

  updateCellSize(cellX, cellY) {
    if (cellX < 1) {
      cellX = 1
    }
    if (cellY < 1) {
      cellY = 1
    }

    const prevX = this.getCellX()
    const prevY = this.getCellY()
    const cells = this.createCleanCells(cellX, cellY)

    for (let y = 0; y < cellY; y++) {
      if (y > prevY - 1) {
        break
      }
      for (let x = 0; x < cellX; x++) {
        if (x > prevX - 1) {
          break
        }
        cells[x][y] = this.state.cells[x][y]
      }
    }

    this.setState({
      cells: cells
    })
  }

  // --- utils --- //

  getCellX(cells = this.state.cells) {
    return cells.length
  }

  getCellY(cells = this.state.cells) {
    return cells.length > 0 ? cells[0].length : 0
  }

  sliceCells() {
    const cellX = this.getCellX()

    let cells = Array(cellX)
    for (let x = 0; x < cellX; x++) {
      cells[x] = this.state.cells[x].slice()
    }
    return cells
  }

  forEachCells(cells, f) {
    const cellX = this.getCellX(cells)
    const cellY = this.getCellY(cells)

    for (let x = 0; x < cellX; x++) {
      for (let y = 0; y < cellY; y++) {
        f(x, y, cells[x][y])
      }
    }
  }

  // --- render --- //

  render() {
    return (
      <div>
        <div className="wss">
          <div>width</div>
          <NumberSetter
            value={this.getCellX()}
            onChange={value => this.updateCellSize(value, this.getCellY())}
          />
          <div>height</div>
          <NumberSetter
            value={this.getCellY()}
            onChange={value => this.updateCellSize(this.getCellX(), value)}
          />
        </div>
        <Board
          cellX={this.getCellX()}
          cellY={this.getCellY()}
          cellsState={this.state.cells}
          onClickCell={(x, y) => this.toggleOneCellState(x, y)}
        />
        <ControlPanel
          isPlaying={this.state.isPlaying}
          onClickPlay={() => this.togglePlaying()}
          updateIntv={this.state.updateIntv}
          onChangeInterval={value => this.setUpdateInterval(value)}
          onClickStep={() => this.update()}
          onClickClear={() => this.killAllCells()}
          onClickReset={() => this.setState({
            cells: this.createCellsStateRandomly(
              this.getCellX(), this.getCellY())
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
