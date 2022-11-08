class Chicken extends MovableObject {
    y = 370;
    width = 60;
    height = 60;
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    };
    energy = 5;
    chickenDead = false;
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


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
            if (this.checkIfChickenDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    checkIfChickenDead() {
        if (this.isDead()) {
            return this.chickenDead;
        } else return !this.chickenDead;
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.CHICKEN_DEAD);
            } else {
                this.playAnimation(this.CHICKEN_WALKING);
            }

        }, 100)

    }




}