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

  constructor(canvas, keybord, muteSound) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keybord = keybord;
    this.muteSound = muteSound;
    this.createStartScreen(this.ctx);
  }

  startGame(level) {
    this.gameRun = true;
    this.level = level;
    this.character = new Character();
    this.setWorld();
    this.muteAllSounds(this.muteSound);
    this.draw();
    this.run();
  }

  createStartScreen(ctx) {
    let img = new Image();
    img.src = "assets/img/9_intro_outro_screens/start/startscreen_1.png";
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 720, 480);
    };
  }

  run() {
    this.idRunIntervall = setInterval(() => {
      this.collitionCharacter();
      this.collitionBottle();
      this.collitionCollectable();
      this.endGame();
    }, 50);
  }

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

  hitEndboss(enemy) {
    let indexEndboss = this.level.enemies.length - 1;
    enemy.hit();
    if (!this.level.enemies[indexEndboss].sleep) {
      this.addStatusbarEndboss();
      this.bars["endboss"].setPercent(enemy.energy);
    }
  }

  bottleSplash(bottle) {
    bottle.splash();
    this.deletedInstanz(bottle, this.bottles, 700);
  }

  addStatusbarEndboss() {
    if (!this.hasBarEndboss()) {
      this.bars = {
        ...this.bars,
        endboss: new StatusBar(500, 6, 100, "endboss", "green"),
      };
    }
  }

  hasBarEndboss() {
    let keys = Object.keys(this.bars);
    return keys.includes("endboss");
  }

  setWorld() {
    this.character.world = this;
  }

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
    obj.drawBorder(this.ctx);
  }

  addObjectsToMap(objArray) {
    if (typeof objArray === "object") objArray = Object.values(objArray);
    objArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  deletedInstanz(obj, array, time) {
    setTimeout(() => {
      const index = array.findIndex((e) => e.instanzId == obj.instanzId);
      array.splice(index, 1);
    }, time);
  }

  allEnemiesDead() {
    let allDead = true;
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        allDead = false;
      }
    });
    return allDead;
  }

  stopGame() {
    setTimeout(() => {
      this.character.stopIntervals();
      this.stopIntervals(this.level.enemies);
      this.stopIntervals(this.level.clouds);
    }, 2000);
  }

  stopIntervals(array) {
    array.forEach((e) => {
      e.stopIntervals();
    });
  }

  muteAllSounds(muteSound) {
    this.muteSound = muteSound;
    if (world.gameRun) {
      this.character.muteSounds(muteSound);
      if (this instanceof Overlay) this.overlay.muteSounds(muteSound);
    }
  }
}
