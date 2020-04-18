import React, { useReducer } from 'react'
import './Editor.scss'
import DirButtons from './DirButtons'
import RotButtons from './RotButtons'
import Cells from '../../utils/Cells'
import StrCells from '../../utils/StringCells'
import {Direction, RotDirection} from '../../utils/StringCells'

type EditDirection = Direction | "all"

type EditorState = {
  text: string;
}

type EditorProps = {
  currentCells: Cells;
  onClickSubmit: (cells: Cells) => void;
  onClickCancel: () => void;
}

type EditorAction =
  | { type: "set", value: string }
  | { type: "fillSpace" }
  | { type: "addLine", dir: EditDirection }
  | { type: "removeLine", dir: EditDirection }
  | { type: "rotate", rDir: RotDirection }

function reducer(state: EditorState, action: EditorAction) {
  switch (action.type) {
  case "set":
    return { text: action.value }
  case "fillSpace":
    return { text: StrCells.fillSpace(state.text) }
  case "addLine":
    return { text: addLine(state.text, action.dir) }
  case "removeLine":
    return { text: removeLine(state.text, action.dir) }
  case "rotate":
    return { text: StrCells.rotate(state.text, action.rDir) }
  default:
    throw new Error(`Never reach`)
  }
}

function allDirs(): Direction[] {
  return ["left", "right", "top", "bottom"]
}

function addLine(text: string, dir: EditDirection) {
  if (dir === "all") {
    let res = text
    allDirs().forEach((dir: Direction) => {
      res = StrCells.addLine(res, dir)
    })
    return res
  } else {
    return StrCells.addLine(text, dir)
  }
}

function removeLine(text: string, dir: EditDirection) {
  if (dir === "all") {
    let res = text
    allDirs().forEach((dir: Direction) => {
      res = StrCells.removeLine(res, dir)
    })
    return res
  } else {
    return StrCells.removeLine(text, dir)
  }
}

export default function Editor(props: EditorProps) {
  const initialState: EditorState = {
    text: StrCells.fromCells(props.currentCells),
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="editor">
      <div className="editor__edit-area">
        <textarea
          id="editor-input"
          className="editor__input"
          rows={20}
          cols={80}
          onChange={e => dispatch({type: "set",value: e.target.value})}
          value={state.text}
        >
        </textarea>
        <div className="editor__edit-panel">
          <button
            className="editor__edit-button"
            onClick={() => dispatch({type: "fillSpace"})}
          >
            Fill Space
          </button>
          <DirButtons
            centerText="Add"
            onClickCenter={() => dispatch({type: "addLine", dir: "all"})}
            leftText="←"
            onClickLeft={() => dispatch({type: "addLine", dir: "left"})}
            rightText="→"
            onClickRight={() => dispatch({type: "addLine", dir: "right"})}
            topText="↑"
            onClickTop={() => dispatch({type: "addLine", dir: "top"})}
            bottomText="↓"
            onClickBottom={() => dispatch({type: "addLine", dir: "bottom"})}
          />
          <DirButtons
            centerText="Del"
            onClickCenter={() => dispatch({type: "removeLine", dir: "all"})}
            leftText="←"
            onClickLeft={() => dispatch({type: "removeLine", dir: "left"})}
            rightText="→"
            onClickRight={() => dispatch({type: "removeLine", dir: "right"})}
            topText="↑"
            onClickTop={() => dispatch({type: "removeLine", dir: "top"})}
            bottomText="↓"
            onClickBottom={() => dispatch({type: "removeLine", dir: "bottom"})}
          />
          <RotButtons
            leftText="⟲"
            onClickLeft={() => dispatch({type: "rotate", rDir: "left"})}
            rightText="⟳"
            onClickRight={() => dispatch({type: "rotate", rDir: "right"})}
          />
        </div>
      </div>
      <div className="editor__control-panel">
        <button
          className="editor__control-button--submit"
          onClick={() => props.onClickSubmit(StrCells.toCells(state.text))}
        >
          Submit
        </button>
        <button
          className="editor__control-button"
          onClick={() => props.onClickCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
