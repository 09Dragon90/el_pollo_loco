class CollectableObject extends DrawableObject {
  type;

  constructor(type, lengthOfLevel) {
    super();
    this.type = type;
    this.setType(type, lengthOfLevel - 300);
  }

  setType(type, lengthOfLevel) {
    console.log(lengthOfLevel);

    switch (type) {
      case "coin":
        this.loadImg("assets/img/8_coin/coin_2.png");
        this.x = this.calX(lengthOfLevel);
        this.y = this.calY();
        this.width = 100;
        this.height = 100;
        this.setHitbox(30, 30, 30, 30);
        break;
      case "bottle":
        this.loadImg("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.x = this.calX(lengthOfLevel);
        this.y = 350;
        this.width = 80;
        this.height = 80;
        this.setHitbox(10, 5, 30, 10);
        break;
    }
  }

  calY() {
    const beginn = 120;
    const end = 350;
    return beginn + Math.random() * (end - beginn);
  }

  calX(end) {
    const beginn = 250;
    return beginn + Math.random() * (end - beginn);
  }
}
