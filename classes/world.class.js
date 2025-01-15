class World {
  level;
  character = new Character();
  ctx;
  canvas;
  keybord;
  d;
  camera_x = 0;

  constructor(canvas, keybord, levels) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keybord = keybord;
    this.level = levels.level1;
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.level.cloud);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
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
        obj.heigth
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.heigth);
    }
  }

  addObjectsToMap(objArray) {
    objArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }
}
