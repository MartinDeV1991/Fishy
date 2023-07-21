
function squareCollision(player, enemy) {
    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    )
}

function checkPixelOverlap(player, enemy) {
    if (squareCollision(player, enemy)) {

        canvas1.width = player.width;
        canvas1.height = player.height;

        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx1.drawImage(player.image, player.spriteWidth * player.frame, 0, player.spriteWidth, player.spriteHeight, 0, 0, player.width, player.height);
        ctx1.globalCompositeOperation = 'source-in';
        ctx1.drawImage(enemy.image, enemy.frame * enemy.spriteWidth, 0, enemy.spriteWidth, enemy.spriteHeight, enemy.x - player.x, enemy.y - player.y, enemy.width, enemy.height);
        const imageData = ctx1.getImageData(0, 0, player.width, player.height);

        // Check if any non-transparent pixel exists in the overlapping area
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] !== 0) {
                return true;
            }
        }
    }
    return false;
}

function handleCollisions() {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].height > player1.height && checkPixelOverlap(player1, enemies[i])) gameOver = true
        else if (enemies[i].height < player1.height && checkPixelOverlap(player1, enemies[i])) {
            enemies[i].markedForDeletion = true
            score += 1
            if (!player1.maxSize) {
                if (player1.width < 300) {
                    player1.width += 50 / (player1.width - enemies[i].height)
                } else {
                    player1.maxSize = true
                    score += 100
                    player1.width = 300
                }
                player1.height = player1.width * 194 / 271
            }
        }
    }
}