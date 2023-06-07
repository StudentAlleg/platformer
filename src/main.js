class Demo extends Base {
    constructor() {
        super('demo');
    }
    create() {
        //Owen 5/30/2023 - first call the inherited create function
        super.create();
        //Owen 5/30/2023 - then proceed as normal
        this.add.text(50, 150, "Demo").setFontSize(50);
        //this.missile.body.setVelocityY(-20);
        this.missile.launch();
    }
    
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Demo],
    title: "Demo",
    backgroundColor: 0x444444,
});