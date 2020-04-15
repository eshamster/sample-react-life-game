import * as React from 'react'

type PlayButtonProps = {
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlayButton(props: PlayButtonProps) {
  return (
    <div className="play-button">
      <button
        className={(props.isPlaying ? "play-button__play" : "play-button__stop")}
        onClick={() => props.onClick()}
      />
    </div>
  )
}
