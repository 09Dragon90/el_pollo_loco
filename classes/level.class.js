class Level {
  enemies = [];
  backgroundObjects = [];
  clouds = [];
  width = 1439;
  lengthOfLevel;
  collectableItems = [];

  constructor(
    numbersOfEnemies = 1,
    numbersOfBackground = 1,
    numbersOfCoins = 1,
    numbersOfBottles = 1
  ) {
    this.lengthOfLevel = numbersOfBackground * this.width;
    this.createBackground(numbersOfBackground);
    this.createClouds(numbersOfBackground);
    this.createEnemies(numbersOfEnemies, this.lengthOfLevel);
    this.createCoins(numbersOfCoins, this.calLengthOfLevelItems());
    this.createBottles(numbersOfBottles, this.calLengthOfLevelItems());
  }

  createCoins(numbers, lengthOfLevel) {
    for (let index = 0; index < numbers; index++) {
      this.collectableItems.push(new CollectableObject("coin", lengthOfLevel));
    }
  }

  createBottles(numbers, lengthOfLevel) {
    for (let index = 0; index < numbers; index++) {
      this.collectableItems.push(
        new CollectableObject("bottle", lengthOfLevel)
      );
    }
  }

  createClouds(numbers) {
    for (let index = 0; index < numbers + 5; index++) {
      this.clouds.push(new Cloud(index * (this.width / 2)));
    }
  }

  calLengthOfLevelItems() {
    let indexEndboss = this.enemies.length - 1;
    return this.enemies[indexEndboss].x;
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
