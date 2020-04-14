import React from 'react'

type RotButtonsParams = {
  leftText: string;
  rightText: string;
  onClickLeft: () => void;
  onClickRight: () => void;
}

export default function DirButtons(props: RotButtonsParams) {
  return (
    <div className="rot-buttons">
      <button
        className="rot-button"
        onClick={() => props.onClickLeft()}
      >
        {props.leftText}
      </button>
      <button
        className="rot-button"
        onClick={() => props.onClickRight()}
      >
        {props.rightText}
      </button>
    </div>
  )
}
