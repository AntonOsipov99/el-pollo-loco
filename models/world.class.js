/**
 * The World class manages the game and its components.
 * @class
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarBoss = new StatusbarBoss();
    endboss = level1.enemies.find(e => e instanceof Endboss);
    chickens = level1.enemies.filter(e => e instanceof Chicken);
    chicks = level1.enemies.filter(e => e instanceof Chicks);
    coin = new Coin();
    bottle = new Bottle();
    throwableObjects = [];
    titleScreen;
    gamePaused = true;
    currentScreen = "title";
    menuShown = false;
    startButton = document.getElementById('start-button');
    menuButton = document.getElementById('menu');
    restartButton = document.getElementById('restart-button');
    fullScreenLogo = document.getElementById('full-size-logo');
    mobileControls = document.getElementById('mobile-controls');
    collect_coin = new Audio('audios/collect-coin.mp3');
    game_sound = new Audio('audios/game-sound.mp3');
    death_chicken = new Audio('audios/death-chicken.mp3');
    death_chicks = new Audio('audios/death-chicks.mp3');
    game_over = new Audio('audios/game-over.mp3');
    hurt = new Audio('audios/hurt2.mp3');
    boss_hurt = new Audio('audios/boss.mp3');
    intro_sound = new Audio('audios/intro-sound.mp3');
    throw_sound = new Audio('audios/throw-sound.mp3');
    boss_fight = new Audio('audios/bossfight.mp3');
    collect_bottle = new Audio('audios/collect-bottle.mp3');
    soundIcon = document.getElementById('sound-icon');
    game_win = new Audio('audios/win_sound.mp3');
    mute = true;
    win = false;
    throwBottle = [];
    lastThrowTime = 0;
    bottleStock = 0;
    throwInterval = 1000;
    /**
     * Constructor for the World class.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Keyboard} keyboard - The keyboard control for the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initialCharacterX = this.character.x;
        this.initialEndbossX = this.endboss.x;
        this.setWorld();
        this.titleScreen = new TitleScreen(this.canvas, this.startGame.bind(this)); // Übergebe das Canvas-Element an die TitleScreen
        this.endImage = new Image();
        this.endImage.src = 'img/9_intro_outro_screens/game_over/game over.png';
        this.startButton.addEventListener('click', () => this.startGame());
        this.menuButton.addEventListener('click', () => { this.menuShown = true; this.showMenu(); });
        this.restartButton.addEventListener('click', () => { this.menuShown = false; this.restartGame(); });
        this.soundIcon.addEventListener('click', () => this.toggleSoundIcon());
        this.makeSoundLoop();
    }

    /**
     * Starts the game after clicking the "Start Game" button.
     */
    startGame() {
        this.character.fallsAsleep = 0;
        this.character.otherDirection = false;
        setTimeout(() => {
            this.startButton.classList.remove('d-flex');
            this.startButton.classList.add('d-none');
            this.gamePaused = false;
            this.mute = false;
            this.startMusic();
            this.draw();
            this.setWorld();
            this.addObjects();
            this.run();
            this.runAnimate();
        }, 200);
    }

    /**
     * Adds various game objects to the level, including coins, clouds, bottles, chicken, and chicks.
     */
    addObjects() {
        this.addCoins();
        this.addClouds();
        this.addBottles();
        this.addChicken();
        this.addChicks();
    }

    /**
     * Handles the game restart process when the restart button is clicked.
     * It clears all intervals, resets character properties, and reloads enemies for a new game session.
     */
    restartGame() {
        this.clearAllIntervals();
        this.character.animate();
        this.character.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.endboss.animate();
        this.character.applyGravity();
        this.resetStatusbar();
        this.resetGameProperties();
        this.level.collectableObjects = [];
        this.changeButtonsOnRestartGame();
        this.startGame();
    }

    /**
     * Resets various game properties to their initial values, preparing for a new game.
     */
    resetGameProperties() {
        this.resetEnemies();
        this.currentScreen = 'title';
        this.character.energy = 100;
        this.statusBarBoss.percentage = 100;
        this.statusBarBoss.isVisible = false;
        this.character.x = this.initialCharacterX;
        this.endboss.x = this.initialEndbossX;
        this.endboss.bossWalking = false;
        this.bottleStock = 0;
        this.statusBarBottles.percentageBottles = 0;
        this.statusBarCoins.percentageCoins = 0;
        this.resetKeys();
        this.win = false;
    }

    /**
     * Resets the enemies in the game by removing specific enemy types from the level's enemies and clouds arrays.
     */
    resetEnemies() {
        this.level.enemies = this.level.enemies.filter(e => !(e instanceof Chicken));
        this.level.enemies = this.level.enemies.filter(e => !(e instanceof Chicks));
        this.level.clouds = this.level.enemies.filter(e => !(e instanceof Cloud));
        this.level.clouds = this.level.enemies.filter(e => !(e instanceof Endboss));
    }

    /**
     * Adjusts button visibility and controls when restarting the game.
     * Removes the "Restart" and "Menu" buttons, and shows mobile controls.
     */
    changeButtonsOnRestartGame() {
        this.restartButton.classList.remove('d-flex');
        this.menuButton.classList.remove('d-flex');
        this.mobileControls.classList.remove('d-none');
    }

    /**
     * Switches the game to the title screen, pausing the game and resetting its state.
     * It creates a new TitleScreen instance with the provided canvas, clears all intervals,
     * pauses character animations, applies gravity, changes button visibility to the title screen state,
     * resets character energy and position, and reloads enemies.
     */
    showMenu() {
        this.titleScreen = new TitleScreen(this.canvas, this.startGame.bind(this));
        this.clearAllIntervals();
        this.character.animate();
        this.character.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.endboss.animate();
        this.character.applyGravity();
        this.resetStatusbar();
        this.level.collectableObjects = [];
        this.resetGameProperties();
        this.changeButtonsTitle();
        this.intro_sound.currentTime = 0;
        this.startMusicMenu();
    }

    /**
     * Starts the menu music.
     * Plays the intro sound if the game is not muted.
     * Additionally, plays the intro sound if the volume icon is active.
     */
    startMusicMenu() {
        if (!this.mute)
            this.intro_sound.play();
        if (this.iconVolume())
            this.intro_sound.play();
    }

    /**
     * Resets the status bars in the game to their initial states by loading specific images for each status bar.
     */
    resetStatusbar() {
        this.statusBarHealth.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.statusBarCoins.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.statusBarBottles.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.statusBarBoss.loadImage('img/7_statusbars/2_statusbar_endboss/100.png');
    }

    /**
     * Adjusts button visibility and controls when switching to the title screen.
     * Displays the "Start Game" button, hides the "Menu" and "Restart" buttons, and shows mobile controls.
     */
    changeButtonsTitle() {
        this.startButton.classList.add('d-flex');
        this.menuButton.classList.remove('d-flex');
        this.restartButton.classList.remove('d-flex');
        this.mobileControls.classList.remove('d-none');
    }

    /**
     * Sets the world property for the character to this instance of World.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop. Checks whether the game is paused and sets up an interval for collision checks and object throwing.
     */
    run() {
        if (this.gamePaused)
            return;
        this.collisionTimer = setInterval(() => this.checkCollision(), 50);
        this.collisionTimerHit = setInterval(() => {
            this.checkCollisionsEnemies();
            if (this.endbossComing()) {
                this.endbossComes();
                if (!this.mute) {
                    this.game_sound.pause();
                    this.boss_fight.play();
                }
            }
        }, 200);
        this.throwObjectsTimer = setInterval(() => this.checkBottles(), 100);
    }

    /**
     * Checks various collisions.
     */
    checkCollision() {
        this.checkJumpOnChicken();
        this.checkThrowObjects();
        this.checkCollection();
    }

    /**
     * Checks collisions with enemies.
     */
    checkCollisionsEnemies() {
        this.checkCollisionsChickens();
        this.checkCollisionChicks();
        this.checkCollisionBoss();
    }

    /**
     * Checks collisions related to bottles.
     */
    checkBottles() {
        this.checkCollisionBottle();
        this.checkBuyBottle();
    }

    /**
     * Determines if the endboss is approaching.
     * @returns {boolean} - True if the endboss is approaching, false otherwise.
     */
    endbossComing() {
        return !this.gamePaused && -3100 > this.camera_x;
    }

    /**
     * Initiates the appearance of the endboss.
     * @function
     */
    endbossComes() {
        world.statusBarBoss.isVisible = true;
        this.endboss.bossWalking = true;
    }

    /**
    * Runs animations for clouds in the level.
    */
    runAnimate() {
        this.level.clouds.forEach((cloud) => {
            cloud.animate();
        });
    }

    /**
     * Checks collisions between the character and chickens, handles damage and updates the health bar accordingly.
     */
    checkCollisionsChickens() {
        this.level.enemies.forEach((enemy) => {
            if (this.collidingChicken(enemy)) {
                if (!this.gamePaused) {
                    if (!this.mute)
                        this.hurt.play();
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks if the character is colliding with a chicken.
     * @param {Object} enemy - The enemy object to check for collision.
     * @returns {boolean} - True if the character is colliding with a chicken, false otherwise.
     */
    collidingChicken(enemy) {
        return this.character.isColliding(enemy) && enemy instanceof Chicken && !this.character.isAboveGround();
    }

    /**
     * Checks collisions between the character and chicks, handles damage, and updates the health bar accordingly.
     */
    checkCollisionChicks() {
        this.level.enemies.forEach(enemy => {
            if (this.collidingChicks(enemy)) {
                if (!this.gamePaused) {
                    if (!this.mute)
                        this.hurt.play();
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks if the character is colliding with chicks.
     * @param {Object} enemy - The enemy object to check for collision.
     * @returns {boolean} - True if the character is colliding with chicks, false otherwise.
     */
    collidingChicks(enemy) {
        return this.character.isColliding(enemy) && enemy instanceof Chicks;
    }

    /**
     * Checks collisions between the character and the endboss, handles damage, and updates the health bar accordingly.
     */
    checkCollisionBoss() {
        if (this.character.isColliding(this.endboss)) {
            if (!this.gamePaused) {
                if (!this.mute) {
                    this.hurt.play();
                }
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        }
    }

    /**
     * Checks if the character jumps on a chicken, removes the chicken, and triggers a jump.
     */
    checkJumpOnChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.jumpOnChicken(enemy)) {
                this.removeEnemy(enemy, index);
                this.character.jump();
            }
        });
    }

    /**
     * Checks if the character jumps on a chicken.
     * @param {Object} enemy - The enemy object to check for jump collision.
     * @returns {boolean} - True if the character jumps on the chicken, false otherwise.
     */
    jumpOnChicken(enemy) {
        return (enemy.constructor === Chicken) &&
            this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.speedY < 0
    }

    /**
     * Checks collisions between throwable bottles and enemies, handles bottle hits, and updates the game state accordingly.
     */
    checkCollisionBottle() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.bottleCollidingChicken(bottle, enemy)) {
                    this.bottleHitsChicken(bottle, enemy, enemyIndex, bottleIndex);
                } else if (this.bottleCollidingEndboss(bottle, enemy)) {
                    this.bottleHitsEndboss(bottle, bottleIndex);
                }
            });
        });
    }

    /**
     * Checks if a throwable bottle collides with a chicken.
     * @param {Object} bottle - The throwable bottle object.
     * @param {Object} enemy - The enemy object to check for collision.
     * @returns {boolean} - True if the bottle collides with the chicken, false otherwise.
     */
    bottleCollidingChicken(bottle, enemy) {
        return !bottle.break && bottle.isColliding(enemy) && (enemy.constructor === Chicken || enemy.constructor === Chicks);
    }

    /**
     * Handles bottle hits on chickens, breaks the bottle, removes the chicken, and updates the game state.
     * @param {Object} bottle - The throwable bottle object.
     * @param {Object} enemy - The chicken object to be hit.
     * @param {number} enemyIndex - The index of the enemy in the enemies array.
     * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
     */
    bottleHitsChicken(bottle, enemy, enemyIndex, bottleIndex) {
        bottle.break = true;
        this.removeEnemy(enemy, enemyIndex);
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 500);
    }

    /**
     * Checks if a throwable bottle collides with the endboss.
     * @param {Object} bottle - The throwable bottle object.
     * @param {Object} enemy - The endboss object to check for collision.
     * @returns {boolean} - True if the bottle collides with the endboss, false otherwise.
     */
    bottleCollidingEndboss(bottle, enemy) {
        return !bottle.break && bottle.isColliding(enemy) && enemy.constructor === Endboss;
    }

    /**
     * Handles bottle hits on the endboss, breaks the bottle, triggers the boss hurt animation, and updates the game state.
     * @param {Object} bottle - The throwable bottle object.
     * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
     */
    bottleHitsEndboss(bottle, bottleIndex) {
        bottle.break = true;
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 500);
        this.endboss.bossHurt = true;
        if (!this.mute) {
            this.boss_hurt.play();
        }
        this.statusBarBoss.hit();
        if (this.statusBarBoss.percentage === 0) {
            this.endboss.animateDeath();
        }
    }

    /**
     * Checks for collisions between the character and collectable objects, such as coins and bottles, and triggers corresponding actions.
     */
    checkCollection() {
        this.level.collectableObjects.forEach((collectableObject, index) => {
            if (this.character.isColliding(collectableObject)) {
                if (this.collectingCoin(collectableObject)) {
                    this.collectCoin(index);
                } else if (this.collectingBottle(collectableObject)) {
                    this.collectBottle(index);
                }
            }
        });
    }

    /**
     * Checks if the collectable object is a coin.
     * @param {Object} collectableObject - The collectable object to check.
     * @returns {boolean} - True if the collectable object is a coin, false otherwise.
     */
    collectingCoin(collectableObject) {
        return collectableObject instanceof Coin;
    }

    /**
     * Handles the collection of coins, plays the corresponding sound, removes the coin, and updates the coin status bar.
     * @param {number} index - The index of the collected coin in the collectableObjects array.
     */
    collectCoin(index) {
        if (!this.mute)
            this.collect_coin.play();
        this.removeCoin(index);
        this.statusBarCoins.collectCoin();
    }

    /**
     * Checks if the collectable object is a bottle.
     * @param {Object} collectableObject - The collectable object to check.
     * @returns {boolean} - True if the collectable object is a bottle, false otherwise.
     */
    collectingBottle(collectableObject) {
        return collectableObject instanceof Bottle;
    }

    /**
     * Handles the collection of bottles, plays the corresponding sound, removes the bottle, increments the bottle stock,
     * and updates the bottle status bar.
     * @param {number} index - The index of the collected bottle in the collectableObjects array.
     */
    collectBottle(index) {
        if (!this.mute)
            this.collect_bottle.play();
        this.bottleStock++;
        this.removeBottle(index);
        this.statusBarBottles.collectBottle();
    }

    /**
     * Checks for the possibility of buying a bottle with coins and updates the game state accordingly.
     */
    checkBuyBottle() {
        if (this.buyBottle()) {
            this.bottleStock++;
            this.statusBarBottles.percentageBottles += 10;
            this.statusBarBottles.setPercentageBottles();
            this.statusBarCoins.percentageCoins -= 20;
            this.statusBarCoins.setPercentageCoins();
        }
    }

    /**
     * Checks if the conditions for buying a bottle are met.
     * @returns {boolean} - True if the 'F' key is pressed, there are enough coins, and the bottle status is not at its maximum,
     * false otherwise.
     */
    buyBottle() {
        return this.keyboard.F && this.statusBarCoins.percentageCoins > 10 && this.statusBarBottles.percentageBottles < 100;
    }

    /**
     * Adds chicken enemies to the level and starts their walking animation.
     */
    addChicken() {
        for (let i = 0; i < 15; i++) {
            let chicken = new Chicken();
            chicken.x = 300 + i * 300;
            level1.enemies.push(chicken);
        }
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken) {
                enemy.startWalkingAnimation();
            }
        });
    }

    /**
     * Adds chicks enemies to the level and starts their walking animation.
     */
    addChicks() {
        for (let i = 0; i < 15; i++) {
            let chicks = new Chicks();
            chicks.x = 500 + i * 300;
            level1.enemies.push(chicks);
        }
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicks) {
                enemy.startWalkingAnimation();
            }
        });
    }

    /**
     * Adds clouds to the level.
     */
    addClouds() {
        for (let i = 0; i < 10; i++) {
            let cloud = new Cloud();
            cloud.x = 10 + i * 500;
            level1.clouds.push(cloud);
        }
    }

    /**
     * Removes an enemy from the level, plays the corresponding death sound, and triggers a death animation for the enemy.
     * @param {Object} enemy - The enemy object to be removed.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    removeEnemy(enemy, index) {
        if (enemy.constructor === Chicken) {
            if (!this.mute)
                this.death_chicken.play();
            enemy.img = new Image();
            enemy.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        } else if (enemy.constructor === Chicks) {
            if (!this.mute)
                this.death_chicks.play();
            enemy.img = new Image();
            enemy.img.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        }
        setTimeout(() => this.level.enemies.splice(index, 1), 40);
    }

    /**
     * Removes a coin from the collectable objects array.
     * @param {number} index - The index of the coin in the collectable objects array.
     */
    removeCoin(index) {
        this.level.collectableObjects.splice(index, 1);
    }

    /**
     * Removes a bottle from the collectable objects array.
     * @param {number} index - The index of the bottle in the collectable objects array.
     */
    removeBottle(index) {
        this.level.collectableObjects.splice(index, 1);
    }

    /**
    * Checks for the 'D' key press to throw bottles in the game.
    */
    checkThrowObjects() {
        if (this.throwingBottle()) {
            this.character.fallsAsleep = 0;
            const currentTime = Date.now();
            if (currentTime - this.lastThrowTime >= this.throwInterval) {
                if (this.bottleStock > 0) {
                    this.throwTheBottle(currentTime);
                }
            }
        }
    }

    /**
     * Checks if the 'D' key is pressed.
     * @returns {boolean} - True if the 'D' key is pressed, false otherwise.
     */
    throwingBottle() {
        return this.keyboard.D;
    }

    /**
     * Throws a bottle in the game, plays the throw sound, adds the thrown bottle to the throwable objects array,
     * and updates the game state.
     * @param {number} currentTime - The current time to calculate the throwing interval.
     */
    throwTheBottle(currentTime) {
        if (!this.mute)
            this.throw_sound.play();
        this.throwBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(this.throwBottle);
        this.lastThrowTime = currentTime;
        this.bottleStock--;
        this.statusBarBottles.percentageBottles -= 10;
        this.statusBarBottles.setPercentageBottles();
    }

    /**
    * Renders the game by clearing the canvas, translating the context, adding objects to the map, and drawing the frame.
    */
    draw() {
        if (this.gamePaused) {
            return;
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);

            if (this.currentScreen === "title") {
                this.drawGame();
            } else if (this.currentScreen === "end") {
                this.renderEndScreen();
            }
        }
    }

    /**
     * Manages the rendering and animation of the game while in the main gameplay state.
     * It displays the title screen, adds game objects to the map, and updates the animation.
     */
    drawGame() {
        this.titleScreen.render();
        this.addLevelObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusbarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.runAnimate();
        let self = this;
        requestAnimationFrame(() => self.draw());
    }

    /**
     * Adds the game status bars (health, coins, bottles, and boss) to the game map.
     */
    addStatusbarsToMap() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarBoss);
    }

    /**
     * Adds coins to the game map.
     */
    addCoins() {
        for (let i = 0; i < 10; i++) {
            const coin = new Coin();
            coin.x = 300 + i * 350;
            if (i % 2 === 1) {
                coin.y = 50;
            }
            level1.collectableObjects.push(coin);
            this.addToMap(coin);
        }
    }

    /**
     * Adds bottles to the game map.
     */
    addBottles() {
        for (let i = 0; i < 10; i++) {
            const bottle = new Bottle();
            bottle.x = 500 + i * 350;
            level1.collectableObjects.push(bottle);
            this.addToMap(bottle);
        }
    }

    /**
     * Adds multiple types of game objects to the canvas for rendering.
     * This method combines the addition of background objects, clouds, enemies, and throwable objects to the canvas.
     */
    addLevelObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableObjects);
    }

    /**
    * Adds a list of objects to the map for rendering.
    *
    * @param {Array} objects - An array of objects to be added to the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Configures the specified audio elements to loop continuously when played.
     */
    makeSoundLoop() {
        this.intro_sound.loop = true;
        this.game_sound.loop = true;
        this.boss_fight.loop = true;
    }

    /**
    * Adds a movable object to the map and flips it if it's facing the opposite direction.
    *
    * @param {MovableObject} mo - The movable object to be added to the map.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally and adjusts the position of the object.
    *
    * @param {MovableObject} mo - The movable object to flip.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the flipped image to its original state.
    *
    * @param {MovableObject} mo - The movable object to restore.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Pauses the playback of various game sounds.
     */
    pauseSound() {
        this.game_sound.pause();
        this.hurt.pause();
        this.death_chicken.pause();
        this.death_chicks.pause();
        this.character.jump_sound.pause();
        this.boss_hurt.pause();
        this.collect_bottle.pause();
        this.collect_coin.pause();
        this.boss_fight.pause();
    }

    /**
     * Renders the end screen with game over message and buttons.
     * Clears the canvas, hides the "Start Game" button, shows the "Menu" and "Restart" buttons,
     * and displays the game over image with appropriate positioning.
     */
    renderEndScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.changeButtonsEndscreen();
        this.gamePaused = true;
        this.game_sound.currentTime = 0;
        this.boss_fight.currentTime = 0;
        this.pauseSound();
        if (!this.mute)
            this.checkGameStatusMusic();
        setTimeout(() => this.mute = true, 1000);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        const endImageX = (this.canvas.width - this.endImage.width * 0.5) / 2;
        const endImageY = (this.canvas.height - this.endImage.height * 0.5) / 2;
        this.ctx.drawImage(this.endImage, endImageX, endImageY, this.endImage.width * 0.5, this.endImage.height * 0.5);
    }

    /**
     * Changes the visibility of buttons on the end screen.
     * Hides the start button, shows the restart and menu buttons, and hides the mobile controls.
     */
    changeButtonsEndscreen() {
        this.startButton.classList.add('d-none');
        this.restartButton.classList.add('d-flex');
        this.menuButton.classList.add('d-flex');
        this.mobileControls.classList.add('d-none');
    }

    /**
     * Checks the game status and plays the corresponding music.
     * If the game is not won, plays the game over sound; otherwise, plays the game win sound.
     */
    checkGameStatusMusic() {
        if (!this.win) {
            this.game_over.play();
        } else {
            this.game_win.play();
        }
    }

    /**
     * Toggles the sound icon based on the mute state.
     * If muted, changes the icon to the mute icon and pauses the music; otherwise, changes the icon to the volume icon and plays the music.
     */
    toggleSoundIcon() {
        if (this.iconMute()) {
            this.mute = false;
            this.changeIconAndPlayMusic();
        } else {
            this.changeIconAndPauseMusic();
        }
    }

    /**
     * Changes the sound icon to the volume icon and plays the corresponding music.
     * If the game is paused, plays the intro sound; otherwise, plays the game sound.
     */
    changeIconAndPlayMusic() {
        if (this.gamePaused) {

            this.intro_sound.play();
        } else {
            this.game_sound.play();
        }
        this.soundIcon.src = 'img/9_intro_outro_screens/start/volume.png';
    }

    /**
     * Changes the sound icon to the mute icon and pauses the corresponding music.
     * If the game is paused, pauses the intro sound; otherwise, pauses the game sound.
     */
    changeIconAndPauseMusic() {
        this.mute = true;
        if (this.gamePaused) {
            this.intro_sound.pause();
        } else {
            this.game_sound.pause();
        }
        this.soundIcon.src = 'img/9_intro_outro_screens/start/mute.png';
    }

    /**
     * Checks if the sound icon is currently set to the mute icon.
     * @returns {boolean} - True if the sound is muted, false otherwise.
     */
    iconMute() {
        return this.soundIcon.src.includes('mute.png');
    }

    /**
     * Checks if the sound icon is currently set to the volume icon.
     * @returns {boolean} - True if the sound is not muted, false otherwise.
     */
    iconVolume() {
        return this.soundIcon.src.includes('volume.png');
    }

    /**
     * Starts playing the game sound if not muted and sets the sound icon to the volume icon.
     */
    startMusic() {
        if (!this.mute) {
            this.game_sound.play();
            this.intro_sound.pause();
            this.soundIcon.src = 'img/9_intro_outro_screens/start/volume.png';
        }
    }

    /**
     * Clears all JavaScript intervals currently running, ensuring a clean slate for new intervals.
     * This method stops all intervals from running in the window, helping to manage and prevent conflicts.
     */
    clearAllIntervals() {
        for (let i = 1; i < 999999; i++) window.clearInterval(i);
    }

    /**
     * Resets the state of keyboard keys.
     * Sets the LEFT, RIGHT, D, F, and SPACE keys to false.
     */
    resetKeys() {
        this.keyboard.LEFT = false;
        this.keyboard.RIGHT = false;
        this.keyboard.D = false;
        this.keyboard.F = false;
        this.keyboard.SPACE = false;
    }
}