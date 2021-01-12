import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { GameContext } from '../../contexts/context';

import userIcon from '../../assets/images/Icon-material-person.svg';
import gamepadIcon from '../../assets/images/Icon-awesome-gamepad.svg';
import styles from './header.module.css';

const Header = () => {
  const { gameState, dispatch } = useContext(GameContext);
  function handleNavigateHome() {
    dispatch({
      type: 'END_GAME',
      game: {
        gameEndTime: Date.now(),
      },
    });
    navigate('/');
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <div className={styles.info}>
          <img src={userIcon} alt="User Icon " />
          {gameState.playerName}
        </div>
        <div className={styles.info}>
          <img src={gamepadIcon} alt="Gamepad Icon" />
          {`${gameState.difficulty}`}
        </div>
      </div>
      <div className={styles.headerSection}>
        <div className={`${styles.info} ${styles.textRight}`} role="button" tabIndex={0} onKeyDown={handleNavigateHome} onClick={handleNavigateHome}>
          Fast Fingers
        </div>
        <div className={`${styles.info} ${styles.textRight}`}>
          {`Score: ${gameState.score}`}
        </div>
      </div>
    </div>
  );
};

export default Header;
