const StatusMessage = ({ winner, gamingBoard }) => {
  const { square, isXNext } = gamingBoard;

  const noMovesLeft = square.every(el => el !== null);

  const nextPlayer = `${isXNext ? 'X' : 'O'}`;

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner is {''}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }
    if (!winner && noMovesLeft) {
      return (
        <>
          {' '}
          <span className="text-orange">O</span> and{' '}
          <span className="text-orange">X</span> tied
          {winner}
        </>
      );
    }
    if (!winner && !noMovesLeft) {
      return (
        <>
          Next player is {''}
          <span className={isXNext ? 'text-green' : 'text-orange'}>
            {nextPlayer}
          </span>
        </>
      );
    }

    return null;
  };

  return <div className="status-message">{renderStatusMessage()}</div>;
};
export default StatusMessage;
