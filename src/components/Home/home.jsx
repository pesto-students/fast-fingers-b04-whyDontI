import React, { useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import keyboardIcon from '../../assets/images/icon-awesome-keyboard.svg';
import playIcon from '../../assets/images/icon-play.svg';
import { GameContext } from '../../contexts/context';
import { getDifficultyFactor } from '../../util/commonFunctions';
import styles from './home.module.css';

const Home = () => {
  const { dispatch, gameState } = useContext(GameContext);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [error, setError] = useState('');

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() === '') {
      setError('Name field is required');
      return;
    }

    dispatch({
      type: 'START_GAME',
      game: {
        playerName,
        difficulty,
        difficultyFactor: getDifficultyFactor(difficulty),
        gameStartTime: Date.now(),
      },
    });
    navigate('/arena');
  };

  useEffect(() => {
    const loadInitialData = () => {
      if (gameState) {
        setPlayerName(gameState.playerName);
        setDifficulty(gameState.difficulty);
      }
    };

    loadInitialData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={keyboardIcon} className={styles.keyboardIcon} alt="Keyboard Icon" />
        <div className={styles.gameTitle}>Fast Fingers</div>
        <div className={styles.dialogueBox}>
          <div className={styles.horizontalLine} />
          <div className={styles.gameDescription}>the ultimate typing game</div>
          <div className={styles.horizontalLine} />
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Type your name" value={playerName} className="inputBox" onChange={(e) => setPlayerName(e.target.value)} required />
          {
            !!error.length
            && <span className={styles.validationError}>{error}</span>
          }
          <select placeholder="Difficulty level" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="inputBox">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className={styles.action} role="button" tabIndex={0} onKeyDown={handleStartGame} onClick={handleStartGame}>
          <img src={playIcon} alt="" />
          <span className={styles.headingStartGame}>Start Game</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
