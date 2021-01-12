import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { GameReducer } from '../reducers/gameReducer';

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
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
    timeLimit: 0,
    inputWord: '',
    gameOver: false,
  });

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameContextProvider;
