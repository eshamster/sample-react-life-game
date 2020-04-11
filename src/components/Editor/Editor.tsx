import React from 'react'
import './Editor.css'
import DirButtons from './DirButtons'
import Cells from '../../utils/Cells'
import StrCells from '../../utils/StringCells'
import {Direction} from '../../utils/StringCells'

type EditDirection = Direction | "all"

type EditorParams = {
  currentCells: Cells;
  onClickSubmit: (cells: Cells) => void;
  onClickCancel: () => void;
}

type EditorState = {
  text: string;
}

export default class Editor extends React.Component<EditorParams, EditorState> {
  constructor(props: EditorParams) {
    super(props)

    this.state = {
      text: StrCells.fromCells(props.currentCells),
    }
  }

  allDirs(): Direction[] {
    return ["left", "right", "top", "bottom"]
  }

  addLineMod(dir: EditDirection) {
    if (dir === "all") {
      let res = this.state.text
      this.allDirs().forEach((dir: Direction) => {
        res = StrCells.addLine(res, dir)
      })
      this.setState({text: res})
    } else {
      this.setState({text: StrCells.addLine(this.state.text, dir)})
    }
  }

  removeLineMod(dir: EditDirection) {
    if (dir === "all") {
      let res = this.state.text
      this.allDirs().forEach(dir => {
        res = StrCells.removeLine(res, dir)
      })
      this.setState({text: res})
    } else {
      this.setState({text: StrCells.removeLine(this.state.text, dir)})
    }
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
              centerText="Add"
              onClickCenter={() => this.addLineMod("all")}
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
              centerText="Del"
              onClickCenter={() => this.removeLineMod("all")}
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
            onClick={() => this.props.onClickSubmit(StrCells.toCells(this.state.text))}
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
