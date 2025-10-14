const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const digitalClock = document.getElementById('digital-clock');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];

function createDots() {
    dots = [];
    for (let i = 0; i < 150; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            velocityX: (Math.random() - 0.5) * 0.5,
            velocityY: (Math.random() - 0.5) * 0.5
        });
    }
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';

    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();

        dot.x += dot.velocityX;
        dot.y += dot.velocityY;

        if (dot.x < 0 || dot.x > canvas.width) dot.velocityX = -dot.velocityX;
        if (dot.y < 0 || dot.y > canvas.height) dot.velocityY = -dot.velocityY;

        for (let j = i + 1; j < dots.length; j++) {
            let otherDot = dots[j];
            let distance = Math.sqrt(Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2));

            if (distance < 100) {
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 0.3;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(otherDot.x, otherDot.y);
                ctx.stroke();
            }
        }
    }
}

function updateDigitalClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}

createDots();
function animate() {
    requestAnimationFrame(animate);
    drawDots();
    updateDigitalClock();
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots();
});
