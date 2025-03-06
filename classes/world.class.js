class World {
  level;
  character;
  bars = {
    health: new StatusBar(10, 0, 100, "health", "green"),
    coins: new StatusBar(10, 40, 0, "coin", "blue"),
    bottles: new StatusBar(10, 80, 25, "bottle", "orange"),
  };
  bottles = [];
  ctx;
  canvas;
  keybord;
  camera_x = 0;
  overlay;
  idRunIntervall;
  muteSound;
  gameRun;

  sound_Game = new Audio("assets/audio/gamemusic.mp3");

  constructor(canvas, keybord, muteSound) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keybord = keybord;
    this.muteSound = muteSound;
    this.createStartScreen(this.ctx);
  }

  /**
   * Starts the game
   * @param {Object} level - Object of level
   */
  startGame(level) {
    this.gameRun = true;
    this.level = level;
    this.character = new Character();
    this.setWorld();
    this.muteAllSounds(this.muteSound);
    this.startGameMusic();
    this.draw();
    this.run();
  }

  /**
   * Starts the game music
   */
  startGameMusic() {
    this.sound_Game.loop = true;
    this.sound_Game.play();
  }

  /**
   * Created the Startscreen
   * @param {object} ctx - Contextobject
   */
  createStartScreen(ctx) {
    let img = new Image();
    img.src = "assets/img/9_intro_outro_screens/start/startscreen_1.png";
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 720, 480);
    };
  }

  /**
   * Function for checking all collitions
   */
  run() {
    this.idRunIntervall = setInterval(() => {
      this.collitionCharacter();
      this.collitionBottle();
      this.collitionCollectable();
      this.endGame();
    }, 50);
  }

  /**
   * Ends the game
   */
  endGame() {
    if (this.allEnemiesDead()) {
      clearInterval(this.idRunIntervall);
      this.stopGame();
      this.overlay = new Overlay(true, this.muteSound);
    } else if (this.character.isDead()) {
      clearInterval(this.idRunIntervall);
      this.stopGame();
      this.overlay = new Overlay(false, this.muteSound);
    }
  }

  /**
   * Checking if character collision with everyone
   */
  collitionCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isHittingFromTop(enemy)) {
        enemy.hit();
        this.character.bouncer();
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.bars["health"].setPercent(this.character.energy);
      }
    });
  }

  /**
   * Checking if bottle collision with enemy
   */
  collitionBottle() {
    this.bottles.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && enemy instanceof Chicken) {
          enemy.hit();
          this.bottleSplash(bottle);
        } else if (bottle.isColliding(enemy) && enemy instanceof Endboss) {
          this.hitEndboss(enemy);
          this.bottleSplash(bottle);
        }
        this.bars["bottles"].setPercent(this.character.numbersOfBottles);
      });
    });
  }

  /**
   * Checking if character collision with collectable item
   */
  collitionCollectable() {
    this.level.collectableItems.forEach((item) => {
      if (this.character.isColliding(item)) {
        this.deletedInstanz(item, this.level.collectableItems, 0);
        this.character.collectItem(item.type);
        this.bars["coins"].setPercent(this.character.numbersOfCoins);
        this.bars["bottles"].setPercent(this.character.numbersOfBottles);
      }
    });
  }

  /**
   * If hit endboss aktivated statusbar
   */
  hitEndboss(enemy) {
    let indexEndboss = this.level.enemies.length - 1;
    enemy.hit();
    if (!this.level.enemies[indexEndboss].sleep) {
      this.addStatusbarEndboss();
      this.bars["endboss"].setPercent(enemy.energy);
    }
  }

  /**
   * Let bottle splash and deleted this intsanz
   * @param {object} bottle - Object of bottle
   */
  bottleSplash(bottle) {
    bottle.splash();
    this.deletedInstanz(bottle, this.bottles, 700);
  }

  /**
   * activated statusbar of endboss
   */
  addStatusbarEndboss() {
    if (!this.hasBarEndboss()) {
      this.bars = {
        ...this.bars,
        endboss: new StatusBar(500, 6, 100, "endboss", "green"),
      };
    }
  }

  /**
   * Check endboss has a statusbar
   * @returns true or false
   */
  hasBarEndboss() {
    let keys = Object.keys(this.bars);
    return keys.includes("endboss");
  }

  /**
   * Set the object of world to the character
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Draw all objects
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.bars);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.collectableItems);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    if (this.overlay instanceof Overlay) this.addToMap(this.overlay);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Added a object to the context
   * @param {object} obj
   */
  addToMap(obj) {
    if (obj.isFlipped) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        obj.img,
        obj.x * -1 - obj.width,
        obj.y,
        obj.width,
        obj.height
      );
      this.ctx.restore();
    } else {
      try {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  /**
   * Added a array of objects to the context
   * @param {Array} objArray
   */
  addObjectsToMap(objArray) {
    if (typeof objArray === "object") objArray = Object.values(objArray);
    objArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Deleted a object from a array after a time
   * @param {object} obj - Object to delet
   * @param {Array} array - Array of the deleted object
   * @param {number} time - Time after this the object will delet
   */
  deletedInstanz(obj, array, time) {
    setTimeout(() => {
      const index = array.findIndex((e) => e.instanzId == obj.instanzId);
      array.splice(index, 1);
    }, time);
  }

  /**
   * Check all emenies are dead
   * @returns true or false
   */
  allEnemiesDead() {
    let allDead = true;
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        allDead = false;
      }
    });
    return allDead;
  }

  /**
   * Stop the game
   */
  stopGame() {
    this.sound_Game.pause();
    setTimeout(() => {
      this.character.stopIntervals();
      this.stopIntervals(this.level.enemies);
      this.stopIntervals(this.level.clouds);
    }, 2000);
  }

  /**
   * Stopps all intervalls in the array
   * @param {Array} array - Array of ids from intervalls
   */
  stopIntervals(array) {
    array.forEach((e) => {
      e.stopIntervals();
    });
  }

  /**
   * Set the mute status of audios
   * @param {boolean} muteSound - Status of mute
   */
  muteAllSounds(muteSound) {
    this.muteSound = muteSound;
    this.sound_Game.muted = muteSound;
    if (world.gameRun) {
      this.character.muteSounds(muteSound);
      if (this instanceof Overlay) this.overlay.muteSounds(muteSound);
      this.muteSoundsArr(this.level.enemies);
      this.muteSoundsArr(this.bottles);
    }
  }

  /**
   * Set the mute status of audios in the Array
   * @param {Array} arr - Array with the sounds
   */
  muteSoundsArr(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].muteSounds(this.muteSound);
    }
  }
}
