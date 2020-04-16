import * as React from 'react'
import './board-size-panel.scss'
import NumberSetter from './NumberSetter'

type BoardSizePanelProps = {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

export default function BoardSizePanel(props: BoardSizePanelProps) {
  return (
    <div className="board-size-panel">
      <div className="board-size-panel__text">width</div>
      <NumberSetter
        value={props.width}
        onChange={(value: number) => props.onChange(value, props.height)}
      />
      <div className="board-size-panel__text">height</div>
      <NumberSetter
        value={props.height}
        onChange={(value: number) => props.onChange(props.width, value)}
      />
    </div>
  )
}
