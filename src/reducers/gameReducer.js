function startGame(state, game) {
  const newState = {
    ...state,
    playerName: game.playerName,
    difficulty: game.difficulty,
    gameStartTime: game.gameStartTime
  }

  localStorage.setItem('gameState', JSON.stringify(newState))
  return newState
}

function endGame(state, game) {
  const newState = { // TODO: Write separate functions, write variables
    ...state,
    gameEndTime: game.gameEndTime,
    score: game.gameEndTime - state.gameStartTime,
    previousGames: [
      ...state.previousGames,
      {
        gameNumber: state.gameNumber,
        score: game.gameEndTime - state.gameStartTime
      }
    ],
    gameNumber: state.gameNumber + 1
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
    default:
      return state
  }
}