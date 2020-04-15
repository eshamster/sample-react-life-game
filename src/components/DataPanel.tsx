import * as React from 'react'

type DataPanelProps = {
  onClickCopy: () => void;
  onClickEdit: () => void;
}

export default function DataPanel(props: DataPanelProps) {
  return (
    <div className="data-panel">
      <button
        className="data-panel__edit"
        onClick={() => props.onClickEdit()}
      >
        Edit
      </button>
      <button
        className="data-panel__copy"
        onClick={() => props.onClickCopy()}
      >
        Copy
      </button>
      <div/>
    </div>
  )
}
