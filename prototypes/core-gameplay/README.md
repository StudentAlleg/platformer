Core Gameplay Requirements
Audio:
Visual:
    * Tilemap (./src/main.js:15)
        - The level is based on a tilemap
    * Sprite (./src/scenes/base.js:44)
        - The missile is an object extended from sprite
Motion:
    * Missile Update(./src/scenes/base.js:66)
        - When launched, the missile will accelerate towards the pointers current location.
Progression:
    * Score (./src/scenes/base.js:67)
    * Difficulty
        - Levels will increase in difficulty
Prefabs:
    * Button (./src/objects/button.js)
        - Subclass of container, to act as a button
    * Missile (./src/objects/missile.js)
        - Subclass of sprite, this implements all missile logic
    * Base (./src/scenes/base.js)
        - Subclass of scene, to act as the base level
