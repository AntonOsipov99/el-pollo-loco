/**
 * Represents a throwable object in the game.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    currentImage = 0;
    speedX = 10;
    break = false;
    direction;

    /**
     * Constructs a new ThrowableObject with initial attributes and loads initial images.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {boolean} direction - The direction in which the bottle is thrown.
     * @constructor
     */
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Throws the bottle and initiates animation.
     */
    throw() {
        this.speedY = 10;
        this.applyGravity();
        let moveInterval = setInterval(() => {
            this.move();
            if (this.break) {
                clearInterval(moveInterval);
            }
        }, 25);
        setInterval(this.rotate.bind(this), 100);
    }

    /**
     * Moves the bottle horizontally based on its direction and speed.
     */
    move() {
        if (this.direction) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    }

    /**
     * Rotates the bottle, triggering different animations based on its state.
     */
    rotate() {
        if (this.break) {
            this.acceleration = 0;
            this.speedY = 0;
            this.speedX = 0;
            this.playAnimation(this.IMAGES_SPLASH);
        } else {
            this.playAnimation(this.IMAGES_BOTTLE);
        }
    }
}
