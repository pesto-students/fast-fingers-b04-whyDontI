import React, { useContext } from 'react';
import { GameContext } from '../../contexts/context';

import styles from './history.module.css';

const History = () => {
  const { gameState } = useContext(GameContext);
  const maxScore = gameState.previousGames.reduce(
    (max, current) => ((max < current.score) ? current.score : max),
    0,
  );

  return (
    <div className={styles.historyContainer}>
      <div className={styles.heading}>Score Board</div>
      <div className={styles.gamelist}>
        {
          gameState.previousGames.map((v) => {
            const personalBest = (v.score === maxScore)
              && <span className={styles.tinyFont}>Personal Best</span>;
            return (
              <div key={v.gameNumber} className={styles.gameScore}>
                { personalBest}
                <span>
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
          })
        }
      </div>
    </div>
  );
};

export default History;
