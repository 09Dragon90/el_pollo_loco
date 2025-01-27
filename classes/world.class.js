class World {
  level;
  character = new Character();
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

  constructor(canvas, keybord, levels) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keybord = keybord;
    this.level = levels.level1;
    this.setWorld();
    this.draw();
    this.run();
  }

  run() {
    setInterval(() => {
      this.collitionCharacter();
      this.collitionBottle();
      this.collitionCollectable();
    }, 75);
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
        if (bottle.isColliding(enemy) && !enemy instanceof Endboss) {
          hitCicken(enemy);
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

  hitCicken(enemy) {
    enemy.hit();
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
    this.addToMap(this.level.cloud);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.bars);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.collectableItems);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
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
}
