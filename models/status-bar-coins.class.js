/**
 * Represents the status bar for tracking the percentage of collected coins.
 * @class
 * @extends DrawableObject
 */
class StatusBarCoins extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentageCoins = 0;

    /**
     * Constructs a new StatusBarCoins with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 55;
        this.width = 200;
        this.height = 60;
        this.setPercentageCoins();
    }

    /**
     * Sets the image of the status bar based on the current percentage of collected coins.
     */
    setPercentageCoins() {
        let path = this.IMAGES[this.resolveIndexImage()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES array based on the current percentage.
     * @returns {number} - The index of the image.
     */
    resolveIndexImage() {
        if (this.percentageCoins == 100) {
            return 5;
        } else if (this.percentageCoins >= 80) {
            return 4;
        } else if (this.percentageCoins >= 60) {
            return 3;
        } else if (this.percentageCoins >= 40) {
            return 2;
        } else if (this.percentageCoins >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Increases the percentage of collected coins and updates the status bar image.
     */
    collectCoin() {
        this.percentageCoins += 10; 
        if (this.percentageCoins > 100) {
            this.percentageCoins = 100;
        }
        this.setPercentageCoins();
    }
}