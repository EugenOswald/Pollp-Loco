class Chicken extends MovableObject {
  y = 360;
  width = 60;
  height = 60;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };
  energy = 2;
  CHICKEN_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  CHICKEN_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];
  kill_chicken_sound = new Audio("audio/chicken.mp3");

  constructor() {
    super().loadImage(this.CHICKEN_WALKING[0]);
    this.loadImages(this.CHICKEN_WALKING);
    this.loadImages(this.CHICKEN_DEAD);
    this.x = 1000 + Math.random() * 800; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
    this.speed = 0.7 + Math.random() * 0.5;
    this.animate();
    this.chickenMovement();
  }

  chickenMovement() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  playDeathSound() {
    if (this.isDead()) {
      this.kill_chicken_sound.play();
      this.kill_chicken_sound.volume = 0.5;
    }
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.CHICKEN_DEAD);
      } else {
        this.playAnimation(this.CHICKEN_WALKING);
      }
    }, 100);
  }
}
