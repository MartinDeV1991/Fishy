const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const canvas1 = document.createElement('canvas');
const ctx1 = canvas1.getContext('2d', { willReadFrequently: true });

const background = new Image();
background.src = './img/background1.jpg'

const speed = 5;
const threshold = 5
const enemyInterval = 500
let angle;
let distanceX;
let distanceY;
let velocityX;
let velocityY;
let score = 0
let lastTime = 0
let enemies = [];
let gameOver = false
let timeToNextEnemy = 0
let ratio;
let miniFont;
let smallFont;
let mediumFont;
let largeFont;

let player1 = new Player()

let mouse = {
    x: 500,
    y: 500,
    width: 1,
    height: 1,
    clicked: false
}

canvas.width = 1600;
canvas.height = 800;
const baseHeight = 1500;
const baseWidth = 1600;

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    ratio = width / baseWidth;
    enemies.forEach(enemy => {
        enemy.resize();
    });
    player1.resize();
    miniFont = Math.ceil(14 * ratio);
    smallFont = Math.ceil(36 * ratio);
    mediumFont = Math.ceil(50 * ratio);
    largeFont = Math.ceil(72 * ratio);
    resizeButtons();
}

window.addEventListener('resize', setCanvasSize);

setCanvasSize();

function animate(timestamp) {
    if (!pause && !gameOver) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        timeToNextEnemy += deltaTime
        if (timeToNextEnemy > enemyInterval) {
            enemies.push(new Enemy())
            timeToNextEnemy = 0
        }
        [...enemies].forEach(enemy => enemy.update(deltaTime));
        player1.move(deltaTime);
        handleCollisions();
        enemies = enemies.filter(object => !object.markedForDeletion)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    enemies.forEach(enemy => enemy.draw());
    player1.draw()
    drawScore();

    if (pause && !gameOver) {
        ctx.font = largeFont + 'px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Game paused', 505 * ratio, 505 * ratio);
        ctx.fillStyle = 'white';
        ctx.fillText('Game paused', 500 * ratio, 500 * ratio);
        ctx.font = smallFont + 'px Arial';
        ctx.fillText('PRESS SPACE TO CONTINUE', 500 * ratio, 550 * ratio);
    }

    handleGameStatus()
    if (gameOver) drawGameOver()
    requestAnimationFrame(animate)
}
animate(0)

function updateMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
}

function updateTouchPosition(e) {
    e.preventDefault(); // Prevent scrolling on touch events
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        mouse.x = (touch.clientX - rect.left) * scaleX;
        mouse.y = (touch.clientY - rect.top) * scaleY;
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === "Space") { // 32 is the keycode for the spacebar
        pause = !pause;
    }
});

canvas.addEventListener('mousemove', updateMousePosition);

canvas.addEventListener('mousedown', function () {
    mouse.clicked = true;
})
canvas.addEventListener('mouseup', function () {
    mouse.clicked = false;
})

canvas.addEventListener('touchstart', function () {
    mouse.clicked = true;
    pause = false;
})
canvas.addEventListener('touchmove', updateTouchPosition);

canvas.addEventListener('touchend', function () {
    mouse.clicked = false;
})
