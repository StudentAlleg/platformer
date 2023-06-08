class Base extends Phaser.Scene {
 
    constructor(name) {
        super(name);
    }

    preload() {
        //super.preload();
        this.load.path = "assets/";
        this.load.image('Missile', 'Missile.png');
        this.load.image("green", "tilemap/good.png");
        this.load.image("red", "tilemap/bad.png");
    }

    create() {
        //super.create();
        this.buttons = [];
        this.add.text(50, 50, "Base").setFontSize(50);

        this.buttons.push(this.add.button(600, 600, TEXT, {
            text: "test1",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
            padding: 5,
            }, 
            //Owen 6/2/2023 function for when the mouse is held down
            () => {
                    console.log("test1");
                    //console.log(this);
                },
            //Owen 6/2/2023 function for when the mouse is released
            undefined));

        this.buttons.push(this.add.button(800, 800, SPRITE,
            {
                key1: "red",
                key2: "green",
            },
            () => {
                console.log("test2");
                //console.log(this);
            },));
        
        this.missile = this.add.missile(500, 500, "Missile").setScale(0.1);

    }

    update(delta) {
        
        let pointerX = this.input.activePointer.x;
        let pointerY = this.input.activePointer.y;

        //Owen 6/6/2023 - if the missile is flying, update it
        if (this.missile.state == FLYING) {
            this.missile.updateMissileFromTarget(delta, pointerX, pointerY);
        }
        //Owen 6/6/2023 - else, it isn't, so we need to see if the pointer is down
        else 
        {
            if (this.input.activePointer.isDown) {
                 //Owen 6/2/2023 - if down, loop through all of our buttons to see if it is down over a button. If so, press it.
                 for (let button of this.buttons) {
                    //console.log(button);
                    //Owen 6/2/2023 - TODO, check if the active pointer is over a button, and if so, trigger that button if enough time has passed
                    //This is so the user does not have to spam click to increase
                    //A better solution might be to implement an input box
                    //Or use a different type of input
                    if (button.getBounds().contains(pointerX, pointerY)) {
                        button.press(delta);
                        //console.log("pressing button");
                    }
                }
            }
       
        }
        
        
    }
}