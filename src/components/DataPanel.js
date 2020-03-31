import React from 'react'

export default function DataPanel(props) {
  return (
    <div className="data-panel">
      <button
        className="data-panel-copy"
        onClick={() => props.onClickCopy()}
      >
        Copy
      </button>
      <button
        className="data-panel-edit"
        onClick={() => props.onClickEdit()}
      >
        Edit
      </button>
      <div/>
    </div>
  )
}
