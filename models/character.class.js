/**
* Represents the main character of the game, Pepe, with movement and animation functionalities.
* @class
* @extends MovableObject
*/
class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 50;
    x = 50;
    speed = 10;
    offset = {
        top: 120,
        bottom: 10,
        left: 40,
        right: 30
    };
    jump_sound = new Audio('audios/jump-sound.mp3');
    sleep_sound = new Audio('audios/sleep.mp3');
    fallsAsleep = 0;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    isJumping = false;

    /**
     * Creates a new character object with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates the animations for movement and images.
     */
    animate() {
        this.animateMovement();
        this.animateImages();
        this.fallsAsleepSoon();
    }

    /**
     * Initiates the animation for movement.
     */
    animateMovement() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
    }

    /**
     * Increments the fallsAsleep property at regular intervals.
     */
    fallsAsleepSoon() {
        setInterval(() => {
            this.fallsAsleep += 1;
        }, 1000);
    }

    /**
     * Moves the character based on keyboard input and updates the camera position.
     */
    moveCharacter() {
        this.number++;
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} - True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} - True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left and sets the direction flag.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} - True if the character can jump, false otherwise.
     */
    canJump() {
        return world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Performs a jump action and plays the jump sound.
     */
    jump() {
        super.jump();
        if (!world.mute)
            this.jump_sound.play();
    }

    /**
     * Initiates the animation for images.
     */
    animateImages() {
        setInterval(() => this.playCharacter(), 100);
    }

    /**
     * Plays the appropriate animation based on the character's state.
     */
    playCharacter() {
        this.characterIdle();
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.fallsAsleep = 0;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.fallsAsleep = 0;
        } else if (this.isAboveGround()) {
            this.jumpAnimation();
            this.fallsAsleep = 0;
        } else {
        this.characterMoving();
        }
    }

    /**
     * Checks if the character is moving either to the right or left.
     * If true, plays the walking animation and resets the fallsAsleep property to 0.
     */ 
    characterMoving() {
            if (this.isJumping)
                this.isJumping = false;
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.fallsAsleep = 0;
            }
    }

    /**
     * Initiates the jump animation, setting the jumping flag.
     */
    jumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.isJumping = true;
    }

    /**
     * Manages the character's idle state based on the fallsAsleep property.
     * Plays either the idle animation or the sleep animation and sound.
     */
    characterIdle() {
        if (this.fallsAsleep < 5) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.playAnimation(this.IMAGES_SLEEP);
            if (!world.mute)
                this.sleep_sound.play();
        }
    }
}