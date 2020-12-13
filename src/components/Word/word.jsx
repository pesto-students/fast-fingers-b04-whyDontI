import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';
import './word.css';

import { GameContext } from '../../contexts/context';

const Word = ({ getNewWord }) => {
  const { gameState, dispatch } = useContext(GameContext);
  const {
    currentWord,
  } = gameState;
  const [wordHtml, setWordHtml] = useState('');
  const [inputWord, setInputWord] = useState('');
  const inputRef = useRef();

  const doesWordsMatch = (ipWord, originalWord) => {
    const upperCasedInputWord = ipWord.toUpperCase();
    const upperCasedOriginalWord = originalWord.toUpperCase();
    if (upperCasedInputWord.length !== upperCasedOriginalWord.length) {
      return false;
    }

    for (let i = 0; i < upperCasedOriginalWord.length; i += 1) {
      if (upperCasedOriginalWord[i] !== upperCasedInputWord[i]) {
        return false;
      }
    }
    return true;
  };

  const handleWordStyle = (newWord) => {
    const upperCasedCurrentWord = currentWord.toUpperCase().split('');
    const upperCasedNewWord = newWord.toUpperCase();

    setWordHtml(
      upperCasedCurrentWord.map((c, i) => (<span key={uuid()} className={(c === upperCasedNewWord[i]) ? 'wordMatch' : 'wordMismatch'}>{upperCasedCurrentWord[i]}</span>)),
    );
  };

  const handleWordInput = (newWord) => {
    if (newWord.length === currentWord.length && doesWordsMatch(newWord, currentWord)) {
      setInputWord(newWord);
      setInputWord('');
      getNewWord();
      dispatch({
        type: 'UPDATE_SCORE',
      });
    } else {
      setInputWord(newWord);
      handleWordStyle(newWord);
    }
  };

  useEffect(() => {
    handleWordStyle('');
    inputRef.current.focus();
  }, [currentWord]);

  return (
    <>
      <span className="wordToType">{wordHtml}</span>
      <input ref={inputRef} type="text" className="inputBox" value={inputWord} onChange={(e) => handleWordInput(e.target.value)} />
    </>
  );
};

Word.propTypes = {
  getNewWord: PropTypes.func.isRequired,
};

export default Word;
