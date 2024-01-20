/**
 * Represents chicks in the game that exhibit walking, jumping, and falling behavior.
 * @class
 * @extends MovableObject
 */
class Chicks extends MovableObject {

    height = 60;
    width = 65;
    y = 365;
    speedY = 25;
    acceleration = 2.5;
    isJumping = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    offset = {
        right: 5,
        left: 5,
        top: 5,
        bottom: 5,
    };

    /**
     * Creates a chicks object with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.25;
        this.letChicksJumpAndFall();
    }

    /**
     * Starts the walking animation for the chicks.
     */
    startWalkingAnimation() {
        setInterval(() => this.moveLeft(), 16);
        setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
    }

    /**
     * Initiates the jumping and falling behavior for the chicks.
     */
    letChicksJumpAndFall() {
        let jumpInterval = 200 + Math.random() * 500;
        let jumpHeight = 3 + Math.random() * 10;

        setInterval(() => {
            this.chicksJumpAndFall( jumpInterval, jumpHeight);
        }, 1000 / 25);
    }

    /**
     * Handles the jumping behavior of the chicks.
     */
    chicksJumping() {
        if (this.speedY >= 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.isJumping = false;
        }
    }

    /**
     * Handles the falling behavior of the chicks.
     */
    chicksFall() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
    }

    /**
     * Checks if the chicks are in the air.
     * @returns {boolean} - True if the chicks are in the air, false otherwise.
     */
    chicksInAir() {
        return this.y < 365;
    }

    /**
     * Combines the jumping and falling behavior of the chicks.
     * @param {number} jumpInterval - The interval between jumps.
     * @param {number} jumpHeight - The height of each jump.
     */
    chicksJumpAndFall( jumpInterval, jumpHeight) {
        if (this.isJumping) {
            this.chicksJumping();
        } else {
            if (this.chicksInAir()) {
                this.chicksFall();
            } else {
                this.y = 365;
                this.speedY = 0;
                setTimeout(() => {
                    this.isJumping = true;
                    this.speedY = jumpHeight;
                }, jumpInterval);
            }
        }
    }
}