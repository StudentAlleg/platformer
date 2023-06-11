class Menu extends Phaser.Scene {
    init(data) {
        this.settings = data.settings;
        this.returnKey = data.returnKey;
    }

    constructor() {
        super("menu");
    }

    preload() {

    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        this.settings.step = 1;

        this.backB = this.add.button(centerX, centerY - 200, TEXT, {
            text: "BACK",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        },
        () => this.scene.scene.resumeScene());

        this.upStepB = this.add.button(centerX, centerY, TEXT, {
            text: "Increase Step (" + this.settings.step +")",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        },
        () => {
            this.scene.scene.settings.step++;
        });

        this.downStepB = this.add.button(centerX, centerY + 200, TEXT, {
            text: "Decrease Step (" + this.settings.step +")",
            textStyle: {fontSize: "72px"},
            color: 0x444444,
        },
        () => {
            this.scene.scene.settings.step--;
            if (this.scene.scene.settings.step < 1) {
                this.scene.scene.settings.step = 1;
            }
        });
    }

    resumeScene() {
        this.scene.sleep();
        this.scene.run(this.returnKey, {settings: this.settings})
    }

    update(delta) {
        this.upStepB.changeText("Increase Step (" + this.settings.step +")");
        this.downStepB.changeText("Decrease Step (" + this.settings.step +")");
    }
}