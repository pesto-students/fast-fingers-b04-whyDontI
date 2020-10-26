export const GameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        playerName: action.game.playerName,
        difficulty: action.game.difficulty,
        gameStartTime: action.game.gameStartTime
      }
    case 'END_GAME':
      return { // TODO: Write separate functions, write variables
        ...state,
        gameEndTime: action.game.gameEndTime,
        score: action.game.gameEndTime - state.gameStartTime,
        previousGames: [
          ...state.previousGames,
          {
            gameNumber: state.gameNumber,
            score: action.game.gameEndTime - state.gameStartTime
          }
        ],
        gameNumber: state.gameNumber + 1
      }
    default:
      return state
  }
}