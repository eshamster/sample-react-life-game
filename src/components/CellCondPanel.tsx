import * as React from 'react'
import './cell-cond-panel.scss'
import NumberSelector from './NumbersSelector'

type CellCondPanelProps = {
  countsToBorn: number[];
  onClickBornNum: (n: number) => void;
  countsToKeep: number[];
  onClickKeepNum: (n: number) => void;
}

export default function CellCondPanel(props: CellCondPanelProps) {
  return (
    <ul className="cell-cond-panel__ul">
      <li>
        BORN: Required around cells to born
        <NumberSelector
          maxNum={8}
          selectedValues={props.countsToBorn}
          onClickNum={(n: number) => props.onClickBornNum(n)}
        />
      </li>
      <li>
        KEEP: Required around cells to keep living
        <NumberSelector
          maxNum={8}
          selectedValues={props.countsToKeep}
          onClickNum={(n: number) => props.onClickKeepNum(n)}
        />
      </li>
    </ul>
  )
}
