import * as React from 'react';

type CellProps = {
  isLive: boolean;
  onClick: () => void;
}

export default function Cell(props: CellProps) {
  return (
    <button
      className={"cell " + (props.isLive ? "cell-live" : "cell-dead")}
      onClick={() => props.onClick()}
    >
    </button>
  )
}
