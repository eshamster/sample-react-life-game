import React from 'react'
import './Editor.css'
import DirButtons from './DirButtons'
import StrCells from '../../utils/StringCells'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.defaultText,
    }
  }

  toCells(str) {
    const formatted = StrCells.fillSpace(str)
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

  addLineMod(dir) {
    this.setState({text: StrCells.addLine(this.state.text, dir)})
  }

  removeLineMod(dir) {
    this.setState({text: StrCells.removeLine(this.state.text, dir)})
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
              onClick={() => this.setState({text: StrCells.fillSpace(this.state.text)})}
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
