class Missile extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame = undefined) {
        super(scene, x, y, texture, frame);
        //make the missile and set up defaults
        this.scene.physics.existing(this);
    }

    setAcceleration(a) {
        //set the accel
    }

    
    
}