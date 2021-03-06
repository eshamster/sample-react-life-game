import * as React from 'react'
import './history-panel.scss'

type HistoryPanelProps = {
  minIndex: number;
  maxIndex: number;
  value: number;
  onChange: (value: number) => void;
}

export default function HistoryPanel(props: HistoryPanelProps) {
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
    <div className="history-panel">
      <select
        size={15}
        value={props.value}
        onChange={e => props.onChange(parseInt(e.target.value))}
      >
        {opts}
      </select>
    </div>
  )
}
