class Cloud extends MovableObject {
    y = 0;
    height = 480;
    width = 720;
    

    constructor(){ 
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
        this.animate();
    }

    animate(){
        this.moveLeft();
    }

   
}