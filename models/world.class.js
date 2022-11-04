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
    background_sound = new Audio('audio/music.mp3');




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        // this.background_sound.play();
        // this.background_sound.volume = 0.03;
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
        if (this.keyboard.ENTER) {
            let bottle = new ThrowableObjects(this.character.x + 10, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // wird benötigen das um Canvas zu clearn das wird es neu Updaten können.

        this.ctx.translate(this.camera_x, 0);// Unser gesamter Ausschnitt wird um -100 verschoben   -- translate verschiebt alles um eine gewisse Variabele

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
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