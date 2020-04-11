export default class Cells {
  cells: boolean[][]

  constructor(width: number, height: number) {
    const cells = Array(height)
    for (let y = 0; y < height; y++) {
      cells[y] = Array(width).fill(false)
    }
    this.cells = cells
  }

  // Create empty cells
  static init(width: number, height: number): Cells {
    return new Cells(width, height)
  }

  static initRandomly(width: number, height: number) {
    const cells = this.init(width, height)
    cells.forEach((x, y, _) => {
      cells.setCellMod(x, y, Math.random() > 0.5)
    })
    return cells
  }

  forEach(f: (x: number, y: number, value: boolean) => void) {
    const width = this.getWidth()
    const height = this.getHeight()

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        f(x, y, this.getCellState(x, y))
      }
    }
  }

  getCellState(x: number, y: number): boolean {
    this._checkRange(x, y)
    return this.cells[y][x]
  }

  // Nondestructively set cell's state
  setCell(x: number, y: number, state: boolean): Cells {
    const res = this.clone()
    res.setCellMod(x, y, state)
    return res
  }

  // Destructively set cell's state
  setCellMod(x: number, y: number, state: boolean): void {
    this._checkRange(x, y)
    this.cells[y][x] = state ? true : false
  }

  // Count living cells around the specified cell.
  // A edge cell and its opposite cell is interpreted as adjacent.
  countAroundLivings(x: number, y: number): number {
    const width = this.getWidth()
    const height = this.getHeight()

    const left = (x > 0) ? x - 1 : width - 1
    const up   = (y > 0) ? y - 1 : height - 1
    const right = (x < width - 1) ? x + 1 : 0
    const down  = (y < height - 1) ? y + 1 : 0

    const checkCell = (x: number, y: number) => {
      return this.getCellState(x, y) ? 1 : 0
    }

    return checkCell(left, up) + checkCell(x, up) + checkCell(right, up) +
      checkCell(left, y) /* ignore self */ + checkCell(right, y) +
      checkCell(left, down) + checkCell(x, down) + checkCell(right, down)
  }

  clone(): Cells {
    const width = this.getWidth()
    const height = this.getHeight()

    const res = Cells.init(width, height)
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        res.setCellMod(x, y, this.getCellState(x, y))
      }
    }
    return res
  }

  // Clone cells width new width and height.
  // If width (height) is greater than current,
  // a new empty line is added to left (bottom).
  // If width (height) is lower than current,
  // left (bottom) line is removed.
  cloneWithNewSize(width: number, height: number): Cells {
    if (width < 1) {
      width = 1
    }
    if (height < 1) {
      height = 1
    }

    const prevX = this.getWidth()
    const prevY = this.getHeight()
    const res = Cells.init(width, height)

    for (let y = 0; y < height; y++) {
      if (y > prevY - 1) {
        break
      }
      for (let x = 0; x < width; x++) {
        if (x > prevX - 1) {
          break
        }
        res.setCellMod(x, y, this.getCellState(x, y))
      }
    }

    return res
  }

  getWidth(): number {
    return this.cells.length > 0 ? this.cells[0].length : 0
  }

  getHeight(): number {
    return this.cells.length
  }

  _checkRange(x: number, y: number) {
    const width = this.getWidth()
    const height = this.getHeight()

    if (x < 0 || x >= width) {
      throw new Error(`X should be in range [0, ${width}), but got ${x}`)
    }
    if (y < 0 || y >= height) {
      throw new Error(`Y should be in range [0, ${height}), but got ${y}`)
    }
  }
}
