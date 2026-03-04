import { useState } from "react";
import "./App.css";

function Square(props) {
  return (
    <button onClick={props.handleClick} className="square">
      {props.value}
    </button>
  );
}

function Board({ squares, xIsNext, onPlay }) {
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
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let state = winner
    ? winner === "X"
      ? "X win"
      : "O win"
    : `Next player: :${xIsNext ? "X" : "O"}`;

  return (
    <>
      {state}
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} handleClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} handleClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} handleClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} handleClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} handleClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} handleClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];

  const xIsNext = currentMove % 2 === 0;
  function handlePlay(nextSquares) {
    // 重新设置，裁剪当前步数之后的
    let arr = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(arr);
    setCurrentMove(arr.length - 1);
  }

  const moves = history.map((square, index) => {
    let description;
    if (index > 0) {
      description = "Go to move#" + index;
    } else {
      description = "Go to game start";
    }

    return (
      <ol>
        <button key={index} onClick={() => jumpTo(index)}>
          {description}
        </button>
      </ol>
    );
  });

  function jumpTo(index: number) {
    setCurrentMove(index);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquare}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
