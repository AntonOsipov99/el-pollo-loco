/**
 * Represents a level in the game.
 *
 * @class
 * This class defines the structure of a game level, including enemies,clouds, background objects, and collectible objects.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;
    level_end_x = 3600;

    /**
     * Creates a new instance of the Level class.
     *
     * @constructor
     * @param {Array} enemies - An array of enemies in the level.
     * @param {Array} clouds - An array of clouds in the level.
     * @param {Array} backgroundObjects - An array of background objects in the level.
     * @param {Array} collectableObjects - An array of collectible objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }

}

