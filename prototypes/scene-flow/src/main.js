class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        this.load.path = "scene-flow/src/objects/";
        this.load.image('titleImage', 'Title.jpg');
    }
    

    create() {
        this.titleImage = this.add.sprite(1920/2, 1080/2, 'titleImage');
        this.titleImage.alpha = 0;
        this.titleImage.scale = 0.81;

        this.tweens.add({
            targets: this.titleImage,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.scene.start('logo');
            }
        });
    }
}

class Logo extends Phaser.Scene {
    constructor() {
        super('logo');
    }

    preload() {
        this.load.path = "scene-flow/src/objects/";
        this.load.image('logoImage', 'Logo.png');
    }

    create() {
        this.logoImage = this.add.sprite(1920/2, 1080/2, 'logoImage');
        this.logoImage.alpha = 0;
        this.logoImage.scale = 1.75;

        this.tweens.add({
            targets: this.logoImage,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.scene.start('menu');
            }
        });
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {
        this.load.path = "scene-flow/src/objects/";
        this.load.image('menuImage', 'MainMenu.jpg');
    }

    create() {
        this.menuImage = this.add.sprite(1920/2, 1080/2, 'menuImage');
        this.menuImage.alpha = 0;
        this.menuImage.scale = 1.75;

        // this.add.button(this.cameras.main.width / 2, this.cameras.main.height / 3, TEXT, {
        //     text: 'Start',
        //     textStyle: { fontSize: '72px' },
        //     color: 0x00AA00,
        // }, () => {
        //     this.scene.start('demo1');
        // });
    }
}
class Demo1 extends Base {
    constructor() {
        super('demo1');
    }
    preload() {
        super.preload();
        this.load.tilemapTiledJSON("map", "tilemap/map1.json");
    }

    create() {
        //Owen 5/30/2023 - first call the inherited create function
        super.create();
        //Owen 5/30/2023 - then proceed as normal

        this.map = this.make.tilemap({key: "map"});
        this.tileset = this.map.addTilesetImage("tempset", "tiles");

        
        this.worldLayer = this.loadPlayLayer(this.map, "world", this.tileset);

        this.buttons.push(this.add.button(this.cameras.main.width/2, this.cameras.main.height/3, TEXT,
        {
            text: "Win",
            textStyle: {fontSize: "72px"},
            color: 0x00AA00,
        },
        () => {
            console.log(this);
            console.log(this.scene);
            this.scene.scene.gotoScene("demo2");
        }));

        this.add.text(50, 150, "Demo1").setFontSize(50);
        //this.missile.body.setVelocityY(-20);
        //this.missile.launch();
    }
}

class Demo2 extends Base {
    constructor() {
        super("demo2");
    }

    preload() {
        super.preload();
        this.load.tilemapTiledJSON("map", "tilemap/map1.json");
    }
    create() {
        //Owen 5/30/2023 - first call the inherited create function
        super.create();
        //Owen 5/30/2023 - then proceed as normal

        this.map = this.make.tilemap({key: "map"});
        this.tileset = this.map.addTilesetImage("tempset", "tiles");

        
        this.worldLayer = this.loadPlayLayer(this.map, "world", this.tileset);

        this.buttons.push(this.add.button(this.cameras.main.width/2, this.cameras.main.height/3, TEXT,
        {
            text: "Win",
            textStyle: {fontSize: "72px"},
            color: 0x00AA00,
        },
        () => {
            this.scene.scene.gotoScene("demo1");
        }));

        this.add.text(50, 150, "Demo2").setFontSize(50);
        //this.missile.body.setVelocityY(-20);
        //this.missile.launch();
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
    scene: [Title, Logo, Menu, Demo1, Demo2],
    title: "Demo",
    backgroundColor: 0x444444,
});
