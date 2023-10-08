import './style.scss';
import { useState } from 'react';
import Board from './components/Board';
import calculateWinner from '../calculatorWinner';
import StatusMessage from './components/StatusMessage';

function App() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setXIsNext] = useState(false);
  const winner = calculateWinner(square);

  const handleSquareClick = clickedPosition => {
    if (square[clickedPosition] || winner) return;

    setSquare(currentSquare => {
      return currentSquare.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squareValue;
      });
    });
    setXIsNext(prev => !prev);
  };

  return (
    <div className="app">
      <h1 className="my-Heading">Tic Tac Toe </h1>
      <StatusMessage winner={winner} isXNext={isXNext} square={square} />

      <Board square={square} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
