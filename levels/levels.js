/**
 * Created the level with the difficulty
 * @param {string} difficulty - difficulty of level
 */
function createdLevel(difficulty) {
  let level;

  switch (difficulty) {
    case "hard":
      level = new Level(12, 3, 3, 15, 10);
      break;
    case "medium":
      level = new Level(8, 2, 2, 10, 10);
      break;
    default:
      level = new Level(4, 1, 1, 5, 10);
      break;
  }
  world.startGame(level);
}
