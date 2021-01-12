import React, { useContext } from 'react';
import { Link } from '@reach/router';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { GameContext } from '../../contexts/context';
import reloadIcon from '../../assets/images/icon-open-reload.svg';

import styles from './final.module.css';

const Final = () => {
  const { gameState, dispatch } = useContext(GameContext);

  const handleStartGame = (e) => {
    e.preventDefault();
    const playerName = localStorage.getItem('playerName');
    const localStorageState = localStorage.getItem(playerName);
    const gameData = (localStorageState ? JSON.parse(localStorageState) : {});

    dispatch({
      type: 'START_GAME',
      game: {
        ...gameData,
        gameStartTime: Date.now(),
      },
    });
  };

  const currentGame = gameState.previousGames[gameState.previousGames.length - 1];
  return (
    <div className={styles.finalContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <span className={styles.game}>
          Score: Game
          {' '}
          {currentGame.gameNumber}
        </span>
        <span className={styles.score}>
          {currentGame.score}
          :00
        </span>
        <div role="button" tabIndex={0} className={styles.playAgain} onKeyDown={handleStartGame} onClick={handleStartGame}>
          <img src={reloadIcon} alt="" />
          <Link to="/arena">
            <span>Play Again</span>
          </Link>
        </div>
        <div className={styles.finalFooter}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Final;
