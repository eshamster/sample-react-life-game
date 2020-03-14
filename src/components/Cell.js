import React from 'react';

export default function Cell(props) {
  return (
    <button
      className={"cell " + (props.isLive ? "cell-live" : "cell-dead")}
      onClick={() => props.onClick()}
    >
    </button>
  )
}
