import React, { useEffect, useContext, useState } from 'react';
import data from '../../assets/data/dictionary.json'
import Header from '../Header/header';
import History from '../History/history'
import Word from '../Word/word';
import Timer from '../Timer/timer';
import './arena.css'

import { GameContext } from '../../contexts/context'

const Arena = () => {
  const { gameState, dispatch } = useContext(GameContext)

  useEffect(() => {
    getNewWord()
  }, [])

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getNewWord = () => {

    let words = []
    const difficultyLevel = gameState.difficulty
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
        currentWord: newWord
      }
    })

  }

  return (
    <div className="arenaContainer">
      <div className="header">
        <Header></Header>
      </div>
      <div className="history">
        <History></History>
      </div>
      <div className="arena">
        <Timer />
        <Word getNewWord={getNewWord} />
      </div>
    </div>
  )
}

export default Arena;