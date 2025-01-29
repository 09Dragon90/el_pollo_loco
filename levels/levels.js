function createdLevel(difficulty) {
  let level;

  switch (difficulty) {
    case "hard":
      level = new Level(4, 1, 10, 10);
      break;
    case "medium":
      level = new Level(4, 1, 10, 10);
      break;
    default:
      level = new Level(4, 1, 10, 10);
      break;
  }
  world.startGame(level);
}
