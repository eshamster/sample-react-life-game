import React from 'react'

function NumButton(props) {
  return (
    <button
      className={props.isSelected ?
                 "ns-btn ns-btn-selected" :
                 "ns-btn ns-btn-not-selected"}
      onClick={() => props.onClick()}>
      {props.value}
    </ button>
  )
}

export default function NumbersSelector(props) {
  const maxNum = props.maxNum
  const btns = Array(maxNum)

  for (let i = 0; i <= maxNum; i++){
    btns[i] = (
      <NumButton
        value={i}
        isSelected={props.selectedValues.includes(i)}
        onClick={() => props.onClickNum(i)}
      />
    )
  }
  
  return (
    <div>{btns}</div>
  )
}
