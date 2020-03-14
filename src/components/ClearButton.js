import React from 'react'

export default function StepButton(props) {
  return (
    <button
      className="clear-btn"
      onClick={() => props.onClick()}
    >
      Clear
    </button>
  )
}
