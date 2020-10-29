function startGame(state, game) {
  const newState = {
    ...state,
    playerName: game.playerName,
    difficulty: game.difficulty,
    difficultyFactor: game.difficultyFactor,
    gameStartTime: game.gameStartTime,
    score: 0
  }

  localStorage.setItem('gameState', JSON.stringify(newState))
  return newState
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

      }
    ],
    gameNumber: state.gameNumber + 1
  }

  localStorage.setItem('gameState', JSON.stringify(newState))
  return newState
}

function showNewWord(state, game) {
  const newDifficultyFactor = state.difficultyFactor + 0.01
  let difficulty = 'Easy'
  if (newDifficultyFactor >= 1.5) {
    difficulty = 'Medium'
  }
  if (newDifficultyFactor >= 2) {
    difficulty = 'Hard'
  }
  const newState = {
    ...state,
    currentWord: game.currentWord,
    difficulty,
    difficultyFactor: newDifficultyFactor
  }

  localStorage.setItem('gameState', JSON.stringify(newState))
  return newState
}

function updateScore(state) {
  const newState = {
    ...state,
    score: Math.round((Date.now() - state.gameStartTime) / 1000)
  }

  localStorage.setItem('gameState', JSON.stringify(newState))
  return newState
}

function resetScore(state) {
  const newState = {
    ...state,
    score: 0,
    gameStartTime: Date.now()
  }

  localStorage.setItem('gameState', JSON.stringify(newState))
  return newState
}

export const GameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return startGame(state, action.game)
    case 'END_GAME':
      return endGame(state, action.game)
    case 'SHOW_NEW_WORD':
      return showNewWord(state, action.game)
    case 'UPDATE_SCORE':
      return updateScore(state, action.game)
    case 'RESET_SCORE':
      return resetScore(state, action.game)
    default:
      return state
  }
}