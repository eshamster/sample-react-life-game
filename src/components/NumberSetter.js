import React from 'react'

export default function NumberSetter(props) {
  return (
    <input
      type="number"
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}
