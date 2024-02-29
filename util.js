let pause = false;
const backgroundButton1 = {
    xOriginal: 300,
    yOriginal: 10,
    widthOriginal: 100,
    heightOriginal: 50,
}
const backgroundButton2 = {
    xOriginal: 410,
    yOriginal: 10,
    widthOriginal: 100,
    heightOriginal: 50,
}
const backgroundButton3 = {
    xOriginal: 520,
    yOriginal: 10,
    widthOriginal: 100,
    heightOriginal: 50,
}
const restartButton = {
    xOriginal: 720,
    yOriginal: 10,
    widthOriginal: 100,
    heightOriginal: 50,
}

const buttons = [backgroundButton1, backgroundButton2, backgroundButton3, restartButton]

function resizeButtons() {
    buttons.forEach((button => {
        button.x = button.xOriginal * ratio;
        button.y = button.yOriginal * ratio;
        button.width = button.widthOriginal * ratio;
        button.height = button.heightOriginal * ratio;
    }))
}

function handleGameStatus() {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255,255,255,0.8';
    ctx.strokeStyle = 'black';
    ctx.fillRect(backgroundButton1.x, backgroundButton1.y, backgroundButton1.width, backgroundButton1.height);
    ctx.strokeRect(backgroundButton1.x, backgroundButton1.y, backgroundButton1.width, backgroundButton1.height);
    ctx.fillRect(backgroundButton2.x, backgroundButton2.y, backgroundButton2.width, backgroundButton2.height);
    ctx.strokeRect(backgroundButton2.x, backgroundButton2.y, backgroundButton2.width, backgroundButton2.height);
    ctx.fillRect(backgroundButton3.x, backgroundButton3.y, backgroundButton3.width, backgroundButton3.height);
    ctx.strokeRect(backgroundButton3.x, backgroundButton3.y, backgroundButton3.width, backgroundButton3.height);
    ctx.fillRect(restartButton.x, restartButton.y, restartButton.width, restartButton.height);
    ctx.strokeRect(restartButton.x, restartButton.y, restartButton.width, restartButton.height);

    ctx.fillStyle = 'rgba(4,41,117,1';
    ctx.font = miniFont + 'px Arial';
    ctx.fillText('background1', backgroundButton1.x + 8 * ratio, backgroundButton1.y + 33 * ratio);
    ctx.fillText('background2', backgroundButton2.x + 8 * ratio, backgroundButton2.y + 33 * ratio);
    ctx.fillText('background3', backgroundButton3.x + 8 * ratio, backgroundButton3.y + 33 * ratio);
    ctx.fillText('restart', restartButton.x + 30 * ratio, restartButton.y + 30 * ratio);

    if (squareCollision(mouse, backgroundButton1) && mouse.clicked) {
        background.src = './img/background1.jpg';
    }
    if (squareCollision(mouse, backgroundButton2) && mouse.clicked) {
        background.src = './img/background2.jpg';
    }
    if (squareCollision(mouse, backgroundButton3) && mouse.clicked) {
        background.src = './img/background3.jpg';
    }
    if (squareCollision(mouse, restartButton) && mouse.clicked) {
        restart();
    }
}

function restart() {
    gameOver = false;
    pause = true;
    timeToNextEnemy = 0;
    score = 0;
    enemies = [];
    lastTime = 0;
    player1 = new Player();
}

function drawScore() {
    ctx.font = mediumFont + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50 * ratio, 75 * ratio);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55 * ratio, 80 * ratio);
}

function drawGameOver() {
    ctx.font = mediumFont + 'px Arial';
    ctx.fillStyle = 'black'
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 4, canvas.height / 2)
    ctx.fillStyle = 'white'
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 4 + 5, canvas.height / 2 + 5)
}