/**
 * @class
 * Represents a movable object in the game.
 * This class extends the functionality of a drawable object and adds
 * features related to movement, collision detection, and animation.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
   * Applies gravity to the object, causing it to fall.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY >= 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 130;
    }
  }

  /**
   * Checks if the object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object for collision detection.
   * @returns {boolean} True if a collision is detected, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the energy of the object when it is hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
      setTimeout(() => {
        this.world.currentScreen = "end";
      }, 200);
    } else {
      this.lastHit = new Date().getTime();
    } 
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy level is zero).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation by updating the object's image.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting the vertical speed.
   */
  jump() {
    this.speedY = 25;
  }
}
