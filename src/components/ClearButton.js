import React from 'react'

export default function ClearButton(props) {
  return (
    <button
      className="clear-btn"
      onClick={() => props.onClick()}
    >
      Clear
    </button>
  )
}