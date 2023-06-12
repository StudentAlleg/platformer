class Base extends Phaser.Scene {
    init(data) {
        this.score = data.score || 0;
        this.settings = data.settings || {step: 1};;
    }

    constructor(name) {
        super(name);
    }

    preload() {
        //super.preload();
        this.load.path = "./assets/";
        this.load.image('Missile', 'Missile.png');
        this.load.image("green", "tilemap/good.png");
        this.load.image("red", "tilemap/bad.png");
        this.load.image("tiles", "tilemap/tempset.png");
    }

    create() {
        //super.create();
        this.acceleration = 100;
        this.fuel = 2 * (10 ** 8);

        this.buttons = [];
        this.add.text(50, 50, "Base").setFontSize(50);
        let launchB = this.add.button(200, this.cameras.main.height - 50, TEXT, {
            text: "Launch",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
            color2: 0x004400,
            color3: 0x440000,
            padding: 5,
            }, 
            //Owen 6/2/2023 function for when the mouse is held down
            () => {
                    this.scene.scene.missile.launch(this.scene.scene.fuel, this.scene.scene.acceleration);
                },
            //Owen 6/2/2023 function for when the mouse is released
            undefined);
        launchB.setPosition(launchB.getWidth(), this.cameras.main.height - launchB.getHeight());
        this.buttons.push(launchB);

        let accelUpB = this.add.button(launchB.x + launchB.getWidth(), launchB.y, TEXT, {
            text: "Accel UP",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
            PADDING: 5,
            },
            () => {
                this.scene.scene.acceleration += this.scene.scene.settings.step;
            }
        );

        this.buttons.push(accelUpB);

        let accelDownB = this.add.button(accelUpB.x + accelUpB.getWidth(), accelUpB.y, TEXT, {
            text: "Accel DOWN",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
            PADDING: 5,
            },
            () => {
                this.scene.scene.acceleration -= this.scene.scene.settings.step;
                //Owen 6/10/2023 - dont let acceleration go below zero. Might need to do this elsewhere
                if (this.scene.scene.acceleration < 0) {
                    this.scene.scene.acceleration = 1;
                }
            }
        );

        this.buttons.push(accelDownB);

        console.log(launchB);
        console.log(accelUpB);
        console.log(accelDownB);
        
        this.scoreObj = this.add.button(this.cameras.main.width - 200, 59, TEXT, {
            text: this.score,
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        });

        
        this.accelDisplay = this.add.button(600, this.cameras.main.height - 150, TEXT, {
            text: this.acceleration,
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        });


        this.settingsB = this.add.button(200, 200, TEXT, {
            text: "Settings",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        },
        () => this.scene.scene.gotoSettings());
        
        this.missile = this.add.missile(500, 500, "Missile").setScale(0.1);



        //Owen 6/10/2023 - reset the time when the mouse button is released
        this.buttonReleased = false;
    }

    loadPlayLayer(map, key, tileset) {
        let layer = map.createLayer(key, tileset);
        layer.setCollisionByProperty({collides: true});
        layer.setDepth(-1);
        this.physics.add.collider(this.missile, layer, () => {
            this.missile.reset();
        });
        return layer;
    }

    update(delta) {
        
        let pointerX = this.input.activePointer.x;
        let pointerY = this.input.activePointer.y;

        //Owen 6/6/2023 - if the missile is flying, update it
        if (this.missile.state == FLYING) {
            this.missile.updateMissileFromTarget(delta, pointerX, pointerY);
            this.score += delta/(10 ** 4);
        }
        //Owen 6/6/2023 - else, it isn't, so we need to see if the pointer is down
        //Owen 6/10/2023 - removing this functionality until fixed or is neccassary
        else 
        {/*
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
            } else if (!this.buttonReleased) {
                for (let button of this.buttons) {
                    button.resetTime();
                }
            }*/
        }
        
        this.scoreObj.changeText(Math.floor(this.score));
        this.accelDisplay.changeText(this.acceleration);
    }

    loadMap(key) {

    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, {score: this.score, settings: this.settings});
        });
    }

    gotoSettings() {
        this.scene.sleep();
        this.scene.run("settings", {settings: this.settings, returnKey: this.scene.key});
    }

    //Owen 6/11/2023 - a helper function to get the information from phaser objects logged to console\
    logObject(obj) {
        //console.log(`X:)
    }
}