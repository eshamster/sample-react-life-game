import React from 'react'

export default function DirButtons(props) {
  return (
    <div className="dir-buttons">
      <button
        className="dir-button-horiz"
        onClick={() => props.onClickLeft()}
      >
        {props.leftText}
      </button>
      <div className="dir-buttons-center">
        <button
          className="dir-button-vert"
          onClick={() => props.onClickTop()}
        >
          {props.topText}
        </button>
        <button
          className="dir-button-vert"
          onClick={() => props.onClickBottom()}
        >
          {props.bottomText}
        </button>
      </div>
      <button
        className="dir-button-horiz"
        onClick={() => props.onClickRight()}
      >
        {props.rightText}
      </button>
    </div>
  )
}
