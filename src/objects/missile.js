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
    }

    launch(fuel = 200000000, acceleration = 100,  maxV = 50000) {
        this.setData("Fuel", fuel);
        this.setData("Acceleration", acceleration);
        //this.setData("AngularAcceleration", angularAcceleration);

        this.body.setMaxVelocity(maxV);
        //this.body.maxAngular = maxAV;

        this.setAbsoluteAcceleration(acceleration);
        this.setState(FLYING);
    }

    setAbsoluteAcceleration(accel) {
        
        let aX = Math.sin(this.body.rotation) * accel;
        let aY = Math.cos(this.body.rotation) * accel;

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

        let targetRotation = Math.atan2(x - this.x, y - this.y);

        this.body.rotation = targetRotation;
        //Owen 5/30/2023 check to see if the missile is facing the right way or do we need to change it
        /*if (targetRotation < this.rotation + tolerance) {
            this.body.setAngularVelocity(this.getData("AngularAcceleration"));
        }

        if (targetRotation > this.rotation - tolerance) {
            this.body.setAngularVelocity(-(this.getData("AngularAcceleration")));
        }
        console.log(this.body.angularVelocity);
        console.log(this.body.rotation);
        console.log(targetRotation)*/
        
        //Owen 5/30/2023 - update velocity so it corrisponds with our rotation        
        this.setAbsoluteAcceleration(this.getData("Acceleration"));
    }
}

//https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
Phaser.GameObjects.GameObjectFactory.register('missile', function (x, y, texture, frame = undefined) {
	const missile = new Missile(this.scene, x, y, texture, frame);

    this.displayList.add(missile);
    this.updateList.add(missile);

    return missile;
})
