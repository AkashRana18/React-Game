import './style.scss';
import { useState } from 'react';
import Board from './components/Board';
import calculateWinner from '../calculatorWinner';
import History from './components/History';
import StatusMessage from './components/statusMessage';

const NEW_GAME = [{ square: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState([NEW_GAME]);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  console.log({ history, currentMove });
  const winner = calculateWinner(gamingBoard.square);

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.square[clickedPosition] || winner) return;

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquareState = lastGamingState.square.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );
      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        square: nextSquareState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove(prev => prev + 1);
  };
  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      {/* <h1 className="my-Heading">Tic Tac Toe </h1> */}

      <StatusMessage winner={winner} gamingBoard={gamingBoard} />

      <Board
        square={gamingBoard.square}
        handleSquareClick={handleSquareClick}
      />
      <h2>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
