/**
 * Represents a status bar for an end boss in the game.
 * @extends DrawableObject
 * @class
 */
class StatusbarBoss extends DrawableObject {
    IMAGES_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png'
    ];
    isVisible = false;
    percentage = 100;

    /**
     * Initializes a new instance of the StatusbarBoss class with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS);
        this.x = 400;
        this.y = 30;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the percentage of the boss's health and updates the displayed image.
     * @param {number} percentage - The percentage of the boss's health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOSS[this.resolveIndexImage()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * @returns {number} - The index of the image in the IMAGES_BOSS array.
     */
    resolveIndexImage() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Handles a hit to the boss, reducing its health and checking for victory conditions.
     */
    hit() {
        if (this.whenAHitComesTooQuickly())
            return;
        this.percentage -= 20;
        if (this.endbossDead()) {
            setTimeout(() => this.gameWon(), 1000);
            setTimeout(() => this.percentage = 100, 500);
        } else
            this.lastHit = new Date().getTime();
        this.setPercentage(this.percentage);
    }

    /**
     * Checks if hits come too quickly, preventing rapid health reduction.
     * @returns {boolean} - True if hits come too quickly, otherwise false.
     */
    whenAHitComesTooQuickly() {
        return this.lastHit && (new Date().getTime() - this.lastHit) < 1000;
    }

    /**
     * Checks if the end boss is dead based on its health percentage.
     * @returns {boolean} - True if the end boss is dead (health is 0), otherwise false.
     */
    endbossDead() {
        return this.percentage == 0;
    }

    /**
     * Handles the game-winning scenario.
     */
    gameWon() {
        world.win = true;
        world.currentScreen = "end";
    }

    /**
     * Draws the status bar on the provided canvas context if it is visible.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        if (this.isVisible) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}