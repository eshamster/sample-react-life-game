import React from 'react'
import Board from './Board'
import ControlPanel from './ControlPanel'
import BoardSizePanel from './BoardSizePanel'
import CellCondPanel from './CellCondPanel'
import HistoryPanel from './HistoryPanel'
import DataPanel from './DataPanel'
import Editor from './Editor/Editor'
import Cells from '../utils/Cells'
import ClipBoard from '../utils/ClipBoard'
import RingBuffer from '../utils/RingBuffer'

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    const width = 30
    const height = 25

    const cellsBuffer = new RingBuffer(100)
    cellsBuffer.add(Cells.initRandomly(width, height))

    this.state = {
      cellsBuffer: cellsBuffer,
      isPlaying: false,
      updateIntv: 100, /* ms */
      intvId: undefined,
      countsToBorn: [3],
      countsToKeep: [2,3],
      mode: "game", // game, editor
    }
  }

  // --- updating --- //

  isLiveInNext(x, y, cells) {
    const count = cells.countAroundLivings(x, y)
    const countsToLive =
          cells.getCellState(x, y) ?
          this.state.countsToKeep :
          this.state.countsToBorn

    return countsToLive.includes(count)
  }

  update() {
    const width = this.getWidth()
    const height = this.getHeight()
    const cells = this.getCells()
    const nextCells = cells.clone()

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        nextCells.setCellMod(x, y, this.isLiveInNext(x, y, cells))
      }
    }

    this.updateCells(nextCells)
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
    const cells = this.getCells()
    const state = cells.getCellState(x, y)
    this.updateCells(cells.setCell(x, y, !state))
  }

  killAllCells() {
    this.updateCells(Cells.init(this.getWidth(), this.getHeight()))
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
    this.updateCells(this.getCells().cloneWithNewSize(width, height))
  }

  // --- copy --- //

  copyBoard(cells = this.getCells()) {
    const textCells = this.cellsToText(cells)
    alert("Copied the following to your clipboard\n-----\n" + textCells)
    ClipBoard.copy(textCells)
  }

  cellsToText(cells) {
    const width = cells.getWidth()
    const height = cells.getHeight()

    let left = width - 1
    let right = 0
    let top = height - 1
    let bottom = 0
    let foundCell = false

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!cells.getCellState(x, y)) {
          continue
        }
        foundCell = true
        if (left > x) { left = x }
        if (right < x) { right = x }
        if (top > y) { top = y }
        if (bottom < y) { bottom = y }
      }
    }

    if (!foundCell) {
      return "□"
    }

    const stringCells = Array.from(new Array(bottom - top + 1),
                                   () => new Array(right - left + 1));

    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        stringCells[y - top][x - left] =
          cells.getCellState(x, y) ? "■" : "□"
      }
    }

    return stringCells.map(
      arr => arr.join("")
    ).join("\n")
  }

  // --- edit --- //

  startEditor() {
    this.stop()
    this.setState({mode: "editor"})
  }

  cancelEditor() {
    this.setState({mode: "game"})
  }

  submitEditor(cells) {
    this.updateCells(cells)
    this.setState({mode: "game"})
  }

  // --- Utils --- //

  getWidth(cells = this.getCells()) {
    return cells.getWidth()
  }

  getHeight(cells = this.getCells()) {
    return cells.getHeight()
  }

  getCells() {
    return this.state.cellsBuffer.getCurrent()
  }

  updateCells(cells) {
    // // Note: Probably cell level cloning is overdone.
    // const cellsBuffer = this.state.cellsBuffer.clone(
    //   cells => Cells.clone(cells)
    // )
    const cellsBuffer = this.state.cellsBuffer.clone()
    cellsBuffer.add(cells)
    this.setState({cellsBuffer: cellsBuffer})
  }

  // --- render --- //

  renderGame() {
    return (
      <div>
        <BoardSizePanel
          width={this.getWidth()}
          height={this.getHeight()}
          onChange={(width, height) => this.updateCellSize(width, height)}
        />
        <div className="board-panel">
          <Board
            width={this.getWidth()}
            height={this.getHeight()}
            cellsState={this.getCells().toArray()}
            onClickCell={(x, y) => this.toggleOneCellState(x, y)}
          />
          <HistoryPanel
            minIndex={this.state.cellsBuffer.getMinGlobalIndex()}
            maxIndex={this.state.cellsBuffer.getMaxGlobalIndex()}
            value={this.state.cellsBuffer.getCurrentGlobalIndex()}
            onChange={value => {
              const cellsBuffer = this.state.cellsBuffer.clone()
              cellsBuffer.setCaretByGlobalIndex(value)
              this.setState({cellsBuffer: cellsBuffer})
            }}
          />
          <DataPanel
            onClickCopy={() => this.copyBoard()}
            onClickEdit={() => this.startEditor()}
          />
        </div>
        <ControlPanel
          isPlaying={this.state.isPlaying}
          onClickPlay={() => this.togglePlaying()}
          updateIntv={this.state.updateIntv}
          onChangeInterval={value => this.setUpdateInterval(value)}
          onClickStep={() => this.update()}
          onClickClear={() => this.killAllCells()}
          onClickReset={() => this.updateCells(
            Cells.initRandomly(this.getWidth(), this.getHeight())
          )}
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

  render() {
    const mode = this.state.mode

    switch (mode) {
    case "game":
      return this.renderGame()
    case "editor":
      return (
        <div>
          <Editor
            defaultText={this.cellsToText(this.getCells())}
            onClickCancel={() => this.cancelEditor()}
            onClickSubmit={cells => this.submitEditor(cells)}
          />
        </div>
      )
    default:
      throw new Error(`Error: Not recognized mode ${mode}`)
    }
  }
}
