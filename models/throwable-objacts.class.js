class ThrowableObjects extends MovableObject {

IMAGE_BOTTLE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    
];

    constructor(x, y) {
        super().loadImage(this.IMAGE_BOTTLE[0]);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.trow();
    }

    trow(){
        this.speedY = 20;
        this.applyGravaity();
        setInterval(()=>{
            this.x += 15;
        }, 30);
    }
}