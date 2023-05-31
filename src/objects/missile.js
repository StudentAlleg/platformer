class Missile extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame = undefined) {
        super(scene, x, y, texture, frame);
        //make the missile and set up defaults
        this.scene.physics.add.existing(this);
        this.setDataEnabled();

    }

    launch(fuel = 20000, acceleration = 10, angularAcceleration = 5, maxV = 500, maxAV = 20) {
        this.setData("Fuel", fuel);
        this.setData("Acceleration", acceleration);
        this.setData("AngularAcceleration", angularAcceleration);

        this.setMaxVelocity(maxV);
        this.maxAngular(maxAV);

        this.setAbsoluteAcceleration(acceleration);
    }

    setAbsoluteAcceleration(accel) {
        
        let aX = Math.sin(this.body.rotation) * accel;
        let aY = -Math.cos(this.body.rotation) * accel;

        this.setAcceleration(aX, aY);
        
    }


    updateMissileFromTarget(delta, x, y, tolerance = 0) {
        let newFuel = this.getData("Fuel") - delta;
        this.setData("Fuel", newFuel);
        this.setData("targetX", x);
        this.setData("targetY", y);

        
        if (newFuel < 0) {
            //Owen 5/30/2023 - missile has no fuel, it can no longer accelerate
            this.setAcceleration(0, 0);
            this.setAngularAcceleration(0);
            return
        }
        //Owen 5/30/2023 - now do some trig to figure out what angle the missile needs to be pointed at the target

        targetRotation = Math.atan2(x - this.x, y - this.y);

        //Owen 5/30/2023 check to see if the missile is facing the right way or do we need to change it
        if (targetRotation > this.rotation + tolerance) {
            this.setAngularAcceleration(this.getData("AngularAcceleration"));
        }

        if (targetRotation < this.rotation - tolerance) {
            this.setAngularAcceleration(-(this.getData("AngularAcceleration")));
        }
        //Owen 5/30/2023 - update velocity so it corisponds with our rotation        
        setAbsoluteAcceleration(this.getData("AngularAcceleration"));
    }
}