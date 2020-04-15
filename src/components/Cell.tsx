import * as React from 'react';

type CellProps = {
  isLive: boolean;
  onClick: () => void;
}

export default function Cell(props: CellProps) {
  return (
    <button
      className={(props.isLive ? "board__cell--live" : "board__cell--dead")}
      onClick={() => props.onClick()}
    >
    </button>
  )
}
