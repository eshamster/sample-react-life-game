import React from 'react'
import NumberSelector from './NumbersSelector'

export default function CellCondPanel(props) {
  return (
    <ul>
      <li>
        BORN: Required around cells to born
        <NumberSelector
          maxNum={8}
          selectedValues={props.countsToBorn}
          onClickNum={n => props.onClickBornNum(n)}
        />
      </li>
      <li>
        KEEP: Required around cells to keep living
        <NumberSelector
          maxNum={8}
          selectedValues={props.countsToKeep}
          onClickNum={n => props.onClickKeepNum(n)}
        />
      </li>
    </ul>
  )
}
