import React from 'react'

export default function PlayButton(props) {
  return (
    <button
      className="play-btn"
      onClick={() => props.onClick()}
    >
      {props.isPlaying ? 'Stop' : 'Play'}
    </button>
  )
}
