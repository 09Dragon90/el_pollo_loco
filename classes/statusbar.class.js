class StatusBar extends DrawableObject {
  percent;
  width = 200;
  color;

  constructor(x = 0, y = 0, percent = 0, icon = "health", color = "green") {
    super();
    this.x = x;
    this.y = y;
    this.height = this.width / 4;
    this.color = color;
    this.images = this.setImages(icon);
    this.loadImages(this.images);
    this.setPercent(percent);
  }

  setPercent(percent) {
    this.percent = percent;
    let path = this.images[this.getIndexImages()];
    this.img = this.imageCache[path];
  }

  getIndexImages() {
    if (this.percent > 80) {
      return 5;
    } else if (this.percent > 60) {
      return 4;
    } else if (this.percent > 40) {
      return 3;
    } else if (this.percent > 20) {
      return 2;
    } else if (this.percent > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  setImages(icon) {
    switch (icon) {
      case "health":
        return [
          `assets/img/7_statusbars/1_statusbar/2_statusbar_health/${this.color}/0.png`,
          `assets/img/7_statusbars/1_statusbar/2_statusbar_health/${this.color}/20.png`,
          `assets/img/7_statusbars/1_statusbar/2_statusbar_health/${this.color}/40.png`,
          `assets/img/7_statusbars/1_statusbar/2_statusbar_health/${this.color}/60.png`,
          `assets/img/7_statusbars/1_statusbar/2_statusbar_health/${this.color}/80.png`,
          `assets/img/7_statusbars/1_statusbar/2_statusbar_health/${this.color}/100.png`,
        ];
      case "coin":
        return [
          `assets/img/7_statusbars/1_statusbar/1_statusbar_coin/${this.color}/0.png`,
          `assets/img/7_statusbars/1_statusbar/1_statusbar_coin/${this.color}/20.png`,
          `assets/img/7_statusbars/1_statusbar/1_statusbar_coin/${this.color}/40.png`,
          `assets/img/7_statusbars/1_statusbar/1_statusbar_coin/${this.color}/60.png`,
          `assets/img/7_statusbars/1_statusbar/1_statusbar_coin/${this.color}/80.png`,
          `assets/img/7_statusbars/1_statusbar/1_statusbar_coin/${this.color}/100.png`,
        ];
      case "bottle":
        return [
          `assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/${this.color}/0.png`,
          `assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/${this.color}/20.png`,
          `assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/${this.color}/40.png`,
          `assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/${this.color}/60.png`,
          `assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/${this.color}/80.png`,
          `assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/${this.color}/100.png`,
        ];
      case "endboss":
        return [
          `assets/img/7_statusbars/2_statusbar_endboss/${this.color}/${this.color}0.png`,
          `assets/img/7_statusbars/2_statusbar_endboss/${this.color}/${this.color}20.png`,
          `assets/img/7_statusbars/2_statusbar_endboss/${this.color}/${this.color}40.png`,
          `assets/img/7_statusbars/2_statusbar_endboss/${this.color}/${this.color}60.png`,
          `assets/img/7_statusbars/2_statusbar_endboss/${this.color}/${this.color}80.png`,
          `assets/img/7_statusbars/2_statusbar_endboss/${this.color}/${this.color}100.png`,
        ];
    }
  }
}
