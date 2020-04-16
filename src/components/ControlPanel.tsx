import React from 'react'
import './control-panel.scss'
import IntervalChanger from './IntervalChanger'

type ControlPanelProps = {
  isPlaying: boolean;
  onClickPlay: () => void;
  updateIntv: number;
  onChangeInterval: (value: number) => void;
  onClickStep: () => void;
  onClickClear: () => void;
  onClickReset: () => void;
}

export default function ControlPanel(props: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-panel__play-panel">
        <div className="control-panel__play-button">
          <button
            className={(props.isPlaying ?
                        "control-panel__play-button--play" :
                        "control-panel__play-button--stop")}
            onClick={() => props.onClickPlay()}
          />
        </div>
        <IntervalChanger
          value={props.updateIntv}
          min={50}
          max={1000}
          step={10}
          onChange={(value: number) => props.onChangeInterval(value)}
        />
      </div>
      <div>
        <button
          className="control-panel__step-button"
          onClick={() => props.onClickStep()}
        >
          Next Step
        </button>
        <button
          className="control-panel__clear-button"
          onClick={() => props.onClickClear()}
        >
          Clear
        </button>
        <button
          className="control-panel__reset-button"
          onClick={() => props.onClickReset()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
