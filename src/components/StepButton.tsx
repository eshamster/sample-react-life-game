import * as React from 'react'

type StepButtonProps = {
  onClick: () => void;
}

export default function StepButton(props: StepButtonProps) {
  return (
    <button
      className="step-btn"
      onClick={() => props.onClick()}
    >
      Next Step
    </button>
  )
}
