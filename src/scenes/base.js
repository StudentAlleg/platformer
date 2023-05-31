class Base extends Phaser.Scene {
 
    constructor(name) {
        super(name);
    }

    preload() {
        //super.preload();
        this.load.path = "assets/";
        this.load.image('Missile', 'car.png');
    }

    create() {
        //super.create();
        this.add.text(50, 50, "Base").setFontSize(50);

        this.missile = new Missile(this, 500, 500, "Missile");

    }

    update(delta) {
        //Owen 5/30/2023 - this will eventually be the pointer x,y, or its last known position 
        this.missile.updateMissileFromTarget(delta, 0, 0);
    }
}