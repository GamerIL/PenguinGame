const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let penguin = { x: 50, y: canvas.height - 100, width: 50, height: 50, speed: 5, dx: 0, dy: 0 };
let obstacles = [];
let score = 0;
let penguinImg = new Image();
penguinImg.src = 'penguin.png'; // שים את קובץ התמונה של הפינגווין כאן
let iceCubeImg = new Image();
iceCubeImg.src = 'ice-cube.png'; // שים את קובץ התמונה של קוביות הקרח כאן

const collisionSound = document.getElementById('collisionSound'); // Reference to the audio element

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPenguin();
    drawObstacles();
    movePenguin();
    moveObstacles();
    checkCollision();
    requestAnimationFrame(draw);
}

function drawPenguin() {
    ctx.drawImage(penguinImg, penguin.x, penguin.y, penguin.width, penguin.height);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(iceCubeImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function movePenguin() {
    penguin.x += penguin.dx;
    penguin.y += penguin.dy;

    // גבולות הקנבס
    if (penguin.x < 0) penguin.x = 0;
    if (penguin.y < 0) penguin.y = 0;
    if (penguin.x > canvas.width - penguin.width) penguin.x = canvas.width - penguin.width;
    if (penguin.y > canvas.height - penguin.height) penguin.y = canvas.height - penguin.height;
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacle.speed;
        if (obstacle.y > canvas.height) {
            obstacle.y = 0;
            obstacle.x = Math.random() * (canvas.width - obstacle.width);
        }
    });
}

function createObstacles() {
    for (let i = 0; i < 5; i++) {
        let obstacle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: 30,
            height: 30,
            speed: Math.random() * 3 + 2
        };
        obstacles.push(obstacle);
    }
}

function setPenguinDirection(e) {
    switch (e.key) {
        case 'w':
        case 'W':
            penguin.dy = -penguin.speed;
            break;
        case 's':
        case 'S':
            penguin.dy = penguin.speed;
            break;
        case 'a':
        case 'A':
            penguin.dx = -penguin.speed;
            break;
        case 'd':
        case 'D':
            penguin.dx = penguin.speed;
            break;
    }
}

function stopPenguinDirection(e) {
    switch (e.key) {
        case 'w':
        case 'W':
        case 's':
        case 'S':
            penguin.dy = 0;
            break;
        case 'a':
        case 'A':
        case 'd':
        case 'D':
            penguin.dx = 0;
            break;
    }
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            penguin.x < obstacle.x + obstacle.width &&
            penguin.x + penguin.width > obstacle.x &&
            penguin.y < obstacle.y + obstacle.height &&
            penguin.y + penguin.height > obstacle.y
        ) {
            // Play the collision sound
            collisionSound.play();
            
            // Move the obstacle to a new random position
            obstacle.x = Math.random() * (canvas.width - obstacle.width);
            obstacle.y = Math.random() * (canvas.height - obstacle.height);
            score--; // Decrease the score when collision happens
            document.getElementById('score').innerText = score;
        }
    });
}

// Add a point every 2 seconds
setInterval(() => {
    score++;
    document.getElementById('score').innerText = score;
    if (score >= 15) {
        window.location.href = 'factgame3.html'; // שים כאן את הקישור לדף הבא
    }
}, 2000);

document.addEventListener('keydown', setPenguinDirection);
document.addEventListener('keyup', stopPenguinDirection);
penguinImg.onload = function() {
    iceCubeImg.onload = function() {
        createObstacles();
        requestAnimationFrame(draw);
    };
};