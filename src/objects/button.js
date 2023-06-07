//Button Class
//usage: this.scene.add.button(x, y, text, color, downFn)
//The context for downFn is the button itself, so if referencing things at the scene level, make sure to do this.scene.[variable here]


class Button extends Phaser.GameObjects.Container {
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
}
//https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
Phaser.GameObjects.GameObjectFactory.register('button', function (x, y, text, color = 0x333333, downFn = undefined, upFn = undefined, size = 72, minTime = 100000, padding = 5, children = undefined) {
	const button = new Button(this.scene, x, y, text, color, downFn, upFn, size, minTime, padding, children);

    this.displayList.add(button);
    this.updateList.add(button);

    //console.log("making button");
    return button;
})