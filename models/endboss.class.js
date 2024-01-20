/**
 * Represents an end boss object in the game.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    speed = 40;
    offset = {
        right: 30,
        left: 0,
        top: 40,
        bottom: 20,
    };
    bossHurt = false;
    bossWalking = false;
    animateInterval;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Creates a new Endboss instance.
     * Loads the image of the end boss and initializes animations.
     * @constructor
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 3700;
        this.animate();
    }

    /**
     * Initiates the animation of the end boss.
     */
    animate() {
        this.animateInterval = setInterval(() => {
            this.bossMoving();
            this.bossWasHit();
        }, 200);
    }

    /**
     * Handles the animation of the end boss while moving.
     */
    bossMoving() {
        if (this.bossWalking) {
            if (!this.alertInterval) {
                this.alertInterval = setInterval(() => {
                    this.playAnimation(this.IMAGES_ALERT);
                }, 200);
                setTimeout(() => {
                    clearInterval(this.alertInterval);
                    this.alertInterval = null;
                }, 200);
            }
            this.moveLeft();
        }
    }

    /**
     * Handles the animation of the end boss when it is hit.
     * If the end boss is not hurt, it plays the walking animation; otherwise, it plays the hurt animation.
     */
    bossWasHit() {
        if (!this.bossHurt) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_HURT);
            setTimeout(() => {
                this.bossHurt = false;
            }, 500);
        }
    }

    /**
     * Initiates the death animation of the end boss.
     * Clears the animation interval and plays the dead animation for a brief period.
     */
    animateDeath() {
        clearInterval(this.animateInterval);
        let deathInterval;
        deathInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
        setTimeout(() => {
            clearInterval(deathInterval);
        }, 500);
    }
}
