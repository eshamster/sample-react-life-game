import React from 'react'
import NumberSetter from './NumberSetter'

export default function BoardSizePanel(props) {
  return (
    <div className="bsp">
      <div>width</div>
      <NumberSetter
        value={props.width}
        onChange={value => props.onChange(value, props.height)}
      />
      <div>height</div>
      <NumberSetter
        value={props.height}
        onChange={value => props.onChange(props.width, value)}
      />
    </div>
  )
}
