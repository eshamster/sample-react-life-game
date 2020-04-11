import * as React from 'react'

type ResetButtonProps = {
  onClick: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
  return (
    <button
      className="reset-btn"
      onClick={() => props.onClick()}
    >
      Reset
    </button>
  )
}
