/**
 * Class for drawable objects.
 * @class
 */
class DrawableObject {


  x = 120;
  y = 300;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads an image from a given path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads images from an array of paths and stores them in the image cache.
   * @param {string[]} array - An array of image paths to be loaded.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}