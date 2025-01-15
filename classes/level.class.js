class Level {
  enemies = [];
  backgroundObjects = [];
  cloud = new Cloud();
  width = 1439;
  lengthOfLevel;

  constructor(numbersOfEnemies = 1, numbersOfBackground = 1) {
    this.lengthOfLevel = numbersOfBackground * this.width;
    this.createBackground(numbersOfBackground);
    this.createEnemies(numbersOfEnemies, this.lengthOfLevel);
  }

  createEnemies(numbers, lengthOfLevel) {
    for (let index = 0; index < numbers; index++) {
      this.enemies.push(new Chicken(lengthOfLevel));
    }
    this.enemies.push(new Endboss(lengthOfLevel));
  }

  createBackground(numbers) {
    this.backgroundObjects = [
      new BackgroundObject(
        "assets/img/5_background/layers/air.png",
        -this.width
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/full.png",
        -this.width
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/full.png",
        -this.width
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/full.png",
        -this.width
      ),
    ];
    for (let index = 0; index < numbers; index++) {
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/air.png",
          this.width * index
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/3_third_layer/full.png",
          this.width * index
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/2_second_layer/full.png",
          this.width * index
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          "assets/img/5_background/layers/1_first_layer/full.png",
          this.width * index
        )
      );
    }
  }
}
