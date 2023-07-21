const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvas1 = document.createElement('canvas');
const ctx1 = canvas1.getContext('2d', { willReadFrequently: true });

const background = new Image();
background.src = './img/background1.jpg'

const speed = 5;
const threshold = 5
let distanceX;
let distanceY;
let velocityX;
let velocityY;
let angle;
let timeToNextEnemy = 0
const enemyInterval = 500
let lastTime = 0
let enemies = [];
let gameOver = false
let score = 0

let player1 = new Player()

let mouse = {
    x: 500,
    y: 500,
    width: 1,
    height: 1,
    clicked: false
}

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
        ctx.font = '72px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Game paused', 505, 505);
        ctx.fillStyle = 'white';
        ctx.fillText('Game paused', 500, 500);
        ctx.font = '36px Arial';
        ctx.fillText('PRESS SPACE TO CONTINUE', 500, 550);
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
