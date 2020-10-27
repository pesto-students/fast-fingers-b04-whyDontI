function getDifficultyFactor(difficulty) {
  let difficultyFactor = 0
  console.log(difficulty)

  switch (difficulty) {
    case 'Easy':
      difficultyFactor = 1
      break;

    case 'Medium':
      difficultyFactor = 1.5
      break;

    case 'Hard':
      difficultyFactor = 2
      break;

    default:
      difficultyFactor = 1
  }

  return difficultyFactor
}

module.exports = {
  getDifficultyFactor
}