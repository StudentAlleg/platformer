class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }
    create() {
        this.add.text(50, 50, "Demo").setFontSize(50);
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Demo],
    title: "Demo",
});