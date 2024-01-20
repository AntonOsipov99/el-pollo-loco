/**
 * Represents the status bar for tracking the percentage of health.
 * @class
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

        percentage = 100;

        /**
         * Constructs a new StatusBarHealth with default attributes and loads initial images.
         * @constructor
         */
        constructor() {
            super();
            this.loadImages(this.IMAGES);
            this.x = 40;
            this.y = 0;
            this.width = 200;
            this.height = 60;
            this.setPercentage(100);
        }

        /**
         * Sets the image of the status bar based on the given percentage of health.
         * @param {number} percentage - The percentage of health.
         */
        setPercentage(percentage) {
            this.percentage = percentage;
            let path = this.IMAGES[this.resolveIndexImage()];
            this.img = this.imageCache[path];
        }

        /**
         * Resolves the index of the image in the IMAGES array based on the current percentage.
         * @returns {number} - The index of the image.
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
}