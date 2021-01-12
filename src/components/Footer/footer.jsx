import React, { useContext } from 'react';
import { navigate, useLocation } from '@reach/router';
import { GameContext } from '../../contexts/context';
import quitIcon from '../../assets/images/icon-metro-cross.svg';
import styles from './footer.module.css';

const Footer = () => {
  const { dispatch } = useContext(GameContext);
  const location = useLocation();
  function gameOver() {
    dispatch({
      type: 'END_GAME',
      game: {
        gameEndTime: Date.now(),
      },
    });
    if (location.pathname === '/arena') {
      navigate('/final');
    } else {
      navigate('/');
    }
  }

  return (
    <div className={styles.footerContainer} role="button" tabIndex={0} onKeyDown={gameOver} onClick={gameOver}>
      <div className={styles.footerInfo}>
        <img src={quitIcon} alt="" />
        <span>{(location.pathname === '/arena') ? 'Stop Game' : 'Quit'}</span>
      </div>
    </div>
  );
};

export default Footer;
