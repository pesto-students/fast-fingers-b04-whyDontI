import React, { useEffect, useState } from 'react';
import './word.css'

const Word = (props) => {
  useEffect(() => {
    handleWordStyle('')
  }, [props.word])
  const [wordHtml, setWordHtml] = useState('')

  const handleWordStyle = (inputWord) => {
    console.log('inputWord === ', inputWord, props.word)
    const word = props.word.split('')
    let wordHtml = word.map((c, i) => {
      return (<span className={(inputWord[i] === word[i]) ? 'wordMatch' : 'wordMismatch'}>{word[i]}</span>)
    })

    setWordHtml(wordHtml)
  }

  return (
    <>
      <span className="wordToType">{wordHtml}</span>
      <input type="text" className="inputBox" onChange={(e) => handleWordStyle(e.target.value)} />
    </>
  )
};

export default Word;