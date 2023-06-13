class LevelEnd extends Phaser.Scene {
    init(data) {
        this.score = data.score || 0;
        this.settings = data.settings || {step: 1};
        this.nextKey = data.nextKey || "menu";
    }

    constructor() {
        super("levelEnd");
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.scoreDisplay = this.add.button(centerX, centerY - 100, TEXT, {
            text: Math.floor(this.score),
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        });

        this.nextLevel = this.add.button(centerX, centerY + 100, TEXT, {
            text: "Next Level",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
            color2: 0x004400,
            color3: 0x440000,
        },
        () => {
            this.scene.start(this.nextKey, {score: this.score, settings: this.settings});
            });
    }
}