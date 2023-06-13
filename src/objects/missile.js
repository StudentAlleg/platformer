var WAITING = 0;
var FLYING = 1;

class Missile extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame = undefined) {
        super(scene, x, y, texture, frame);
        //make the missile and set up defaults
        this.scene.physics.add.existing(this);
        this.setDataEnabled();
        
        //Owen 6/6/2023 - for use in update
        this.setState(WAITING);
        this.setRotation(270);

        //Owen 6/7/2023 - I have no idea why these numbers make sense
        this.body.setCircle(this.displayHeight/4, this.displayWidth/3, this.displayHeight/3);
    }

    launch(fuel = 200000000, acceleration = 100,  maxV = 50000) {
        this.setData("Fuel", fuel);
        this.setData("Acceleration", acceleration);
        //this.setData("AngularAcceleration", angularAcceleration);

        this.setData("startPosX", this.x);
        this.setData("startPosY", this.y);

        this.body.setMaxVelocity(maxV);
        //this.body.maxAngular = maxAV;

        this.setAbsoluteAcceleration(acceleration);
        this.setState(FLYING);
    }

    setAbsoluteAcceleration(accel) {
        
        let aX = Math.cos(this.rotation) * accel;
        let aY = Math.sin(this.rotation) * accel;

        this.body.setAcceleration(aX, aY);
        //console.log(this.body.acceleration)
        
    }


    updateMissileFromTarget(delta, x, y) {
        let newFuel = this.getData("Fuel") - delta;
        this.setData("Fuel", newFuel);
        this.setData("targetX", x);
        this.setData("targetY", y);
        if (newFuel < 0) {
            //Owen 5/30/2023 - missile has no fuel, it can no longer accelerate
            this.body.setAcceleration(0, 0);
            this.body.setAngularAcceleration(0);
            return
        }
        //Owen 5/30/2023 - now do some trig to figure out what angle the missile needs to be pointed at the target

        let targetRotation = Math.atan2(y - this.y, x - this.x);

        //this.body.rotation = targetRotation;
        this.setRotation(targetRotation);
        //Owen 5/30/2023 - update velocity so it corrisponds with our rotation        
        this.setAbsoluteAcceleration(this.getData("Acceleration"));
    }

    reset() {
        //Owen 6/9/2023 - reset missile to starting position
        this.setState(WAITING);
        //Owen 6/13/2023 - 0 out missile movement
        this.body.setAcceleration(0, 0);
        this.body.setAngularAcceleration(0);
        this.body.setVelocity(0, 0);
        this.setRotation(270);
        this.setPosition(this.getData("startPosX"), this.getData("startPosY"));
        console.log("reset");
    }
}

//https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
Phaser.GameObjects.GameObjectFactory.register('missile', function (x, y, texture, frame = undefined) {
	const missile = new Missile(this.scene, x, y, texture, frame);

    this.displayList.add(missile);
    this.updateList.add(missile);

    return missile;
})
