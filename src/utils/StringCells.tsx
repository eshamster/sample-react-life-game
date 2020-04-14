import Cells from './Cells'

export type Direction = "left" | "right" | "top" | "bottom"
export type RotDirection = "left" | "right"

export default class StringCells {
  // Fill spaces by dead cells.
  // And each characters are processed as the followings.
  // - dead cell (white box: □): Remained
  // - living cell (black box: ■): Remained
  // - 0/space: Replaced by a white box
  // - 1: Replaced by a black box
  // - other characters: Removed
  static fillSpace(str: string): string {
    const formedStr = str
          .replace(/[^ 01■□\n]/g, "")
          .replace(/ /g, "□")
          .replace(/0/g, "□")
          .replace(/1/g, "■")

    const splitted = formedStr.split("\n")
    const maxWidth = splitted
          .map(str => str.length)
          .reduce((a, b) => Math.max(a, b))

    const filledArray = splitted.map(str => str + "□".repeat(maxWidth - str.length))

    return filledArray.join("\n")
  }
  
  static addLine(str: string, dir: Direction): string {
    if (str === "") {
      return "□"
    }

    switch (dir) {
    case "left": {
      const tmp = str
            .split("\n")
            .map(str => " " + str)
            .join("\n")
      return this.fillSpace(tmp)
    }
    case "right": {
      const tmp = str
            .split("\n")
            .map(str => str + " ")
            .join("\n")
      return this.fillSpace(tmp)
    }
    case "top":
      return this.fillSpace("\n" + str)
    case "bottom":
      return this.fillSpace(str + "\n")
    default:
      throw new Error(`Not recognized direction "${dir}"`)
    }
  }

  static removeLine(str: string, dir: Direction): string {
    switch (dir) {
      case "left": {
        const tmp = str
          .split("\n")
          .map(str => str.replace(/^./, ""))
          .join("\n")
        return this.fillSpace(tmp)
      }
      case "right": {
        const tmp = str
          .split("\n")
          .map(str => str.replace(/.$/, ""))
          .join("\n")
        return this.fillSpace(tmp)
      }
      case "top":{
        const tmp = str
          .split("\n")
          .slice(1)
          .join("\n")
        return this.fillSpace(tmp)
      }
      case "bottom": {
        const tmp = str
          .split("\n")
          .slice(0, -1)
          .join("\n")
        return this.fillSpace(tmp)
      }
      default:
        throw new Error(`Not recognized direction "${dir}"`)
    }
  }

  static rotate(str: string, rDir: RotDirection): string {
    const strArr = this.fillSpace(str).split("\n")
    if (strArr.length === 0) {
      return ""
    }
    const newWidth = strArr.length
    const newHeight = strArr[0].length

    const resArr: string[][] = Array(newHeight)
    for (let y = 0; y < newHeight; y++) {
      resArr[y] = Array(newWidth)
    }

    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        let preX = 0
        let preY = 0
        switch (rDir) {
          case "left":
            preX = newHeight - y - 1
            preY = x
            break
          case "right":
            preX = y
            preY = newWidth - x - 1
            break
        }
        resArr[y][x] = strArr[preY].charAt(preX)
      }
    }

    return resArr
      .map(chars => chars.join(""))
      .join("\n")
  }

  static fromCells(cells: Cells): string {
    const width = cells.getWidth()
    const height = cells.getHeight()
    const strMatrix = Array(height)

    for (let y = 0; y < height; y++) {
      strMatrix[y] = Array(width).fill("")
    }

    cells.forEach((x, y, value) =>
      strMatrix[y][x] = value ? "■" : "□")

    return strMatrix
      .map(strArray => strArray.join(""))
      .join("\n")
  }

  static toCells(str: string): Cells {
    const formatted = this.fillSpace(str)
    if (formatted.length === 0) {
      return Cells.init(1, 1)
    }

    const splitted = formatted.split("\n")
    const width = splitted[0].length
    const height = splitted.length

    const cells = Cells.init(width, height)
    for (let y = 0; y < height; y++) {
      const str = splitted[y]
      for (let x = 0; x < width; x++) {
        cells.setCellMod(x, y, str.charAt(x) === "■")
      }
    }

    return cells
  }
}
