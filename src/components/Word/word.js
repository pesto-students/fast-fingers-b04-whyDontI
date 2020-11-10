import React, { useEffect, useState, useContext } from 'react';
import './word.css'

import { GameContext } from '../../contexts/context'

const Word = (props) => {
  const { gameState, dispatch } = useContext(GameContext)
  const {
    currentWord
  } = gameState
  useEffect(() => {
    handleWordStyle('')
  }, [currentWord])

  const [wordHtml, setWordHtml] = useState('')
  const [inputWord, setInputWord] = useState('')

  const doesWordsMatch = (ipWord, originalWord) => {
    const inputWord = ipWord.toUpperCase()
    const word = originalWord.toUpperCase()
    if (inputWord.length !== word.length) {
      return false
    }

    for (let i = 0; i < word.length; i++) {
      if (word[i] !== inputWord[i]) {
        return false
      }
    }
    return true
  }

  const handleWordStyle = (inputWord) => {
    const word = currentWord.toUpperCase().split('')
    const newWord = inputWord.toUpperCase()

    let wordHtml = word.map((c, i) => {
      return (<span key={i} className={(newWord[i] === word[i]) ? 'wordMatch' : 'wordMismatch'}>{word[i]}</span>)
    })

    setWordHtml(wordHtml)
  }

  const handleWordInput = (newWord) => {
    if (newWord.length === currentWord.length && doesWordsMatch(newWord, currentWord)) {
      setInputWord(newWord)
      setInputWord('')
      props.getNewWord()
      dispatch({
        type: 'UPDATE_SCORE'
      })
    } else {
      setInputWord(newWord)
      handleWordStyle(newWord)
    }
  }

  return (
    <>
      <span className="wordToType">{wordHtml}</span>
      <input type="text" className="inputBox" value={inputWord} onChange={(e) => handleWordInput(e.target.value)} autoFocus />
    </>
  )
};

export default Word;