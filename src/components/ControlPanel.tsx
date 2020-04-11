import React from 'react'
import StepButton from './StepButton'
import PlayButton from './PlayButton'
import ClearButton from './ClearButton'
import ResetButton from './ResetButton'
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
      <div className="play-panel">
        <PlayButton
          isPlaying={props.isPlaying}
          onClick={() => props.onClickPlay()}
        />
        <IntervalChanger
          value={props.updateIntv}
          min={50}
          max={1000}
          step={10}
          onChange={(value: number) => props.onChangeInterval(value)}
        />
      </div>
      <div>
        <StepButton
          onClick={() => props.onClickStep()}
        />
        <ClearButton
          onClick={() => props.onClickClear()}
        />
        <ResetButton
          onClick={() => props.onClickReset()}
        />
      </div>
    </div>
  )
}
