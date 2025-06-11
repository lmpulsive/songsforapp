const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

let game = {
    playing: false,
    score: 0,
    combo: 0,
    circles: [],
    particles: [],
    nextNumber: 1
};

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.number = game.nextNumber;
        game.nextNumber = game.nextNumber >= 9 ? 1 : game.nextNumber + 1;
        this.radius = 45;
        this.approachRadius = 60;
        this.targetTime = Date.now() + 1500;
        this.active = true;
        this.glow = 0;
    }

    update() {
        const now = Date.now();
        const timeLeft = this.targetTime - now;

        if (timeLeft > 0) {
            this.approachRadius = 45 + (timeLeft / 1500) * 15;
            this.glow = Math.max(0, 1 - timeLeft / 1500);
        } else if (now > this.targetTime + 200) {
            this.active = false;
            game.combo = 0;
            updateUI();
        }
    }

    draw() {
        if (!this.active) return;

        ctx.strokeStyle = `rgba(0, 212, 255, ${0.6 + this.glow * 0.2})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.approachRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.number, this.x, this.y);

        if (this.approachRadius <= this.radius + 2) {
            ctx.strokeStyle = '#ff6b9d';
            ctx.lineWidth = 2;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    hit(mx, my) {
        const dist = Math.sqrt((mx - this.x) ** 2 + (my - this.y) ** 2);
        return dist <= this.radius + 5;
    }

    getAccuracy() {
        const diff = Math.abs(Date.now() - this.targetTime);
        if (diff <= 20) return 'PERFECT';
        if (diff <= 40) return 'GREAT';
        if (diff <= 80) return 'GOOD';
        return 'OK';
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 200;
        this.vy = (Math.random() - 0.5) * 200;
        this.life = 1;
        this.color = ['#00d4ff', '#ff6b9d', '#5b86e5'][Math.floor(Math.random() * 3)];
    }

    update() {
        this.x += this.vx * 0.016;
        this.y += this.vy * 0.016;
        this.vy += 300 * 0.016;
        this.life -= 0.02;
    }

    draw() {
        if (this.life <= 0) return;
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function spawnCircle() {
    const margin = 80;
    const x = margin + Math.random() * (canvas.width - margin * 2);
    const y = margin + Math.random() * (canvas.height - margin * 2);
    game.circles.push(new Circle(x, y));
}

function handleClick(x, y) {
    if (!game.playing) return;

    for (let i = game.circles.length - 1; i >= 0; i--) {
        const circle = game.circles[i];
        if (circle.active && circle.hit(x, y)) {
            const accuracy = circle.getAccuracy();
            const points = accuracy === 'PERFECT' ? 300 :
                         accuracy === 'GREAT' ? 200 :
                         accuracy === 'GOOD' ? 100 : 50;

            game.score += points * (game.combo + 1);
            game.combo++;

            for (let j = 0; j < 10; j++) {
                game.particles.push(new Particle(x, y));
            }

            circle.active = false;
            updateUI();
            break;
        }
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    handleClick(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    handleClick(touch.clientX - rect.left, touch.clientY - rect.top);
});

function updateUI() {
    document.getElementById('score').textContent = game.score;
    document.getElementById('combo').textContent = game.combo;
}

function gameLoop() {
    if (!game.playing) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    game.circles = game.circles.filter(circle => {
        circle.update();
        circle.draw();
        return circle.active;
    });

    game.particles = game.particles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0;
    });

    if (Math.random() < 0.02) {
        spawnCircle();
    }

    requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    game.playing = true;
    game.score = 0;
    game.combo = 0;
    game.circles = [];
    game.particles = [];
    game.nextNumber = 1;

    updateUI();
    setTimeout(() => spawnCircle(), 500);
    setTimeout(() => spawnCircle(), 1500);
    gameLoop();
}

updateUI();