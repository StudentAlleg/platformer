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
        this.buttons = [];
        this.add.text(50, 50, "Base").setFontSize(50);

        this.testB = this.add.button(600, 600, "test", 0x333333, 
        //Owen 6/2/2023 function for when the mouse is held down
        () => {console.log("test");},
        //Owen 6/2/2023 function for when the mouse is released
        undefined);

        this.missile = this.add.missile(500, 500, "Missile");

    }

    update(delta) {
        //Owen 5/30/2023 - this will eventually be the pointer x,y, or its last known position 
        this.missile.updateMissileFromTarget(delta, this.input.activePointer.x, this.input.activePointer.y);
        //Owen 6/2/2023 - loop through all of our buttons
        for (let button of this.buttons) {
            //Owen 6/2/2023 - TODO, check if the active pointer is over a button, and if so, trigger that button if enough time has passed
            //This is so the user does not have to spam click to increase
            //A better solution might be to implement an input box
            //Or use a different type of input
            
        }
    }
}