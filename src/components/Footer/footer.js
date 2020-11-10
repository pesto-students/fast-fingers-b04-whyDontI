import React, { useContext } from 'react';
import { GameContext } from '../../contexts/context';
import { navigate, useLocation } from "@reach/router"
import quitIcon from '../../assets/images/icon-metro-cross.svg'
import './footer.css'

const Footer = ({
  stopGameText,
  redirectTo
}) => {

  const { dispatch } = useContext(GameContext)
  const location = useLocation()
  function gameOver() {
    dispatch({
      type: 'END_GAME',
      game: {
        gameEndTime: Date.now()
      }
    })
    if (location.pathname === '/arena') {
      navigate('/final')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="footerContainer" onClick={gameOver}>
      <div className="footerInfo">
        <img src={quitIcon} alt="" className="" />
        <span className="">{(location.pathname === '/arena') ? 'Stop Game' : 'Quit'}</span>
      </div>
    </div>
  )
}

export default Footer;