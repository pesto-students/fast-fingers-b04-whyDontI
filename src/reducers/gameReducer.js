const TYPES = {
  START_GAME: 'START_GAME',
  END_GAME: 'END_GAME',
  SHOW_NEW_WORD: 'SHOW_NEW_WORD',
  UPDATE_SCORE: 'UPDATE_SCORE',
  RESET_SCORE: 'RESET_SCORE',
};

function getPlayerName() {
  return localStorage.getItem('playerName');
}

function startGame(state, game) {
  const prevState = JSON.parse(localStorage.getItem(game.playerName)) || {};
  const newState = {
    ...state,
    score: 0,
    gameOver: false,
    gameNumber: 1,
    previousGames: [],
    currentWord: '',
    timeLimit: 0,
    inputWord: '',
    ...prevState,
    playerName: game.playerName,
    difficulty: game.difficulty,
    difficultyFactor: game.difficultyFactor,
    gameStartTime: game.gameStartTime,
  };

  localStorage.setItem('playerName', newState.playerName);
  localStorage.setItem(getPlayerName(), JSON.stringify(newState));
  return newState;
}

function endGame(state, game) {
  const newState = {
    ...state,
    gameEndTime: game.gameEndTime,
    score: 0,
    previousGames: [
      ...state.previousGames,
      {
        gameNumber: state.gameNumber,
        score: Math.round((game.gameEndTime - state.gameStartTime) / 1000),
      },
    ],
    gameNumber: state.gameNumber + 1,
    gameOver: true,
  };

  localStorage.setItem(getPlayerName(), JSON.stringify(newState));
  return newState;
}

function showNewWord(state, game) {
  const newDifficultyFactor = state.difficultyFactor + 0.01;
  let difficulty = 'Easy';
  if (newDifficultyFactor >= 1.5) {
    difficulty = 'Medium';
  }
  if (newDifficultyFactor >= 2) {
    difficulty = 'Hard';
  }
  const newState = {
    ...state,
    currentWord: game.currentWord,
    timeLimit: game.timeLimit,
    difficulty,
    difficultyFactor: newDifficultyFactor,
  };

  localStorage.setItem(getPlayerName(), JSON.stringify(newState));
  return newState;
}

function updateScore(state) {
  const newState = {
    ...state,
    score: Math.round((Date.now() - state.gameStartTime) / 1000),
  };

  localStorage.setItem(getPlayerName(), JSON.stringify(newState));
  return newState;
}

function resetScore(state) {
  const newState = {
    ...state,
    score: 0,
    gameStartTime: Date.now(),
  };

  localStorage.setItem(getPlayerName(), JSON.stringify(newState));
  return newState;
}

const GameReducer = (state, action) => {
  switch (action.type) {
    case TYPES.START_GAME:
      return startGame(state, action.game);
    case TYPES.END_GAME:
      return endGame(state, action.game);
    case TYPES.SHOW_NEW_WORD:
      return showNewWord(state, action.game);
    case TYPES.UPDATE_SCORE:
      return updateScore(state, action.game);
    case TYPES.RESET_SCORE:
      return resetScore(state, action.game);
    default:
      return state;
  }
};

export {
  GameReducer,
  TYPES,
};
