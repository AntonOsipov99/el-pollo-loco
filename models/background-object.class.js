/**
 * Class representing a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Creates a background object with the specified image and x-coordinate.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}
