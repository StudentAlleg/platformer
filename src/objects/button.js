class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, downFn = undefined, upFn = undefined, size = 72, padding = 5, children = undefined) {
        super(scene, x, y, children);
        
        //Owen 6/2/2023 
        let textObj = this.scene.add.text(0, 0, text)
            .setFontSize(size)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        if (downFn != undefined) {
            textObj.on('pointerdown', downFn);
        }

        if (upFn != undefined) {
            textObj.on('pointerup', upFn);
        }
            
        let backgroundObj = this.scene.add.rectangle(0, 0, textObj.width + padding, textObj.height + padding, color);

        this.add(backgroundObj);
        this.add(textObj);
    }

    onUpdate() {
        
    }
}