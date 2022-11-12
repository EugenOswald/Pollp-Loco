class Endboss extends MovableObject {
  y = 60;
  width = 400;
  height = 400;
  energy = 25;
  offset = {
    top: 70,
    bottom: 10,
    left: 60,
    right: 30,
  };
  IMAGES_ALERTA = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERTA[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERTA);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.x = 2300; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
    this.speed = 2;
    this.animate();
    this.movement();
  }

  animate() {
    setInterval(() => {
      if (world.endboss.x - world.character.x <= 150) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (
        this.checkDistancePepeEndboss() ||
        this.checkIfEndbossMoved()
      ) {
        this.playAnimation(this.IMAGES_WALKING);
        world.endbossBar.width = 250;
        world.endbossBarHeart.width = 80;
      } else {
        this.playAnimation(this.IMAGES_ALERTA);
      }
    }, 300);
  }

  movement() {
    setInterval(() => {
      if (this.checkDistancePepeEndboss() || this.checkIfEndbossMoved()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  checkDistancePepeEndboss() {
    return world.character.x > 1950;
  }

  checkIfEndbossMoved() {
    return world.endboss.x < 2300;
  }
}
