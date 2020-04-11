import * as React from 'react'

type PlayButtonProps = {
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlayButton(props: PlayButtonProps) {
  return (
    <div className="play-btn-wrap">
      <button
        className={"play-btn " + (props.isPlaying ? "play-btn-play" : "play-btn-stop")}
        onClick={() => props.onClick()}
      />
    </div>
  )
}
