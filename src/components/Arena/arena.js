import React, { useEffect, useContext } from 'react';
import data from '../../assets/data/dictionary.json'
import Header from '../Header/header';
import History from '../History/history'
import Word from '../Word/word';
import Timer from '../Timer/timer';
import Footer from '../Footer/footer';
import './arena.css'

import { GameContext } from '../../contexts/context'

const Arena = () => {
  const { gameState, dispatch } = useContext(GameContext)
  const {
    difficulty,
    difficultyFactor,
    timeLimit,
    currentWord
  } = gameState

  const getNewWord = () => {
    let words = []
    const difficultyLevel = difficulty
    if (difficultyLevel === 'Easy') {
      words = data.filter((word) => word.length <= 4)
    } else if (difficultyLevel === 'Medium') {
      words = data.filter((word) => (word.length >= 5 && word.length <= 8))
    } else if (difficultyLevel === 'Hard') {
      words = data.filter((word) => word.length > 8)
    }

    const newWord = words[getRandomInt(words.length)]

    dispatch({
      type: 'SHOW_NEW_WORD',
      game: {
        currentWord: newWord,
        timeLimit: Math.ceil(newWord.length / difficultyFactor)
      }
    })
  }

  useEffect(() => {
    const resetScore = () => {
      dispatch({
        type: 'RESET_SCORE'
      })
    }
    getNewWord()
    resetScore()
  }, [])

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
    <div className="arenaContainer">
      <div className="header">
        <Header />
      </div>
      <div className="history">
        <History />
      </div>
      <div className="arena">
        <Timer timeLimit={timeLimit} currentWord={currentWord} key={timeLimit + currentWord} />
        <Word getNewWord={getNewWord} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Arena;