//Button Class
//usage: this.scene.add.button(x, y, text, color, downFn)
//The context for downFn is the button itself, so if referencing things at the scene level, make sure to do this.scene.[variable here]
var TEXT = 0;
var SPRITE = 1;

//2 config types, one for a text generated button, other for a sprite button
//text generated
{
    text = "text here",
    textStyle = {}, //a text config object
    color = 0x444444, //the background color of the button
    padding = 0 //the padding between the text and the background object
}

//sprite
{
    key1 = "first", //the default aspect of the button
    key2 = "second" //the aspect to display when the mouse is held down
}

class Button extends Phaser.GameObjects.Container {
    constructor (scene, x, y, type, config, downFn = undefined, upFn = undefined, minTime = 100000) {
        console.log(x);
        console.log(y);
        console.log(type);
        console.log(config);
        console.log(downFn);
        console.log(upFn);
        console.log(minTime);
        
        
        super(scene, x, y);
        let rt = () => {this.resetTime};
        let downFunctions = [rt];
        let upFunctions = [];
        //Owen 6/7/20 - input up and down functions if they exist
        if (downFn != undefined) {
            downFunctions.push(downFn);
        }

        if (upFn != undefined) {
            upFunctions.push[upFn];
        }
        this.front = undefined;
        if (type == TEXT) {
            if (config.text == undefined) {
                console.log("created a text button with no text");
                return;
            }
            //default variables
            if (config.color == undefined) {
                config.color = 0x444444;
            }
            if (config.padding == undefined) {
                config.padding = 5;
            }
            

            this.front = this.scene.add.text(0, 0, config.text, config.textStyle).setOrigin(0.5);
            this.back = this.scene.add.rectangle(0, 0, this.front.width + config.padding, this.front.height + config.padding, config.color);
            this.add(this.back);

        } else if (type == SPRITE) {
            if (config.key1 == undefined) {
                console.log("created a sprite button with no sprite");
                return;
            }
            this.front = this.scene.add.sprite(0, 0, config.key1);
            if (config.key2 != undefined) {
                let changeTo2 = () => {
                    this.front.setTexture(config.key2);
                }
                downFunctions.push(changeTo2);

                let changeTo1 = () => {
                    this.front.setTexture(config.key1);
                }
                upFunctions.push(changeTo1);
            }
        } else {
            console.log("Invalid type: " + type);
            return;
        }

        this.setDataEnabled();
        this.front.setInteractive({useHandCursor: true});
        this.setData("minTime", minTime);
        this.setData("elaspedTime", minTime);

        //Owen 6/7/2023 now onto functions
        if (downFunctions.length > 0) {
            //Owen 6/7/2023 - if we have down functions, call them all
            let dF = () => {
                //console.log(this);
                for (let fn of downFunctions) {
                    fn();
                }
            }
            this.setData("downFunction", dF);
            this.front.on("pointerdown", dF, this);
        }

        //Owen 6/7/2023 now for up functions
        
        if (upFunctions.length > 0) {
            //Owen 6/7/2023 - if we have up functions, call them all
            let uF = () => {
                for (let fn of upFunctions) {
                    fn();
                }
            }
            this.setData("downFunction", uF);
            this.front.on("pointerup", uF, this);
        }
        this.add(this.front);
    }

    preUpdate(time, delta) {
        //super.preUpdate(time, delta);
    }

    press(delta) {
        this.setData("elaspedTime", this.getData("elaspedTime") - delta);
        
        console.log(this.getData("elaspedTime"));
        
        //Owen 6/6/2023 - if elasped time < 0, press the button
        if (this.getData("elaspedTime") <= 0) {
            this.getData("downFunction")();

            this.resetTime();
        }
    }

    resetTime() {
        console.log("reseting time");
        this.setData("elaspedTime", this.getData("minTime"));
    }
}

/*class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, color = 0x333333, downFn = undefined, upFn = undefined, size = 72, minTime = 100000, padding = 5, children = undefined) {
        //Owen 6/6/2023 - TODO - give a minimum time between button activations
        super(scene, x, y, children);
        this.setDataEnabled();
        //Owen 6/2/2023 
        this.textObj = this.scene.add.text(0, 0, text)
            .setFontSize(size)
            .setOrigin(0.5, 0.5)
            .setInteractive({useHandCursor: true});
        
        if (downFn != undefined) {
            let downFunction = () => {
                downFn();
                //Owen 6/6/2023 - reset elasped time to prevent unwanted double clicks (not currently working)
                this.resetTime();
            };
            this.setData("downFunction", downFunction);
            this.textObj.on('pointerdown', downFunction, this);
        }

        if (upFn != undefined) {
            this.setData("upFunction", upFn)
            this.textObj.on('pointerup', upFn, this);
        }
            
        this.backgroundObj = this.scene.add.rectangle(0, 0, this.textObj.width + padding, this.textObj.height + padding, color);

       
        this.add(this.backgroundObj);
        this.add(this.textObj);

        this.setData("minTime", minTime);
        this.setData("elaspedTime", minTime);
        
        //console.log("end create button");
    }

    press(delta) {
        this.setData("elaspedTime", this.getData("elaspedTime") - delta);
        
        console.log(this.getData("elaspedTime"));
        
        //Owen 6/6/2023 - if elasped time < 0, press the button
        if (this.getData("elaspedTime") <= 0) {
            this.getData("downFunction")();

            this.resetTime();
        }
    }

    resetTime() {
        this.setData("elaspedTime", this.getData("minTime"));
    }

    //https://phaser.discourse.group/t/best-practice-for-composite-game-objects/10617
    preUpdate(time, delta) {
        super.preUpdate;
        this.textObj.x = 0;
        this.textObj.y = 0;
        
        this.backgroundObj.x = 0;
        this.backgroundObj.y = 0;
    }

    onUpdate() {

    }
}*/
//https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
Phaser.GameObjects.GameObjectFactory.register('button', function (x, y, type, config, downFn = undefined, upFn = undefined, minTime = 100000) {
	const button = new Button(this.scene, x, y, type, config, downFn, upFn, minTime);

    this.displayList.add(button);
    this.updateList.add(button);

    //console.log("making button");
    return button;
})