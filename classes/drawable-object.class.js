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
  sounds = {};

  /**
   * Created a Id for the Object
   * with time and random number
   */
  createdId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1e8);
    this.instanzId = `${timestamp}${randomNumber}`;
  }

  /**
   * Created a image elemet
   * @param {string} path - Path of the image
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Created images from a array and save in the cache
   * @param {Array} arr - Array of paths for images
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Created a audio elemet
   * @param {string} path - Path of the audio
   * @param {string} name - Name of the audio
   */
  createdSound(path, name) {
    this.sounds[name] = new Audio(path);
  }

  /**
   * Mute or unmute all audios in the array
   * @param {boolean} status - Status auf mute
   */
  muteSounds(status) {
    Object.values(this.sounds).forEach((sound) => {
      if (sound instanceof Audio) {
        sound.muted = status;
      }
    });
  }

  /**
   * Saves the id of intevall in the array
   * @param {Function} interval - Function of intervall
   */
  stoppableInterval(interval) {
    let id = interval;
    this.intervalIds.push(id);
  }

  /**
   * Stopps all intervalls of object
   */
  stopIntervals() {
    this.intervalIds.forEach((id) => {
      clearInterval(id);
    });
    this.intervalIds = [];
  }

  /**
   * Set the hitbox of object with the offset
   * @param {Number} offsetYT - Number of offset for YT
   * @param {Number} offsetYB - Number of offset for YB
   * @param {Number} offsetXL - Number of offset for XL
   * @param {Number} offsetXR - Number of offset for XR
   */
  setHitbox(offsetYT = 0, offsetYB = 0, offsetXL = 0, offsetXR = 0) {
    this.hitbox = {
      active: true,
      x: this.x + offsetXL,
      width: this.width - offsetXL - offsetXR,
      y: this.y + offsetYT,
      height: this.height - offsetYT - offsetYB,
    };
  }

  /**
   * Deleted the hitbox of object
   */
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
