class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    energy = 100;

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // Letzter Zeitpunkt mit 0Hp wird gespeichert 
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
        
    }

    applyGravaity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    isAboveGround() {
        if (this instanceof ThrowableObjects) { // Throwable objacts should alwasy fall
            return true;
        } else {
            return this.y < 180;
        }
    }


    // character.isColliding(chicken)
    isColliding(obj) {
        return (this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height)
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        // % bedeute modulo und bedeutet der Rest https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
        let i = this.currentImage % images.length; // hier steht " let i = 0 % 6  " % Modulo ist der mathematische rest
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
        let path = images[i];
        this.img = this.imageCashe[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;
    }


}