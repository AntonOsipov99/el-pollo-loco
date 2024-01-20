/**
 * Represents the title screen of the game.
 * @class
 */
class TitleScreen {

     /**
     * Constructs a new TitleScreen.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
     * @param {Function} startGameCallback - The callback function to start the game.
     */
    constructor(canvas, startGameCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        this.titleImage = new Image();
        this.titleImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
        this.titleImage.onload = () => {
            this.render();
        };
    }

    /**
     * Renders the title screen by drawing the title image on the canvas.
     */
    render() {
        this.ctx.drawImage(this.titleImage, 0, 0, this.canvas.width, this.canvas.height);
    }
}