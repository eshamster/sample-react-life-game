import React from 'react'

type NumberSetterProps = {
  value: number;
  onChange: (value: number) => void;
}

export default function NumberSetter(props: NumberSetterProps) {
  return (
    <input
      className="board-size-panel__number-setter"
      type="number"
      value={props.value}
      onChange={e => props.onChange(parseInt(e.target.value))}
    />
  )
}
