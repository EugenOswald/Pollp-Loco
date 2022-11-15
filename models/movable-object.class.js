class MovableObject extends DrawableObject {
	speed = 0.2;
	otherDirection = false;
	speedY = 0;
	acceleration = 2;
	lastHit = 0;
	reJump_sound = new Audio("audio/rejump.mp3");
	energy = 100;
	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	hit() {
		this.energy -= 2;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = new Date().getTime(); // Letzter Zeitpunkt mit 0Hp wird gespeichert
		}
	}

	hitsBack() {
		this.x -= 1;
		if (this.world.character.y >= 160) {
			this.speedY = 20;
		}
	}

	headJump() {
		if (world.muted == false) {
			this.reJump_sound.play();
			this.reJump_sound.volume = 0.2;
		}
		this.speedY = 10;
	}

	isHurt() {
		let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
		timepassed = timepassed / 1000; // Difference in s
		return timepassed < 1;
	}

	isDead() {
		return this.energy <= 0;
	}

	applyGravaity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
	}
	applyGravaityOtherDirection() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY < 0) {
				this.y += this.speedY;
				this.speedY += this.acceleration;
			}
		}, 1000 / 25);
	}

	isAboveGround() {
		if (this instanceof ThrowableObjects) {
			// Throwable objacts should alwasy fall
			return true;
		} else {
			return this.y < 170;
		}
	}

	// character.isColliding(chicken)
	isColliding(mo) {
		return (
			this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R => L
			this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T => B
			this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L => R
			this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
		); // B => T
	}

	moveRight() {
		this.x += this.speed;
		this.otherDirection = false;
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
