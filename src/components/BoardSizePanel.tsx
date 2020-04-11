import * as React from 'react'
import NumberSetter from './NumberSetter'

type BoardSizePanelProps = {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

export default function BoardSizePanel(props: BoardSizePanelProps) {
  return (
    <div className="bsp">
      <div className="bsp-text">width</div>
      <NumberSetter
        value={props.width}
        onChange={(value: number) => props.onChange(value, props.height)}
      />
      <div className="bsp-text">height</div>
      <NumberSetter
        value={props.height}
        onChange={(value: number) => props.onChange(props.width, value)}
      />
    </div>
  )
}
