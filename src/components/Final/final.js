import React, { useContext } from 'react';
import Header from '../Header/header'
import { Link } from "@reach/router";
import { GameContext } from '../../contexts/context'
import reloadIcon from '../../assets/images/icon-open-reload.svg'

import './final.css'

const Final = () => {

  const handleStartGame = (e) => {
    const localStorageState = localStorage.getItem('gameState')
    const gameData = ((localStorageState === null) ? {} : JSON.parse(localStorageState))
    e.preventDefault()

    dispatch({
      type: 'START_GAME',
      game: {
        ...gameData,
        gameStartTime: Date.now()
      }
    })
  }

  const { gameState, dispatch } = useContext(GameContext)
  const currentGame = gameState.previousGames[gameState.previousGames.length - 1]
  return (
    <div className="finalContainer">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <span className="game">Score: Game {currentGame.gameNumber}</span>
        <span className="score">{currentGame.score}:00</span>
        <div className="playAgain" onClick={handleStartGame}>
          <img src={reloadIcon} alt="" />
          <Link to="/arena">
            <span>Play Again</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Final;