class Demo extends Base {
    constructor() {
        super('demo');
    }
    create() {
        //Owen 5/30/2023 - first call the inherited create function
        super.create();
        //Owen 5/30/2023 - then proceed as normal
        this.add.text(50, 150, "Demo").setFontSize(50);
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