/**
 * Represents a coin object in the game, which is a movable object with a specific appearance.
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {

    height = 100;
    width = 100;
    y = 300;
    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a coin object with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    /**
     * Initiates the animation for the coin, causing it to switch between coin images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}
