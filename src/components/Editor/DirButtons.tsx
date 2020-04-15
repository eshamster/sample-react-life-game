import React from 'react'

type DirButtonsParams = {
  leftText: string;
  rightText: string;
  topText: string;
  bottomText: string;
  centerText: string;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClickTop: () => void;
  onClickBottom: () => void;
  onClickCenter: () => void;
}

export default function DirButtons(props: DirButtonsParams) {
  return (
    <div className="dir-buttons">
      <button
        className="dir-buttons__horiz"
        onClick={() => props.onClickLeft()}
      >
        {props.leftText}
      </button>
      <div className="dir-buttons__center">
        <button
          className="dir-buttons__vert"
          onClick={() => props.onClickTop()}
        >
          {props.topText}
        </button>
        <button
          onClick={() => props.onClickCenter()}
        >
          {props.centerText}
        </button>
        <button
          className="dir-buttons__vert"
          onClick={() => props.onClickBottom()}
        >
          {props.bottomText}
        </button>
      </div>
      <button
        className="dir-buttons__horiz"
        onClick={() => props.onClickRight()}
      >
        {props.rightText}
      </button>
    </div>
  )
}
