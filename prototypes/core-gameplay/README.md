Core Gameplay Requirements
Audio:
    * Launch Sound (./src/base.js:41)
        - Sound when the launch button is pressed
    * Loop Sound (./src/base.js:40)
        - Sound while missile is moving
Visual:
    * Tilemap (./src/main.js:15)
        - The level is based on a tilemap
    * Sprite (./src/scenes/base.js:100)
        - The missile is an object extended from sprite
Motion:
    * Missile Update(./src/scenes/base.js:125)
        - When launched, the missile will accelerate towards the pointers current location.
Progression:
    * Score (./src/scenes/base.js:126)
    * Difficulty
        - Levels will increase in difficulty
Prefabs:
    * Button (./src/objects/button.js)
        - Subclass of container, to act as a button
    * Missile (./src/objects/missile.js)
        - Subclass of sprite, this implements all missile logic
    * Base (./src/scenes/base.js)
        - Subclass of scene, to act as the base level
