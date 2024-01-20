let canvas;
let world;
let isFullScreenBlocked = false;
let isFullscreen = false;
let startButton;
let restartButton;
let controlInfo;

/**
 * Initializes the game by setting up the canvas and keyboard controls.
 */
function init() {
    canvas = document.getElementById('canvas');
    let keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    startButton = document.getElementById('start-button');
    restartButton = document.getElementById('restart-button');
    controlInfo = document.getElementById('control-info');
}

/**
 * Toggles the game between fullscreen and windowed modes.
 */
function toggleFullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (isFullscreen) {
        exitFullscreen();
    } else {
        enterFullscreen(fullscreen);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = '0';
        if (window.innerHeight >= 500) {
            startButton.style.left = '45%';
            restartButton.style.left = '58%';
            controlInfo.style.left = '43%';
        }
    }
}

/**
 * Enters fullscreen mode for a specified element.
 * @param {HTMLElement} element - The HTML element to display in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    isFullscreen = true;
}

/**
 * Event listener for the 'fullscreenchange' event.
 *
 * @param {Event} event - The event object.
 */
document.addEventListener('fullscreenchange', (event) => {
    if (!isFullScreenBlocked) {
        isFullScreenBlocked = true;
    } else {
        isFullScreenBlocked = false;
        exitFullscreen();
    }
});

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if ((document.fullscreenElement || document.webkitFullscreenElement) && (document.exitFullscreen || document.webkitExitFullscreen)) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    isFullscreen = false;
    if (window.innerHeight >= 500) {
        canvas.style.borderRadius = '20px';
        restartButton.style.left = '44%';
        startButton.style.left = '35%';
        controlInfo.style.left = '30%';
    }
}

/**
 * Toggles the visibility of the control information.
 */
function toggleInfo() {
    let controlInfo = document.getElementById("control-info");

    if (controlInfo.style.display === "none" || controlInfo.style.display === "") {
        controlInfo.style.display = "block";
    } else {
        controlInfo.style.display = "none";
    }
}

/**
 * Handles the 'DOMContentLoaded' event to prevent context menu on images.
 */
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        img.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    });
});

/**
 * Changes the info view to the first page.
 */
function changeToFirstPage() {
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');
    secondPage.innerHTML = '';
    firstPage.classList.remove('d-none');
}

/**
 * Changes the info view to the second page.
 */
function changeToSecondPage() {
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');
    firstPage.classList.add('d-none');
    secondPage.innerHTML = /*html*/ `<p class="second-headline">Instructions</p><div class="story-text">Pepe can jump on the head of normal
        chickens to kill them. The mutated chicks are more dangerous and can only be defeated with the salsa bottles. Salsa bottles can be 
        bought with 2 coins. The final boss can be defeated with several hits of the salsa bottles.</div><div class="back-box">
        <img src="./img/5_background/mobile-controls/back.png" alt="next-page-image"class="next-page-image" onclick="changeToFirstPage()">
        <div class="next-text">Back</div></div><div class="next-box"><div class="next-text">Next</div>
        <img src="./img/5_background/mobile-controls/next-page.png" alt="next-page-image" class="next-page-image" onclick="changeToThirdPage()"></div>`;
}

/**
 * Changes the info view to the third page.
 */
function changeToThirdPage() {
    let secondPage = document.getElementById('second-page');
    secondPage.innerHTML = /*html*/ `<p class="second-headline">Chronicles of the Poultry Uprising</p><div class="story-text">
        The peaceful coexistence of people and chickens was disrupted when a mysterious mutation penetrated the local poultry population 
        and made them rebellious and impressive opponents. Led by a colossal, mutated rooster, the rebellious poultry devastated the area.
        Pepe is humanity's last hope...<br>
        <div class="back-box"><img src="./img/5_background/mobile-controls/back.png" 
        alt="next-page-image"class="next-page-image" onclick="changeToSecondPage()"><div class="next-text">Back</div></div>`;
}
