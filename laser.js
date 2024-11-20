class Laser {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 2;
        this.height = 10;

        
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) { // Space bar key code
        shooter.fireLaser();
    }
});
    }
    

    move() {
        this.y -= this.speed;
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(invaders) {
        for (let i = 0; i < invaders.length; i++) {
            let invader = invaders[i];
            if (this.x < invader.x + invader.width &&
                    this.x + this.width > invader.x &&
                    this.y < invader.y + invader.height &&
                    this.y + this.height > invader.y) {
                invaders.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

class Shooter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lasers = [];
    }


    fireLaser() {
        let laser = new Laser(this.x + 15, this.y, 5);
        this.lasers.push(laser);
    }
    

    updateLasers(context, invaders) {
        for (let i = 0; i < this.lasers.length; i++) {
            let laser = this.lasers[i];
            laser.move();
            if (laser.checkCollision(invaders)) {
                this.lasers.splice(i, 1);
                i--;
            } else if (laser.y < 0) {
                this.lasers.splice(i, 1);
                i--;
            } else {
                laser.draw(context);
            }
        }
    }
}
