
import React from 'react'

export default function HistoryPanel(props) {
  let opts = []
  for (let i = props.minIndex; i <= props.maxIndex; i++) {
    opts.push(
      <option
        key={i}
        value={i}
      >
        {i}
      </option>
    )
  } 

  return (
    <select
      className="history-panel"
      size={15}
      value={props.value}
      onChange={e => props.onChange(parseInt(e.target.value))}
    >
      {opts}
    </select>
  )
}
