/**
 * Represents a chicken enemy that moves horizontally and has a walking animation.
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {

    height = 70;
    width = 100;
    y = 355;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    offset = {
        right: 5,
        left: 5,
        top: 10,
        bottom: 10,
      };

    /**
     * Creates a chicken object with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.25;
    }

    /**
     * Initiates the walking animation and movement for the chicken.
     */
    startWalkingAnimation() {
        setInterval(() => {
            this.moveLeft();
        }, 16);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}