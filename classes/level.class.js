class Level {
  enemies = [];
  backgroundObjects = [];
  clouds = [];
  width = 1439;
  lengthOfLevel;
  collectableItems = [];

  backgroundImages = [
    "assets/img/5_background/layers/air.png",
    "assets/img/5_background/layers/3_third_layer/full.png",
    "assets/img/5_background/layers/2_second_layer/full.png",
    "assets/img/5_background/layers/1_first_layer/full.png",
  ];

  constructor(
    numbersOfEnemies = 1,
    numbersOfEnemiesSmall = 1,
    numbersOfBackground = 1,
    numbersOfCoins = 1,
    numbersOfBottles = 1
  ) {
    this.lengthOfLevel = numbersOfBackground * this.width;
    this.createBackground(numbersOfBackground);
    this.createClouds(numbersOfBackground);
    this.createEnemies(numbersOfEnemies, this.lengthOfLevel, false);
    this.createEnemies(numbersOfEnemiesSmall, this.lengthOfLevel, true);
    this.createEndboss(this.lengthOfLevel);
    this.createCoins(numbersOfCoins, this.calLengthOfLevelItems());
    this.createBottles(numbersOfBottles, this.calLengthOfLevelItems());
  }

  /**
   * Created the coins object
   * @param {number} numbers - Numbers of coins
   * @param {number} lengthOfLevel - Numbers of level segments
   */
  createCoins(numbers, lengthOfLevel) {
    for (let index = 0; index < numbers; index++) {
      this.collectableItems.push(new CollectableObject("coin", lengthOfLevel));
    }
  }

  /**
   * Created the bottle object
   * @param {number} numbers - Numbers of bottle
   * @param {number} lengthOfLevel - Numbers of level segments
   */
  createBottles(numbers, lengthOfLevel) {
    for (let index = 0; index < numbers; index++) {
      this.collectableItems.push(
        new CollectableObject("bottle", lengthOfLevel)
      );
    }
  }

  /**
   * Created the clouds object
   * @param {number} numbers - Numbers of clouds
   */
  createClouds(numbers) {
    for (let index = 0; index < numbers + 5; index++) {
      this.clouds.push(new Cloud(index * (this.width / 2)));
    }
  }

  /**
   * Calculate the length of level for collecteble items
   * @returns - length of level for collecteble items
   */
  calLengthOfLevelItems() {
    let indexEndboss = this.enemies.length - 1;
    return this.enemies[indexEndboss].x;
  }

  /**
   * Created the enimies object
   * @param {number} numbers - Numbers of enimies
   * @param {number} lengthOfLevel - Numbers of level segments
   * @param {boolean} small - Size of enemy
   */
  createEnemies(numbers, lengthOfLevel, small) {
    for (let index = 0; index < numbers; index++) {
      this.enemies.push(new Chicken(lengthOfLevel, small));
    }
  }

  /**
   * Created the endboss object
   * @param {number} lengthOfLevel - Numbers of level segments
   */
  createEndboss(lengthOfLevel) {
    this.enemies.push(new Endboss(lengthOfLevel));
  }

  /**
   * Created the level segments
   * @param {number} numbers - Numbers of level segments
   */
  createBackground(numbers) {
    this.createBackgrounds(-1);
    for (let index = 0; index < numbers; index++) {
      this.createBackgrounds(index);
    }
  }

  /**
   * Created the background images
   * @param {number} index - Position of segment
   */
  createBackgrounds(index) {
    for (let i = 0; i < this.backgroundImages.length; i++) {
      this.backgroundObjects.push(
        new BackgroundObject(this.backgroundImages[i], this.width * index)
      );
    }
  }
}
