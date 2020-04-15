import * as React from 'react';

type CellProps = {
  isLive: boolean;
  onClick: () => void;
}

export default function Cell(props: CellProps) {
  return (
    <button
      className={(props.isLive ? "cell__live" : "cell__dead")}
      onClick={() => props.onClick()}
    >
    </button>
  )
}
