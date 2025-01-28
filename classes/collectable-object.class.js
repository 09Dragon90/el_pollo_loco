class CollectableObject extends DrawableObject {
  type;

  constructor(type, lengthOfLevel) {
    super();
    this.type = type;
    this.setType(type, lengthOfLevel);
    this.createdId();
  }

  setType(type, lengthOfLevel) {
    switch (type) {
      case "coin":
        this.loadImg("assets/img/8_coin/coin_2.png");
        this.width = 100;
        this.height = 100;
        this.x = this.calX(lengthOfLevel);
        this.y = this.calY();
        this.setHitbox(30, 30, 30, 30);
        break;
      case "bottle":
        this.width = 80;
        this.height = 80;
        this.x = this.calX(lengthOfLevel);
        this.y = 350;
        this.flippBottle();
        break;
    }
  }

  calY() {
    const beginn = 120;
    const end = 300;
    return beginn + Math.random() * (end - beginn);
  }

  calX(end) {
    const beginn = 250;
    return beginn + Math.random() * (end - beginn - this.width);
  }

  flippBottle() {
    if (Math.round(Math.random()) == 0) {
      this.loadImg("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
      this.setHitbox(10, 5, 30, 10);
    } else {
      this.loadImg("assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
      this.setHitbox(10, 5, 20, 20);
    }
  }
}
