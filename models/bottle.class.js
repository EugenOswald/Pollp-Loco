class Bottle extends MovableObject {
    width = 70;
    height = 70;
    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
    }
    BOTTLE_IMAGE = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];



    constructor() {
        super().loadImage(this.BOTTLE_IMAGE[0]);
        this.loadImages(this.BOTTLE_IMAGE);
        this.y = 360 ;
        this.x = Math.random() * 7 * 600; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
    }

}