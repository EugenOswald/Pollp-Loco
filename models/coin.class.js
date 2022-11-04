class Coin extends MovableObject {
    width = 100;
    height = 100;
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];



    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.y = 160 + Math.random() * 100;
        this.x = 500 + Math.random() * 4 * Math.random() * 600; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
    }

}