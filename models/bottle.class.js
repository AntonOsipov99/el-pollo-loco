/**
 * Class representing a salsa bottle object in the game.
 * @extends MovableObject
 */
class Bottle extends MovableObject {

    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
    };
    IMAGES_BOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a salsa bottle object with the default image, size, and position.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_GROUND);
        this.height = 60;
        this.width = 50;
        this.x = 300;
        this.y = 370;
        this.animate();
    }

    /**
     * Animates the salsa bottle by playing the on-ground animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_GROUND);
        }, 200);
    }

}