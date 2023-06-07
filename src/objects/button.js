class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, color = 0x333333, downFn = undefined, upFn = undefined, size = 72, padding = 5, children = undefined) {
        //Owen 6/6/2023 - TODO - give a minimum time between button activations
        
        super(scene, x, y, children);
        this.setDataEnabled();
        //Owen 6/2/2023 
        this.textObj = this.scene.add.text(0, 0, text)
            .setFontSize(size)
            .setOrigin(0.5, 0.5)
            .setInteractive({useHandCursor: true});

        if (downFn != undefined) {
            this.setData("downFunction", downFn)
            this.textObj.on('pointerdown', downFn);
        }

        if (upFn != undefined) {
            this.setData("upFunction", upFn)
            this.textObj.on('pointerup', upFn);
        }
            
        this.backgroundObj = this.scene.add.rectangle(0, 0, this.textObj.width + padding, this.textObj.height + padding, color);

       
        this.add(this.backgroundObj);
        this.add(this.textObj);
        
        //console.log("end create button");
    }

    press(delta) {

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
Phaser.GameObjects.GameObjectFactory.register('button', function (x, y, text, color = 0x333333, downFn = undefined, upFn = undefined, size = 72, padding = 5, children = undefined) {
	const button = new Button(this.scene, x, y, text, color, downFn, upFn ,size, padding, children);

    this.displayList.add(button);
    this.updateList.add(button);

    //console.log("making button");
    return button;
})