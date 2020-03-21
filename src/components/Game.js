import React from 'react'
import Board from './Board'
import ControlPanel from './ControlPanel'
import BoardSizePanel from './BoardSizePanel'
import CellCondPanel from './CellCondPanel'

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    const width = 30
    const height = 25

    this.state = {
      cells: this.createCellsStateRandomly(width, height),
      isPlaying: false,
      updateIntv: 100, /* ms */
      intvId: undefined,
      countsToBorn: [3],
      countsToKeep: [2,3],
    }
  }

  // --- updating --- //

  countAroundLivings(x, y, cells) {
    const width = this.getWidth()
    const height = this.getHeight()

    const left = (x > 0) ? x - 1 : width - 1
    const up   = (y > 0) ? y - 1 : height - 1
    const right = (x < width - 1) ? x + 1 : 0
    const down  = (y < height - 1) ? y + 1 : 0

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
    const width = this.getWidth()
    const height = this.getHeight()
    const nextCells = this.sliceCells()

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
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
    const width = this.getWidth()
    const height = this.getHeight()

    if (x < 0 || x >= width) {
      throw new Error(`Index should be in range [0, ${width}), but got ${x}`)
    }
    if (y < 0 || y >= height) {
      throw new Error(`Index should be in range [0, ${height}), but got ${y}`)
    }

    const cells = this.sliceCells()
    cells[x][y] = !cells[x][y]

    this.setState({
      cells: cells,
    })
  }

  killAllCells() {
    this.setState({
      cells: this.createCleanCells(this.getWidth(), this.getHeight())
    })
  }

  createCleanCells(width, height) {
    const cells = Array(width)
    for (let x = 0; x < width; x++) {
      cells[x] = Array(height).fill(false)
    }
    return cells
  }

  createCellsStateRandomly(width, height) {
    const cells = this.createCleanCells(width, height)
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

  updateCellSize(width, height) {
    if (width < 1) {
      width = 1
    }
    if (height < 1) {
      height = 1
    }

    const prevX = this.getWidth()
    const prevY = this.getHeight()
    const cells = this.createCleanCells(width, height)

    for (let y = 0; y < height; y++) {
      if (y > prevY - 1) {
        break
      }
      for (let x = 0; x < width; x++) {
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

  getWidth(cells = this.state.cells) {
    return cells.length
  }

  getHeight(cells = this.state.cells) {
    return cells.length > 0 ? cells[0].length : 0
  }

  sliceCells() {
    const width = this.getWidth()

    let cells = Array(width)
    for (let x = 0; x < width; x++) {
      cells[x] = this.state.cells[x].slice()
    }
    return cells
  }

  forEachCells(cells, f) {
    const width = this.getWidth(cells)
    const height = this.getHeight(cells)

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        f(x, y, cells[x][y])
      }
    }
  }

  // --- render --- //

  render() {
    return (
      <div>
        <BoardSizePanel
          width={this.getWidth()}
          height={this.getHeight()}
          onChange={(width, height) => this.updateCellSize(width, height)}
        />
        <Board
          width={this.getWidth()}
          height={this.getHeight()}
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
              this.getWidth(), this.getHeight())
          })}
        />
        <CellCondPanel
          countsToBorn={this.state.countsToBorn}
          onClickBornNum={n =>
            this.setState({
              countsToBorn: this.toggleNumberSelect(n, this.state.countsToBorn),
            })
          }
          countsToKeep={this.state.countsToKeep}
          onClickKeepNum={n =>
            this.setState({
              countsToKeep: this.toggleNumberSelect(n, this.state.countsToKeep),
            })
          }
        />
      </div>
    )
  }
}
