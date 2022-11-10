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
    coinBar = new CoinBar();
    throwableObjects = [];
    collectedBottles = [];
    collectedCoins = [];
    background_sound = new Audio('audio/music.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    gameSoundOn = true;





    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectObjects()
        // this.background_sound.play();
        // this.background_sound.volume = 0.03;
    }

    collectObjects() {
        setInterval(() => {
            this.checkCollectCoin();
            this.checkCollectBottle();
        }, 100);
    }

    checkCollectCoin() {
        this.level.coins.forEach((coin, indexCoins) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.collectedCoins.push(coin);
                this.level.coins.splice(indexCoins, 1);
            }
        });
    }
    
    checkCollectBottle() {
        this.level.bottles.forEach((bottle, indexBottles) => {
            if (this.character.isColliding(bottle)) {
                // this.bottle_sound.play();
                this.collectedBottles.push(bottle);
                this.level.bottles.splice(indexBottles, 1);
            }
        });
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.ENTER && this.collectedBottles.length > 0) {
            let bottle = new ThrowableObjects(this.character.x + 10, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, indexEnemy) => {
                if (this.character.isAboveGround() && this.character.isColliding(enemy) && this.isNotEndboss(enemy, indexEnemy) && this.level.enemies[indexEnemy].energy > 1) {
                    this.killingHeadJump(indexEnemy);
                    this.level.enemies[indexEnemy].energy = 0;
                } else
                    if (this.character.isColliding(enemy) && this.level.enemies[indexEnemy].energy > 0) {
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);
                    }
            });
        }, 50);
    }


    isNotEndboss(enemy) {
        if (enemy == this.level.enemies[6]) {
            return false;
        } else {

            return true;
        }
    }

    killingHeadJump(indexEnemy) {
        if (this.level.enemies[indexEnemy].energy > 1) {
            this.character.headJump();
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // wird benötigen das um Canvas zu clearn das wird es neu Updaten können.

        this.ctx.translate(this.camera_x, 0);// Unser gesamter Ausschnitt wird um -100 verschoben   -- translate verschiebt alles um eine gewisse Variabele

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); // das Minus bei this steht fürs gegenteil
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        // draw() wird immer wierder aufgerufen
        //die function draw() wird sehr oft in einem Spiel ausgeführt, wenn man draw() alleine einfügen würde ->
        // Würde es das System Crashen lassen,deswegen benutzt man requestAnimationFrame(function siehe funtcion unten) 
        let self = this;
        requestAnimationFrame(function () { // Die function wird ausgeführt wenn alles überder function gezeichnet wurde.
            // Die function wird etwas async (etwas später) ausgeführt.
            self.draw();                // Wenn man sowas hat kennt die function this. nicht mehr. Deshalb let self = this
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {                 // Hier schauen wir ob das Bild eine andere richtung haben soll was wir einfügen möchten
            this.flipImage(movableObject);
        };
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);



        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);          // Mit dieser Function wird die dier Spiegelung rückgängig gemacht

        };
    };

    flipImage(movableObject) {
        this.ctx.save();                                // Speichert die aktuellen eigenschaften vom Kontext, weil wir wollen die nächsten Bilder wieder Normal hinzufügen
        this.ctx.translate(movableObject.width, 0); // Hier ändern wir die methode wie die Bilder eingefügt werden.
        this.ctx.scale(-1, 1);                          //Hiermit wird das Bild gespiegelt
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }


}