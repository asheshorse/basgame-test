let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;
let isGameRunning = false;

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const basket = document.getElementById('basket');

// Ͷ����ر���
let ball = {
    x: 50,
    y: 500,
    radius: 10,
    dx: 0,
    dy: 0,
    gravity: 0.5,
    power: 0,
    angle: 0
};

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    score = 0;
    timeLeft = 60;
    ball.x = 50;
    ball.y = 500;
    ball.dx = 0;
    ball.dy = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    
    gameInterval = setInterval(updateGame, 16);
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
}

// ��Ϸ��ʱ
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        isGameRunning = false;
        startBtn.disabled = false;
        alert(`��Ϸ��������ĵ÷��� ${score} ��`);
    }
}

// ������Ϸ״̬
function updateGame() {
    clearCanvas();
    drawCourt();
    drawBall();
    moveBall();
    checkCollision();
}

// ��ջ���
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ��������
function drawCourt() {
    ctx.beginPath();
    ctx.arc(400, 50, 40, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();
}

// ��������
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Ͷ������ģ��
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.dy += ball.gravity;

    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.dy *= -0.7;  // ģ�ⵯ��
    }
}

// ��������Ƿ�����
function checkCollision() {
    if (ball.y - ball.radius < 50 && ball.x > 350 && ball.x < 450) {
        score += 2;
        scoreDisplay.textContent = score;
        ball.x = 50;
        ball.y = 500;
        ball.dx = 0;
        ball.dy = 0;
    }
}

// ��ʼͶ��
canvas.addEventListener('click', (e) => {
    if (!isGameRunning) return;
    let angle = (e.clientX - canvas.offsetLeft - 400) / 100;
    let power = Math.max(Math.min((e.clientY - canvas.offsetTop - 300) / 10, 15), 5);

    ball.angle = angle;
    ball.power = power;
    ball.dx = Math.cos(angle) * power;
    ball.dy = Math.sin(angle) * power;
});

// ������Ϸ
startBtn.addEventListener('click', startGame);
