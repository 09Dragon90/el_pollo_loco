class Character extends MoveableObject {
  height = 280;
  width = 120;
  ground;
  world;
  bottleIsThrow = false;
  numbersOfBottles = 25;
  numbersOfCoins = 0;
  timeLongIdle = 0;

  imagesWalk = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  imagesJump = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  imagesDead = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
  ];
  imagesIdle = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  imagesIdleLong = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  imagesHurt = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  // walking_sound = new Audio("assets/audio/walking.mp3");
  // jumping_sound = new Audio("assets/audio/jump.mp3");
  // bottle_sound = new Audio("assets/audio/collectBottle.mp3");
  // coin_sound = new Audio("assets/audio/collectCoin.mp3");

  constructor() {
    super();
    this.loadImg(this.imagesIdle[0]);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesIdleLong);
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadSounds();
    this.y = this.calY(this.height, this.overGroundY);
    this.ground = this.y;
    this.speedX = 5;
    this.setHitbox(100, 10, 15, 15);
    this.animation();
    this.applyGravity();
  }

  loadSounds() {
    this.createdSound("assets/audio/walking.mp3", "walking_sound");
    this.createdSound("assets/audio/jump.mp3", "jumping_sound");
    this.createdSound("assets/audio/collectBottle.mp3", "bottle_sound");
    this.createdSound("assets/audio/collectCoin.mp3", "coin_sound");
    this.createdSound("assets/audio/snoring.mp3", "snoring_sound");
  }

  animation() {
    this.stoppableInterval(
      setInterval(() => {
        this.sounds.walking_sound.pause();
        if (
          this.world.keybord.Right &&
          this.x < this.world.level.lengthOfLevel - this.width &&
          !this.isDead()
        ) {
          this.sounds.walking_sound.play();
          this.isFlipped = false;
          this.moveRight();
        }
        if (this.world.keybord.Left && this.x > -600 && !this.isDead()) {
          this.sounds.walking_sound.play();
          this.isFlipped = true;
          this.moveLeft();
        }
        if (this.world.keybord.Up && !this.isOverGroung() && !this.isDead()) {
          this.jump();
          this.sounds.jumping_sound.play();
        }
        if (
          this.world.keybord.Space &&
          !this.bottleIsThrow &&
          this.numbersOfBottles > 0
        ) {
          this.world.bottles.push(
            new ThrowableObject(
              this.x + this.width - 50,
              this.y + this.height / 2
            )
          );
          this.numbersOfBottles -= 5;
          this.bottleIsThrow = true;
          setTimeout(() => {
            this.bottleIsThrow = false;
          }, 100);
        }
        if (this.x < this.world.level.lengthOfLevel - 620) {
          this.world.camera_x = -this.x + 100;
        }
      }, 1000 / 60)
    );
    this.stoppableInterval(
      setInterval(() => {
        if (this.isDead()) {
          this.stopSnoring();
          this.playAnimationsDead();
        } else if (this.isHurt()) {
          this.stopSnoring();
          this.animatedImages(this.imagesHurt);
        } else if (this.isOverGroung()) {
          this.stopSnoring();
          this.animatedImages(this.imagesJump);
        } else if (this.world.keybord.Right || this.world.keybord.Left) {
          this.stopSnoring();
          this.animatedImages(this.imagesWalk);
        } else if (this.timeLongIdle > 150) {
          this.animatedImages(this.imagesIdleLong);
          this.sounds.snoring_sound.play();
        } else {
          this.animatedImages(this.imagesIdle);
          this.timeLongIdle++;
        }
      }, 100)
    );
  }

  stopSnoring() {
    this.timeLongIdle = 0;
    this.sounds.snoring_sound.pause();
  }

  collectItem(type) {
    switch (type) {
      case "coin":
        this.numbersOfCoins += 5;
        this.sounds.coin_sound.play();
        break;
      case "bottle":
        this.numbersOfBottles += 5;
        this.sounds.bottle_sound.play();
        break;
    }
  }
}
