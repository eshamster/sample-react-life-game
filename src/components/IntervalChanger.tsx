import * as React from 'react'

type IntervalChangerProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export default function IntervalChanger(props: IntervalChangerProps) {
  return (
    <div className="interval-changer">
      <div>Update Interval: {props.value} [ms]</div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={e => props.onChange(parseInt(e.target.value))}
      />
    </div>
  )
}
