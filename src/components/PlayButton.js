import React from 'react'

export default function PlayButton(props) {
  return (
    <div className="play-btn-wrap">
      <button
        className={"play-btn " + (props.isPlaying ? "play-btn-play" : "play-btn-stop")}
        onClick={() => props.onClick()}
      />
    </div>
  )
}
