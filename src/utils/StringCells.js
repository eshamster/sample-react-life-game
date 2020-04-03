export default class StringCells {
  // Fill spaces by dead cells.
  // And each characters are processed as the followings.
  // - dead cell (white box: □): Remained
  // - living cell (black box: ■): Remained
  // - 0/space: Replaced by a white box
  // - 1: Replaced by a black box
  // - other characters: Removed
  static fillSpace(str) {
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
  
  static addLine(str, dir) {
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

  static removeLine(str, dir) {
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
}
