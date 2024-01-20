/**
 * Represents a cloud object in the game, which is a movable object with a specific appearance.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Creates a cloud object with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Initiates the animation for the cloud, causing it to move to the left.
     */
    animate() {
        this.moveLeft();
    }
}