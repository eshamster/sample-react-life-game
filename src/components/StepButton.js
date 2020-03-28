import React from 'react'

export default function StepButton(props) {
  return (
    <button
      className="step-btn"
      onClick={() => props.onClick()}
    >
      Next Step
    </button>
  )
}