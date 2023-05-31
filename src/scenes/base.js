class Base extends Phaser.Scene {
 
    constructor(name) {
        super(name);
    }

    preload() {
        //super.preload();
        this.preload.path = "../../assets";
    }

    create() {
        //super.create();
        this.add.text(50, 50, "Base").setFontSize(50);
    }

    update() {
        super.update();
    }
}