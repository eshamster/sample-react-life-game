import * as React from 'react'
import './game.scss'
import Board from './Board'
import ControlPanel from './ControlPanel'
import BoardSizePanel from './BoardSizePanel'
import CellCondPanel from './CellCondPanel'
import HistoryPanel from './HistoryPanel'
import DataPanel from './DataPanel'
import Editor from './Editor/Editor'
import Cells from '../utils/Cells'
import LifeGame from '../utils/LifeGame'
import ClipBoard from '../utils/ClipBoard'

type GameProps = {
}

type Mode = "game" | "editor"

type GameState = {
  game: LifeGame;
  isPlaying: boolean;
  updateIntv: number;
  intvId: number | null;
  mode: Mode;
}

export default class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props)

    const width = 30
    const height = 25

    this.state = {
      game: new LifeGame(width, height),
      isPlaying: false,
      updateIntv: 100, /* ms */
      intvId: null,
      mode: "game", // game, editor
    }
  }

  // --- playing --- //

  play(updateIntv = this.state.updateIntv) {
    if (this.isPlaying()) {
      this.stop()
    }
    this.setState({
      isPlaying: true,
      intvId: window.setInterval(
        () => this.withSetGame(game => game.update()),
        updateIntv
      )
    })
  }

  stop() {
    if (!this.isPlaying() || this.state.intvId === null) {
      return
    }
    window.clearInterval(this.state.intvId)
    this.setState({
      isPlaying: false,
      intvId: null,
    })
  }

  isPlaying() {
    return this.state.isPlaying
  }

  togglePlaying() {
    if (this.state.isPlaying) {
      this.stop()
    } else {
      this.play()
    }
  }

  setUpdateInterval(value: number) {
    this.setState({updateIntv: value})
    if (this.isPlaying()) {
      this.play(value)
    }
  }

  // --- copy --- //

  copyBoard(cells: Cells) {
    const textCells = this.state.game.cellsToText(cells)
    alert("Copied the following to your clipboard\n-----\n" + textCells)
    ClipBoard.copy(textCells)
  }

  // --- edit --- //

  startEditor() {
    this.stop()
    this.setState({mode: "editor"})
  }

  cancelEditor() {
    this.setState({mode: "game"})
  }

  submitEditor(cells: Cells) {
    this.state.game.updateCells(cells)
    this.setState({mode: "game"})
  }

  // --- utils --- //

  withSetGame(func: (game: LifeGame) => LifeGame) {
    this.setState({game: func(this.state.game)})
  }

  // --- render --- //

  renderGame() {
    return (
      <div>
        <BoardSizePanel
          width={this.state.game.getWidth()}
          height={this.state.game.getHeight()}
          onChange={(width: number, height: number) =>
            this.withSetGame(game => game.updateBoardSize(width, height))
          }
        />
        <div className="game__board-panel">
          <Board
            width={this.state.game.getWidth()}
            height={this.state.game.getHeight()}
            cellsState={this.state.game.getCells()}
            onClickCell={(x, y) =>
              this.withSetGame(game => game.toggleOneCellState(x, y))
            }
          />
          <HistoryPanel
            minIndex={this.state.game.getOldestHistoryIndex()}
            maxIndex={this.state.game.getLatestHistoryIndex()}
            value={this.state.game.getCurrentHistoryIndex()}
            onChange={value =>
              this.withSetGame(game => game.setHistoryIndex(value))
            }
          />
          <DataPanel
            onClickCopy={() => this.copyBoard(this.state.game.getCells())}
            onClickEdit={() => this.startEditor()}
          />
        </div>
        <ControlPanel
          isPlaying={this.state.isPlaying}
          onClickPlay={() => this.togglePlaying()}
          updateIntv={this.state.updateIntv}
          onChangeInterval={value => this.setUpdateInterval(value)}
          onClickStep={() => this.withSetGame(game => game.update())}
          onClickClear={() => this.withSetGame(game => game.killAllCells())}
          onClickReset={() =>
            this.withSetGame(game =>
              game.updateCells(Cells.initRandomly(game.getWidth(), game.getHeight()))
            )
          }
        />
        <CellCondPanel
          countsToBorn={this.state.game.getCountsToBorn()}
          onClickBornNum={n => this.withSetGame(game => game.toggleCountsToBorn(n))}
          countsToKeep={this.state.game.getCountsToKeep()}
          onClickKeepNum={n => this.withSetGame(game => game.toggleCountsToKeep(n))}
        />
      </div>
    )
  }

  render() {
    const mode = this.state.mode

    switch (mode) {
    case "game":
      return this.renderGame()
    case "editor":
      return (
        <div>
          <Editor
            currentCells={this.state.game.getCells()}
            onClickCancel={() => this.cancelEditor()}
            onClickSubmit={(cells: Cells) => this.submitEditor(cells)}
          />
        </div>
      )
    default:
      throw new Error(`Error: Not recognized mode ${mode}`)
    }
  }
}
