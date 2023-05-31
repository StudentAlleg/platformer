class Missile extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame = undefined) {
        super(scene, x, y, texture, frame);
        //make the missile and set up defaults
        this.scene.physics.add.existing(this);
        this.setDataEnabled();

    }

    launch(fuel, acceleration, angularAcceleration) {
        this.setData("Fuel", fuel);
        this.setData("Acceleration", acceleration);
        this.setData("AngularAcceleration", angularAcceleration);

        this.setAbsoluteAcceleration(acceleration);
    }

    setAbsoluteAcceleration(a) {
        
        let aX = Math.sin(this.body.rotation) * a;
        let aY = -Math.cos(this.body.rotation) * a;

        this.setAcceleration(aX, aY);
        
    }


    updateMissileFromTarget(delta, x, y) {
        let newFuel = this.getData("Fuel") - delta;
        this.setData("Fuel", newFuel);
        this.setData("targetX", x);
        this.setData("targetY", y);

        
        if (newFuel < 0) {
            //Owen 5/30/2023 - missile has no fuel, it can no longer accelerate
            this.setAcceleration(0,0);
            return
        }
        //Owen 5/30/2023 - 
    }
    
}