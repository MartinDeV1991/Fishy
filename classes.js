
class Enemy {
    constructor() {
        this.chase = Math.random() > 0.95
        this.size = Math.random() * 5
        this.width = player1.widthOriginal * this.size
        this.height = this.width * 50 / 83
        this.direction = Math.random() > 0.5 ? true : false
        this.x = this.direction == true ? canvas.width : -this.width;
        this.y = Math.random() * (canvas.height - this.height)
        this.directionX = (Math.random() * 3 + 1) * (this.direction ? 1 : -1)
        this.directionY = Math.random() * 3 - 2.5
        this.markedForDeletion = false
        this.frame = 0
        this.maxFrame = 4
        this.timeSinceFlap = 0
        this.flapInterval = Math.random() * 50 + 50
        this.image = new Image()

        if (this.chase) {
            this.image.src = this.direction == true ? './img/PiranhaL.png' : './img/PiranhaR.png';
            this.spriteWidth = 140
            this.spriteHeight = 90
        } else {
            this.image.src = this.direction == true ? './img/TunaL.png' : './img/TunaR.png';
            this.spriteWidth = 83
            this.spriteHeight = 50
        }
    }

    update(deltaTime) {
        if (this.chase) {
            if (player1.y > this.y && this.directionY < 0) this.directionY = this.directionY * -1
            else if (player1.y < this.y && this.directionY > 0) this.directionY = this.directionY * -1
        } else {
            if (this.y < 0 || this.y > canvas.height - this.height) {
                this.directionY = this.directionY * -1
            }
        }
        this.x -= this.directionX
        this.y += this.directionY
        if (this.x < 0 - this.width) this.markedForDeletion = true

        this.timeSinceFlap += deltaTime
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0
            else this.frame++
            this.timeSinceFlap = 0
        }
    }
    draw() {
        if (this.chase) {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        } else {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }
}

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.spriteWidth = 46;
        this.spriteHeight = 28;
        this.widthOriginal = 50;
        this.heightOriginal = 50 * this.spriteWidth / this.spriteWidth;
        this.width = this.widthOriginal;
        this.height = this.heightOriginal;
        this.image = new Image();
        this.image.src = './img/YellowfishR.png'
        this.frame = 0
        this.maxFrame = 4
        this.timeSinceFlap = 0
        this.flapInterval = 60
        this.speed = 5
        this.maxSize = false
    }

    move(deltaTime) {
        this.timeSinceFlap += deltaTime
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0
            else this.frame++
            this.timeSinceFlap = 0
        }
        const distanceX = player1.x - (mouse.x - player1.width / 2);
        const distanceY = player1.y - (mouse.y - player1.height / 2);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance > threshold) {
            const angle = Math.atan2(distanceY, distanceX);
            velocityX = this.speed * Math.cos(angle);
            velocityY = this.speed * Math.sin(angle);

            player1.x -= velocityX;
            player1.y -= velocityY;
        } else {
            player1.x = mouse.x - player1.width / 2;
            player1.y = mouse.y - player1.height / 2;
        }
        this.image.src = velocityX > 0 ? './img/YellowfishL.png' : './img/YellowfishR.png'   
    }
    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, player1.x, player1.y, player1.width, player1.height)
    }
}

