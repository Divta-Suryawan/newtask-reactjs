/* eslint-disable react/prop-types */
import { useState } from "react";
import "./css/index.css";

function Squere({ value, onSquereClick }) {
  return (
    <button className="squere" onClick={onSquereClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < rules.length; i++) {
    const [a, b, c] = rules[i];
    if (squares[a] && squares[a] === squares[b] && squares[c]) {
      return squares[a];
    }
  }

  return false;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClcik(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSqueres = squares.slice();
    nextSqueres[i] = xIsNext ? "X" : "O";

    onPlay(nextSqueres);
  }

  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Squere value={squares[0]} onSquereClick={() => handleClcik(0)} />
        <Squere value={squares[1]} onSquereClick={() => handleClcik(1)} />
        <Squere value={squares[2]} onSquereClick={() => handleClcik(2)} />
        <Squere value={squares[3]} onSquereClick={() => handleClcik(3)} />
        <Squere value={squares[4]} onSquereClick={() => handleClcik(4)} />
        <Squere value={squares[5]} onSquereClick={() => handleClcik(5)} />
        <Squere value={squares[6]} onSquereClick={() => handleClcik(6)} />
        <Squere value={squares[7]} onSquereClick={() => handleClcik(7)} />
        <Squere value={squares[8]} onSquereClick={() => handleClcik(8)} />
      </div>
    </>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurretsMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurretsMove(nextMove);
  }

  function handlePlay(nextSqueres) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSqueres];
    setHistory(nextHistory);
    setCurretsMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let desc = " ";
    if (move > 0) {
      desc = "Go to move # " + move;
    } else {
      desc = "Go to start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}> {desc} </button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default App;
