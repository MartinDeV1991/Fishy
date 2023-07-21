let pause = false;
const backgroundButton1 = {
    x: 300,
    y: 10,
    width: 100,
    height: 50
}
const backgroundButton2 = {
    x: 410,
    y: 10,
    width: 100,
    height: 50
}
const backgroundButton3 = {
    x: 520,
    y: 10,
    width: 100,
    height: 50
}
const restartButton = {
    x: 720,
    y: 10,
    width: 100,
    height: 50
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
    ctx.font = '16px Orbitron';
    ctx.fillText('background1', backgroundButton1.x + 8, backgroundButton1.y + 33);
    ctx.fillText('background2', backgroundButton2.x + 8, backgroundButton2.y + 33);
    ctx.fillText('background3', backgroundButton3.x + 8, backgroundButton3.y + 33);
    ctx.fillText('restart', restartButton.x + 30, restartButton.y + 30);

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
    ctx.font = '50px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}

function drawGameOver() {
    ctx.font = '50px impact'
    ctx.fillStyle = 'black'
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2, canvas.height / 2)
    ctx.fillStyle = 'white'
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5)
}