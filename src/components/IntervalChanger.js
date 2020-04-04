import React from 'react'

export default function IntervalChanger(props) {
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
