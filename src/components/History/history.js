import React, { useContext } from 'react';
import { GameContext } from '../../contexts/context';

import './history.css'

const History = () => {
  const { gameState } = useContext(GameContext)
  let maxScore = gameState.previousGames.reduce((a, c) => {
    return (a < c.score) ? a = c.score : a
  }, 0)

  return (
    <div className="historyContainer">
      <div className="heading">Score Board</div>
      <div className="gamelist">
        {gameState.previousGames.map((v, i) => {
          let personalBest = (v.score === maxScore) && <span className="tinyFont">Personal Best</span>;
          return (
            <div className="gameScore" key={i}>
              {personalBest}
              <span key={i}>Game {v.gameNumber} - {v.score}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default History;