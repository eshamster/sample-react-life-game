import * as React from 'react'
import './numbers-selector.scss'

type NumButtonProps = {
  value: number;
  isSelected: boolean;
  onClick: () => void;
}

function NumButton(props: NumButtonProps) {
  return (
    <button
      className={props.isSelected ?
                 "numbers-selector__button--selected" :
                 "numbers-selector__button--not-selected"}
      onClick={() => props.onClick()}>
      {props.value}
    </ button>
  )
}

type NumbersSelectorProps = {
  maxNum: number;
  selectedValues: number[];
  onClickNum: (value: number) => void;
}

export default function NumbersSelector(props: NumbersSelectorProps) {
  const maxNum = props.maxNum
  const btns = Array(maxNum)

  for (let i = 0; i <= maxNum; i++){
    btns[i] = (
      <NumButton
        key={i}
        value={i}
        isSelected={props.selectedValues.includes(i)}
        onClick={() => props.onClickNum(i)}
      />
    )
  }
  
  return (
    <div className="numbers-selector">{btns}</div>
  )
}
