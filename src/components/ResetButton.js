import React from 'react'

export default function ResetButton(props) {
  return (
    <button
      className="reset-btn"
      onClick={() => props.onClick()}
    >
      Reset
    </button>
  )
}
