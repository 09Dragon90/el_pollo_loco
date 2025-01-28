class DrawableObject {
  x;
  y;
  height;
  width;
  img;
  imageCache = {};
  currentImage = 0;
  intervalIds = [];
  instanzId;
  isFlipped = false;

  createdId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1e8);
    this.instanzId = `${timestamp}${randomNumber}`;
  }

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.hitbox.x,
        this.hitbox.y,
        this.hitbox.width,
        this.hitbox.height
      );
      ctx.stroke();
    }
  }

  stoppableInterval(interval) {
    let id = interval;
    this.intervalIds.push(id);
  }

  stopIntervals() {
    this.intervalIds.forEach((id) => {
      clearInterval(id);
    });
    this.intervalIds = [];
  }

  setHitbox(offsetYT = 0, offsetYB = 0, offsetXL = 0, offsetXR = 0) {
    this.hitbox = {
      active: true,
      x: this.x + offsetXL,
      width: this.width - offsetXL - offsetXR,
      y: this.y + offsetYT,
      height: this.height - offsetYT - offsetYB,
    };
  }

  deletHitbox() {
    this.hitbox = {
      active: false,
      x: 0,
      width: 0,
      y: 0,
      height: 0,
    };
  }
}
