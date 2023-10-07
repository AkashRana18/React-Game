import './style.scss';
import { useState } from 'react';
import Board from './components/Board';
import calculateWinner from '../calculatorWinner';

function App() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setXIsNext] = useState(false);
  const winner = calculateWinner(square);
  const nextPLayer = `Next Player is ${isXNext ? 'X' : 'O'}`;
  const statusMessage = winner ? `Winner is ${winner}` : nextPLayer;

  const handleSquareClick = clickedPosition => {
    if (square[clickedPosition] || winner )
     return;

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
      <h2> {statusMessage} </h2>

      <Board square={square} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
