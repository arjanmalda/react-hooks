import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )
  const [history, setHistory] = useLocalStorageState('history', [squares])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 1)

  function selectSquare(square) {
    const winner = calculateWinner(squares)
    if (!!winner || !!squares[square]) return

    const copiedSquares = [...squares]

    const nextValue = calculateNextValue(squares)
    copiedSquares[square] = nextValue

    setCurrentStep(previousValue => previousValue + 1)
    setSquares(copiedSquares)
    setHistory([...history, copiedSquares])
  }

  function handleSetHistory(index) {
    setCurrentStep(index + 1)
    setSquares(history[index])
  }

  function restart() {
    const resetSquares = Array(9).fill(null)
    setCurrentStep(1)
    setSquares(resetSquares)
    setHistory([resetSquares])
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">
        {calculateStatus(
          calculateWinner(squares),
          squares,
          calculateNextValue(squares),
        )}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <History
        history={history}
        handleSetHistory={handleSetHistory}
        currentStep={currentStep}
      />
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function History({history, handleSetHistory, currentStep}) {
  return (
    <div className="history">
      <h2>History</h2>
      <ol>
        {history.map((item, index) => {
          console.log(index === currentStep - 1)
          return (
            <li key={index}>
              <button
                disabled={index === currentStep - 1}
                onClick={() => handleSetHistory(index)}
              >
                {getButtonContent(index, currentStep)}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function getButtonContent(index, currentStep) {
  return index === currentStep - 1
    ? `Go to move #${index + 1} (Current step)`
    : index === 0
    ? 'Go to game start'
    : `Go to move #${index + 1}`
}

function App() {
  return <Game />
}

export default App
