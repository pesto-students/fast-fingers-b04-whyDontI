import React, { useEffect, useContext, useState } from 'react';
import data from '../../assets/data/dictionary.json'
import Header from '../Header/header';
import History from '../History/history'
import Word from '../Word/word';
import Timer from '../Timer/timer';
import './arena.css'

import { GameContext } from '../../contexts/context'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getWord(difficultyLevel) {
  let words = []
  if (difficultyLevel === 'Easy') {
    words = data.filter((word) => word.length <= 4)
  } else if (difficultyLevel === 'Medium') {
    words = data.filter((word) => (word.length >= 5 && word.length <= 8))
  } else if (difficultyLevel === 'Hard') {
    words = data.filter((word) => word.length > 8)
  }
  return words[getRandomInt(words.length)]
}

const Arena = () => {
  const { gameState } = useContext(GameContext)
  const [word, setWord] = useState('')
  useEffect(() => {
    const newWord = getWord(gameState.difficulty)
    setWord(newWord)
    console.log(newWord)
  }, [])

  return (
    <div className="arenaContainer">
      <div className="header">
        <Header></Header>
      </div>
      <div className="history">
        <History></History>
      </div>
      <div className="arena">
        <Timer wordLength={word.length} difficultyFactor={gameState.difficultyFactor} />
        <Word word={word} />
      </div>
    </div>
  )
}

export default Arena;