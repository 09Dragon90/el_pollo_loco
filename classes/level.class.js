class Level {
  enemies = [];
  backgroundObjects = [];
  cloud = new Cloud();

  constructor(numbersOfEnemies = 1, numbersOfBackground = 1) {
    this.createBackground(numbersOfBackground);
    this.createEnemies(numbersOfEnemies);
  }

  createEnemies(numbers) {
    for (let index = 0; index < numbers; index++) {
      this.enemies.push(new Chicken());
    }
  }

  createBackground(numbers) {
    let width = 1439;
    this.backgroundObjects = [
      new BackgroundObject("assets/img/5_background/layers/air.png", -width),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/full.png",
        -width
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/full.png",
        -width
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/full.png",
        -width
      ),
    ];
    for (let index = 0; index < numbers; index++) {
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/air.png",
          width * index
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/3_third_layer/full.png",
          width * index
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/2_second_layer/full.png",
          width * index
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/1_first_layer/full.png",
          width * index
        )
      );
    }
  }
}
