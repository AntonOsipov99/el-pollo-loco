/**
 * Class managing keyboard inputs in the game.
 * @class
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    DOWN = false;
    SPACE = false;
    D = false;
    F = false;
    ESC = false;

    /**
     * Constructor for the Keyboard class.
     * Initializes keyboard events and binds touch events to buttons.
     * @constructor
     */
    constructor() {
        this.keysPressTrue();
        this.keysPressFalse();
        this.bindBtsPressEvents();
    }

    /**
     * Event listener for key presses.
     * Sets the corresponding keyboard status to 'true'.
     */
    keysPressTrue() {
        window.addEventListener('keydown', (e) => {
            if (!world.gamePaused) {
                const keyMap = {
                    37: 'LEFT',
                    39: 'RIGHT',
                    40: 'DOWN',
                    32: 'SPACE',
                    68: 'D',
                    70: 'F',
                    27: 'ESC'
                };
                this[keyMap[e.keyCode]] = true;
            }
        });
    }

    /**
     * Event listener for key releases.
     * Sets the corresponding keyboard status to 'false'.
     */
    keysPressFalse() {
        window.addEventListener('keyup', (e) => {
            if (!world.gamePaused) {
                const keyMap = {
                    37: 'LEFT',
                    39: 'RIGHT',
                    40: 'DOWN',
                    32: 'SPACE',
                    68: 'D',
                    70: 'F',
                    27: 'ESC'
                };
                this[keyMap[e.keyCode]] = false;
            }
        });
    }

    /**
     * Binds touch events to buttons.
     */
    bindBtsPressEvents() {
        document.getElementById('jump-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.SPACE = true; });
        document.getElementById('throw-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.D = true; });
        document.getElementById('right-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.RIGHT = true; });
        document.getElementById('left-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.LEFT = true; });
        document.getElementById('buy-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.F = true; });
        document.getElementById('jump-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.SPACE = false; });
        document.getElementById('throw-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.D = false; });
        document.getElementById('right-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.RIGHT = false; });
        document.getElementById('left-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.LEFT = false; });
        document.getElementById('buy-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.F = false; });

    }
}

