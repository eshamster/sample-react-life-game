import Cells from './Cells'
import RingBuffer from './RingBuffer'

export default class LifeGame {
  cellsBuffer: RingBuffer<Cells>
  countsToBorn: number[]
  countsToKeep: number[]

  constructor(width: number, height: number) {
    const cellsBuffer = new RingBuffer<Cells>(100)
    cellsBuffer.add(Cells.initRandomly(width, height))

    this.cellsBuffer = cellsBuffer
    this.countsToBorn = [3]
    this.countsToKeep = [2,3]
  }

  // --- updating --- //

  _isLiveInNext(x: number, y: number, cells: Cells) {
    const count = cells.countAroundLivings(x, y)
    const countsToLive =
          cells.getCellState(x, y) ?
          this.countsToKeep :
          this.countsToBorn

    return countsToLive.includes(count)
  }

  update(): LifeGame {
    const width = this.getWidth()
    const height = this.getHeight()
    const cells = this.getCells()
    const nextCells = cells.clone()

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        nextCells.setCellMod(x, y, this._isLiveInNext(x, y, cells))
      }
    }

    this.updateCells(nextCells)
    return this
  }

  // --- change cell state --- //

  toggleOneCellState(x: number, y: number): LifeGame {
    const cells = this.getCells()
    const state = cells.getCellState(x, y)
    this.updateCells(cells.setCell(x, y, !state))
    return this
  }

  killAllCells(): LifeGame {
    this.updateCells(Cells.init(this.getWidth(), this.getHeight()))
    return this
  }

  // --- living conditions --- //

  getCountsToBorn(): number[] {
    return this.countsToBorn
  }

  toggleCountsToBorn(num: number): LifeGame {
    this.countsToBorn = this.toggleNumberSelect(num, this.getCountsToBorn())
    return this
  }

  getCountsToKeep(): number[] {
    return this.countsToKeep
  }

  toggleCountsToKeep(num: number): LifeGame {
    this.countsToKeep = this.toggleNumberSelect(num, this.getCountsToKeep())
    return this
  }

  toggleNumberSelect(num: number, arr: number[]) {
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

  // --- boardSize --- //

  updateBoardSize(width: number, height: number): LifeGame {
    this.updateCells(this.getCells().cloneWithNewSize(width, height))
    return this
  }

  // --- history --- //

  getOldestHistoryIndex(): number {
    return this.cellsBuffer.getMinGlobalIndex()
  }

  getLatestHistoryIndex(): number {
    return this.cellsBuffer.getMaxGlobalIndex()
  }

  getCurrentHistoryIndex(): number {
    return this.cellsBuffer.getCurrentGlobalIndex()
  }

  setHistoryIndex(index: number): LifeGame {
    const cellsBuffer = this.cellsBuffer.clone()
    cellsBuffer.setCaretByGlobalIndex(index)
    this.cellsBuffer = cellsBuffer
    return this
  }

  // --- copy --- //

  // TODO: Move to StringCells class
  cellsToText(cells: Cells) {
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

  // --- Utils --- //

  getWidth(cells = this.getCells()): number {
    return cells.getWidth()
  }

  getHeight(cells = this.getCells()): number {
    return cells.getHeight()
  }

  getCells(): Cells {
    const res = this.cellsBuffer.getCurrent()
    if (res === null) {
      throw new Error("getCells should not be null")
    }
    return res
  }

  updateCells(cells: Cells): LifeGame {
    // // Note: Probably cell level cloning is overdone.
    // const cellsBuffer = this.state.cellsBuffer.clone(
    //   cells => Cells.clone(cells)
    // )
    const cellsBuffer = this.cellsBuffer.clone()
    cellsBuffer.add(cells)
    this.cellsBuffer = cellsBuffer
    return this
  }
}
