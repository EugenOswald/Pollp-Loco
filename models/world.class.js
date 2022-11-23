class World {
	character = new Character();
	endboss = new Endboss();
	level = level1;
	ctx;
	canvas;
	keyboard;
	camera_x = 0;
	healthBar = new HealthBar();
	bottleBar = new BottleBar();
	endbossBar = new EndbossBar();
	endbossBarHeart = new EndbossBarHeart();
	coinBar = new CoinBar();
	throwableObjects = [];
	collectedBottles = [];
	collectedCoins = [];
	muted = false;
	collisionTimepassed;
	lastCollision;
	background_sound = new Audio("audio/music.mp3");
	coin_sound = new Audio("audio/coin.mp3");
	broken_bottle_sound = new Audio("audio/broken-bottle.mp3");
	kill_chicken_sound = new Audio("audio/chicken.mp3");

	/**
	 *As soon as a World-Object gets created the context of the canvas gets defined,
	 * all objects of the world get drawn via 'draw()', 'setWorld()' 'run()' and 'collectObjects()' is executed.
	 * @param {object} canvas - Object which relates to our canvas HTML-Element
	 * @param {object} keyboard -Keyboard-Object
	 */
	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.run();
		this.collectObjects();
	}

	/**
	 * checks if mute is false or true
	 */
	isMuted() {
		isMutedIntervall = setInterval(() => {
			if (keyboard.MUTE == false) {
				this.muted = false;
			} else if (keyboard.MUTE == true) {
				this.muted = true;
			}
		}, 1000 / 60);
		allIntervals.push(this.isMutedIntervall);
	}

	/**
	 * In the interval, all collisions are made queries
	 */
	collectObjects() {
		collectObjectsInterval = setInterval(() => {
			this.checkCollectCoin();
			this.checkCollectBottle();
			this.checkCollisionThrowObject();
			this.checkCollisions();
		}, 50);
		allIntervals.push(this.collectObjectsInterval);
	}

	/**
	 * Checks if the character collides with a coin, if he does, he is taken out of the level and flushed into the collectedCoins
	 */
	checkCollectCoin() {
		this.level.coins.forEach((coin, indexCoins) => {
			if (this.character.isColliding(coin)) {
				if (this.muted == false) {
					this.coin_sound.play();
					this.coin_sound.volume = 0.2;
				}
				this.collectedCoins.push(coin);
				this.level.coins.splice(indexCoins, 1);
			}
		});
	}

	/**
	 * Checks if the character collides with a bottle, if he does, he is taken out of the level and flushed into the collectedBottles
	 */
	checkCollectBottle() {
		this.level.bottles.forEach((bottle, indexBottles) => {
			if (this.character.isColliding(bottle)) {
				//if (this.this.muted == false) {this.bottle_sound.play();}
				this.collectedBottles.push(bottle);
				this.level.bottles.splice(indexBottles, 1);
			}
		});
	}

	/**
	 *  Helping-Function which saves the World-Object into the world-variable of our Character
	 */
	setWorld() {
		this.character.world = this;
	}

	/**
	 * Checks if something is thrown, if the game is muted, if the background music is still playing and if the game is over.
	 */
	run() {
		runInterval = setInterval(() => {
			this.checkThrowObjects();
			this.isMuted();
			this.backgroundMusic();
			this.checkGameEnd();
		}, 100);
		allIntervals.push(this.runInterval);
	}

	/**
	 * Background music is played only if muted is false
	 */
	backgroundMusic() {
		if (this.muted == false) {
			this.background_sound.play();
			this.background_sound.volume = 0.03;
		} else this.background_sound.pause();
	}

	/**
	 * If there is a bottle in the array, a bottle should be thrown from the character
	 */
	checkThrowObjects() {
		if (this.pressEnterAndArrayLength()) {
			let bottle = new ThrowableObjects(this.character.x + 10, this.character.y + 100);
			this.throwableObjects.push(bottle);
		}
	}

	/**
	 * Enter and collectedBottles longer than 0
	 * @returns true or false
	 */
	pressEnterAndArrayLength() {
		return this.keyboard.ENTER && this.collectedBottles.length > 0;
	}

	/**
	 * Checks if the bottle hits the ground or an enemy
	 */
	checkCollisionThrowObject() {
		this.throwableObjects.forEach((bottle, indexBottle) => {
			this.level.enemies.forEach((enemy, indexEnemy) => {
				if (this.bottleHitsGround(indexBottle)) {
					this.setCollidingTime();
					this.throwableObjects[indexBottle].splashAnimation();
					this.brokenBottleSound();
				}
				if (this.bottleHitsEnemy(enemy, indexBottle)) {
					this.setCollidingTime();
					this.level.enemies[indexEnemy].hit();
					this.brokenBottleSound();
					this.throwableObjects[indexBottle].splashAnimation();
				}
			});
		});
	}

	/**
	 * Checks if a bottle hits an enemy
	 * @returns true or false
	 */
	bottleHitsEnemy(enemy, indexBottle) {
		return this.throwableObjects[indexBottle].isColliding(enemy);
	}

	/**
	 * checks if the bottle hits the ground
	 * @returns true or false
	 */
	bottleHitsGround(indexBottle) {
		return this.throwableObjects[indexBottle].y > 330 && this.throwableObjects[indexBottle].y < 370;
	}

	/**
	 * Stores the last time of collusion
	 */
	setCollidingTime() {
		this.lastCollision = new Date().getTime();
	}

	/**
	 * Sets a timestamp of the last collision
	 * @returns true or false
	 */
	checkFirstCollision() {
		let collisionTimepassed = new Date().getTime() - this.lastCollision;
		return collisionTimepassed < 1000;
	}

	/**
	 * When the bottle hits something the sound should be played
	 */
	brokenBottleSound() {
		if (this.checkFirstCollision()) {
			if (this.muted == false) {
				this.broken_bottle_sound.play();
			}
			this.broken_bottle_sound.loop = false;
			this.broken_bottle_sound.volume = 0.5;
		} else {
			if (muted == false) {
				this.broken_bottle_sound.pause();
			}
		}
	}

	/**
	 * Collisions with enemies with the boss and with enemies from above are checked
	 */
	checkCollisions() {
		checkCollisionsIntervall = setInterval(() => {
			this.level.enemies.forEach((enemy, indexEnemy) => {
				if (this.aboutGroundCollideEnemies(enemy, indexEnemy)) {
					this.killingHeadJump(indexEnemy);
					this.level.enemies[indexEnemy].energy = 0;
				} else if (this.collideEndboss(enemy, indexEnemy)) {
					this.character.hitsBack();
					this.character.hit();
					this.healthBar.setPercentage(this.character.energy);
				} else if (this.collideEnemy(enemy, indexEnemy)) {
					this.character.hit();
					this.healthBar.setPercentage(this.character.energy);
				}
			});
		}, 50);
		allIntervals.push(this.checkCollisionsIntervall);
	}

	/**
	 * checks collision with an enemy
	 * @param {Object} enemy - Enemy
	 * @param {Number} indexEnemy - Index of Enemys
	 * @returns true or false
	 */
	collideEnemy(enemy, indexEnemy) {
		return this.character.isColliding(enemy) && this.level.enemies[indexEnemy].energy > 0;
	}

	/**
	 * checks collision with the boss
	 * @param {Object} enemy - Enemy
	 * @param {Number} indexEnemy - Index of Enemys
	 * @returns true or false
	 */
	collideEndboss(enemy, indexEnemy) {
		return this.character.isColliding(this.level.enemies[6]) && this.level.enemies[indexEnemy].energy > 0;
	}

	/**
	 * checks collision with an enemy above the ground
	 * @param {Object} enemy - Enemy
	 * @param {Number} indexEnemy - Index of Enemys
	 * @returns true or false
	 */
	aboutGroundCollideEnemies(enemy, indexEnemy) {
		return (
			this.character.isAboveGround() &&
			this.character.isColliding(enemy) &&
			this.isNotEndboss(enemy, indexEnemy) &&
			this.level.enemies[indexEnemy].energy > 1 && this.character.y < 200
		);
	}

	/**
	 * checks if it is the end boss or not
	 * @param {Object} enemy - Enemy
	 * @returns true or false
	 */
	isNotEndboss(enemy) {
		if (enemy == this.level.enemies[6]) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * When the character jumps on an enemy, he is pushed back into the air.
	 * @param {Number} indexEnemy
	 */
	killingHeadJump(indexEnemy) {
		if (this.level.enemies[indexEnemy].energy > 1) {
			this.character.headJump();
		}
	}

	/**
	 * Draws Objects into the canvas and repeats the drawing
	 */
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// wird benötigen das um Canvas zu clearn das wird es neu Updaten können.
		this.ctx.translate(this.camera_x, 0); // Unser gesamter Ausschnitt wird um -100 verschoben   -- translate verschiebt alles um eine gewisse Variabele
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.level.bottles);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addToMap(this.character);
		this.ctx.translate(-this.camera_x, 0); // das Minus bei this steht fürs gegenteil
		this.addToMap(this.healthBar);
		this.addToMap(this.endbossBar);
		this.addToMap(this.endbossBarHeart);
		this.addToMap(this.bottleBar);
		this.addToMap(this.coinBar);
		// draw() wird immer wierder aufgerufen
		//die function draw() wird sehr oft in einem Spiel ausgeführt, wenn man draw() alleine einfügen würde ->
		// Würde es das System Crashen lassen,deswegen benutzt man requestAnimationFrame(function siehe funtcion unten)
		let self = this;
		requestAnimationFrame(function () {
			// Die function wird ausgeführt wenn alles überder function gezeichnet wurde.
			// Die function wird etwas async (etwas später) ausgeführt.
			self.draw(); // Wenn man sowas hat kennt die function this. nicht mehr. Deshalb let self = this
		});
	}

	clearcanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	/**
	 * Adds an Array of Objects to the canvas
	 * @param {Array} objects - Array which contains objects
	 */
	addObjectsToMap(objects) {
		objects.forEach((obj) => {
			this.addToMap(obj);
		});
	}

	/**
	 * Draws an Object into the canvas
	 * @param {Object} movableObject Object to be drawn
	 */
	addToMap(movableObject) {
		if (movableObject.otherDirection) {
			// Hier schauen wir ob das Bild eine andere richtung haben soll was wir einfügen möchten
			this.flipImage(movableObject);
		}
		movableObject.draw(this.ctx);
		movableObject.drawFrame(this.ctx);

		if (movableObject.otherDirection) {
			this.flipImageBack(movableObject); // Mit dieser Function wird die dier Spiegelung rückgängig gemacht
		}
	}

	/**
	 * Flips the object
	 * @param {Object} movableObject Object to be flipped
	 */
	flipImage(movableObject) {
		this.ctx.save(); // Speichert die aktuellen eigenschaften vom Kontext, weil wir wollen die nächsten Bilder wieder Normal hinzufügen
		this.ctx.translate(movableObject.width, 0); // Hier ändern wir die methode wie die Bilder eingefügt werden.
		this.ctx.scale(-1, 1); //Hiermit wird das Bild gespiegelt
		movableObject.x = movableObject.x * -1;
	}

	/**
	 * Flips the object back
	 * @param {Object} movableObject Object to be flipped back
	 */
	flipImageBack(movableObject) {
		movableObject.x = movableObject.x * -1;
		this.ctx.restore();
	}

	/**
	 * Context has to be cleared before each new drawing
	 */
	clearRect() {
		let context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	/**
	 * Checks in the interval whether the boss has 0 life or the character
	 */
	checkGameEnd() {
		checkGameEndInterval = setInterval(() => {
			if (this.level.enemies[6].energy <= 0) {
				gameWinnerScreen();
			} else if (world.character.energy <= 0) {
				gameOverScreen();
			}
		}, 200);
		allIntervals.push(this.checkGameEndInterval);
	}

	resetGame() {
		this.throwableObjects = [];
		this.collectedBottles = [];
		this.collectedCoins = [];
	}
}
