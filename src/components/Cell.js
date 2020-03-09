import React from 'react';

export default function Cell(props) {
  return (
    <button
      className={props.isLive ? "cell cell-live" : "cell cell-dead"}>
    </button>
  )
}
