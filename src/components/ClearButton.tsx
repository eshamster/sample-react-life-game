import * as React from 'react'

type ClearButtonProps = {
  onClick: () => void;
}

export default function ClearButton(props: ClearButtonProps) {
  return (
    <button
      className="clear-btn"
      onClick={() => props.onClick()}
    >
      Clear
    </button>
  )
}
