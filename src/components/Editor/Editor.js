import React from 'react'
import './Editor.css'
import DirButtons from './DirButtons'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.defaultText,
    }
  }

  fillSpace(str) {
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

  toCells(str) {
    const formatted = this.fillSpace(str)
    if (formatted.length === 0) {
      return [[0]]
    }

    const inversedCells = formatted
          .split("\n")
          .map(str => {
            const res = Array(str.length)
            for (let i = 0; i < str.length; i++) {
              res[i] = str.charAt(i) === "■"
            }
            return res
          })

    return this.inverseMatrix(inversedCells)
  }

  addLine(str, dir) {
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
      throw new Error(`Not recoginzed direction "${dir}"`)
    }
  }

  addLineMod(dir) {
    this.setState({text: this.addLine(this.state.text, dir)})
  }

  removeLine(str, dir) {
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
      throw new Error(`Not recoginzed direction "${dir}"`)
    }
  }

  removeLineMod(dir) {
    this.setState({text: this.removeLine(this.state.text, dir)})
  }

  // For submit
  inverseMatrix(matrix) {
    if (matrix.length === 0) {
      throw new Error("matrix should not be empty")
    }

    // Omit to check if all of arrays in the matrix have same length.
    const newHeight = matrix[0].length
    const newWidth = matrix.length
    const res = Array(newHeight)

    for (let y = 0; y < newHeight; y++) {
      const arr = Array(newWidth)
      for (let x = 0; x < newWidth; x++) {
        arr[x] = matrix[x][y]
      }
      res[y] = arr
    }

    return res
  }

  render() {
    return (
      <div className="editor">
        <div className="edit-area">
          <textarea
            id="editor-input"
            className="editor-input"
            rows={20}
            cols={80}
            onChange={e => this.setState({text: e.target.value})}
            value={this.state.text}
          >
          </textarea>
          <div className="editor-edit-panel">
            <button
              className="editor-edit-button"
              onClick={() => this.setState({text: this.fillSpace(this.state.text)})}
            >
              Fill Space
            </button>
            <DirButtons
              leftText="←"
              onClickLeft={() => this.addLineMod("left")}
              rightText="→"
              onClickRight={() => this.addLineMod("right")}
              topText="↑"
              onClickTop={() => this.addLineMod("top")}
              bottomText="↓"
              onClickBottom={() => this.addLineMod("bottom")}
            />
            <DirButtons
              leftText="→"
              onClickLeft={() => this.removeLineMod("left")}
              rightText="←"
              onClickRight={() => this.removeLineMod("right")}
              topText="↓"
              onClickTop={() => this.removeLineMod("top")}
              bottomText="↑"
              onClickBottom={() => this.removeLineMod("bottom")}
            />
          </div>
        </div>
        <div className="editor-control-panel">
          <button
            className="editor-control-button"
            onClick={() => this.props.onClickSubmit(this.toCells(this.state.text))}
          >
            Submit
          </button>
          <button
            className="editor-control-button"
            onClick={() => this.props.onClickCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}
