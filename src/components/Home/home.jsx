import React, { useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import keyboardIcon from '../../assets/images/icon-awesome-keyboard.svg';
import playIcon from '../../assets/images/icon-play.svg';
import { GameContext } from '../../contexts/context';
import { getDifficultyFactor } from '../../util/commonFunctions';
import './home.css';

const Home = () => {
  const { dispatch, gameState } = useContext(GameContext);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() === '') {
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
    <div className="container">
      <div className="content">
        <img src={keyboardIcon} className="keyboardIcon" alt="Keyboard Icon" />
        <div className="gameTitle">Fast Fingers</div>
        <div className="dialogueBox">
          <div className="horizontalLine" />
          <div className="gameDescription">the ultimate typing game</div>
          <div className="horizontalLine" />
        </div>
        <div className="inputContainer">
          <input type="text" placeholder="Type your name" value={playerName} className="inputBox" onChange={(e) => setPlayerName(e.target.value)} required />
          {!playerName.length && <span className="validationError">Name field is required</span>}
          <select placeholder="Difficulty level" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="inputBox">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="action" role="button" tabIndex={0} onKeyDown={handleStartGame} onClick={handleStartGame}>
          <img src={playIcon} alt="" />
          <span className="headingStartGame">Start Game</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
