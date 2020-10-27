import React, { createContext, useReducer } from 'react';
import { GameReducer } from '../reducers/gameReducer'

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const localStorageState = localStorage.getItem('gameState')
  const [gameState, dispatch] = useReducer(GameReducer, {
    playerName: '',
    previousGames: [],
    gameNumber: 1,
    gameStartTime: Date.now(),
    gameEndTime: Date.now(),
    score: 0,
    difficulty: 'Easy',
    difficultyFactor: 1,
    currentWord: '',
    inputWord: '',
    ...((localStorageState === null) ? {} : JSON.parse(localStorageState))
  });

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;