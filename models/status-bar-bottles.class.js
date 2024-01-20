/**
 * Represents the status bar for tracking the percentage of collected bottles.
 * @class
 * @extends DrawableObject
 */
class StatusBarBottles extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    percentageBottles = 0;

    /**
     * Constructs a new StatusBarBottles with default attributes and loads initial images.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 110;
        this.width = 200;
        this.height = 60;
        this.setPercentageBottles();
    }

    /**
     * Sets the image of the status bar based on the current percentage of collected bottles.
     */
    setPercentageBottles() {
        let path = this.IMAGES[this.resolveIndexImage()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES array based on the current percentage.
     * @returns {number} - The index of the image.
     */
    resolveIndexImage() {
        if (this.percentageBottles == 100) {
            return 5;
        } else if (this.percentageBottles >= 80) {
            return 4;
        } else if (this.percentageBottles >= 60) {
            return 3;
        } else if (this.percentageBottles >= 40) {
            return 2;
        } else if (this.percentageBottles >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Increases the percentage of collected bottles and updates the status bar image.
     */
    collectBottle() {
        this.percentageBottles += 10; 
        if (this.percentageBottles > 100) {
            this.percentageBottles = 100;
        }
        this.setPercentageBottles();
    }

}