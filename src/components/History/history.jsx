import React, { useContext } from 'react';
import { GameContext } from '../../contexts/context';

import './history.css';

const History = () => {
  const { gameState } = useContext(GameContext);
  const maxScore = gameState.previousGames.reduce(
    (max, current) => ((max < current.score) ? current.score : max),
    0,
  );

  return (
    <div className="historyContainer">
      <div className="heading">Score Board</div>
      <div className="gamelist">
        {gameState.previousGames.map((v) => {
          const personalBest = (v.score === maxScore) && <span className="tinyFont">Personal Best</span>;
          return (
            <div className="gameScore">
              {personalBest}
              <span key={v.gameNumber}>
                Game
                {' '}
                {v.gameNumber}
                {' '}
                :
                {' '}
                {v.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
