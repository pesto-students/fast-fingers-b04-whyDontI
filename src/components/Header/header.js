import React, { useContext } from 'react';
import { GameContext } from '../../contexts/context';
import { navigate } from "@reach/router"

import userIcon from '../../assets/images/Icon-material-person.svg'
import gamepadIcon from '../../assets/images/Icon-awesome-gamepad.svg'
import './header.css'

const Header = () => {

  const { gameState, dispatch } = useContext(GameContext)
  function handleNavigateHome() {
    dispatch({
      type: 'END_GAME',
      game: {
        gameEndTime: Date.now()
      }
    })
    navigate('/')
  }
  return (
    <div className="headerContainer">
      <div className="info">
        <img src={userIcon} alt="" className="" />
        {gameState.playerName}
      </div>
      <div className="info text-right" onClick={handleNavigateHome}>
        {"Fast Fingers"}
      </div>
      <div className="info">
        <img src={gamepadIcon} alt="" className="" />
        {`Level: ${gameState.difficulty}`}
      </div>
      <div className="info text-right">
        {`Score: ${gameState.score}`}
      </div>
      <img src="" alt="" className="" />
    </div>
  )
}

export default Header;