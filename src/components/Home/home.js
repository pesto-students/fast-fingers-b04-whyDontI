import React, { useContext, useState } from 'react';
import keyboardIcon from '../../assets/images/icon-awesome-keyboard.svg';
import playIcon from '../../assets/images/icon-play.svg'
import { GameContext } from '../../contexts/context';
import './home.css'

const Home = () => {

  const { dispatch } = useContext(GameContext)

  const [playerName, setPlayerName] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const handleStartGame = (e) => {
    e.preventDefault()
    dispatch({
      type: 'START_GAME',
      game: {
        playerName,
        difficulty,
        gameStartTime: Date.now()
      }
    })
  }

  return (
    <div className="container">
      <div className="content">
        <img src={keyboardIcon} className="keyboardIcon" alt="Keyboard Icon" />
        <div className="gameTitle">Fast Fingers</div>
        <div className="dialogueBox">
          <div className="horizontalLine"></div>
          <div className="gameDescription">the ultimate typing game</div>
          <div className="horizontalLine"></div>
        </div>
        <div className="inputContainer">
          <input type="text" placeholder="Name" value={playerName} className="inputBox" onChange={(e) => setPlayerName(e.target.value)} required />
          <select placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="inputBox" >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="action" onClick={handleStartGame}>
          <img src={playIcon} alt="" />
          <h1>Start Game</h1>
        </div>
      </div>
    </div>
  )
};

export default Home;