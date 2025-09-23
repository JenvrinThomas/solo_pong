const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

let paddleWidth, paddleHeight, ballRadius, paddleSpeed;
let PaddleX, ballX, ballY, ballSpeedX, ballSpeedY, ballSpeedIncrease;
let score;
let rightPressed, leftPressed, spacePressed;
let gameStartTime = Date.now();
let isPaused;

function setVariables() {
// Variables du jeu
    paddleWidth = 150;
    paddleHeight = 20;
    ballRadius = 10;
    paddleSpeed = 15;
    PaddleX = (canvas.width - paddleWidth) / 2;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    score = 0;

    rightPressed = false;
    leftPressed = false;
    spacePressed = false;

}

// Écouteurs d'événements pour les touches
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function resetBallSpeedIncrease() {
    ballSpeedIncrease = 0.003;
}

function resetBallSpeed(){
    ballSpeedX = Math.random() * 6 - 3;
    ballSpeedY = -4;
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    else if (e.key === ' ') {
        spacePressed = true;
        resetBall();
        resetBallSpeedIncrease();
        score = 0;
        gameStartTime = Date.now();
        isPaused = false; // on relance le jeu
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
    else if (e.key === 'Space') {
        spacePressed = false;
    }
}       

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(PaddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = '#2cdd00ff';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff5733ff';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    let pauseText = '';
    if(isPaused) {
        pauseText = ' - Appuyez sur la barre d\'espace pour (re)commencer' + pauseText;
    }
    else {
        pauseText = '';
    }
    ctx.font = '32px PT Sans';
    score = Math.floor((Date.now() - gameStartTime) / 1000);
    ctx.fillStyle = '#0095DD';
    if(score < 60) ctx.fillText('Score : ' + score%60 + ' s' + pauseText, 8, 40);
    else if (score < 3600 && score >= 60) ctx.fillText('Score : ' + Math.floor(score/60) + ' min ' + score%60 + ' s' + pauseText, 8, 40);
    else ctx.fillText('Score : ' + Math.floor(score/3600) + ' h ' + Math.floor((score%3600)/60) + ' min ' + score%60 + ' s' + pauseText, 8, 40);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    resetBallSpeed();
    resetBallSpeedIncrease();
}

function update() {
    if(isPaused) return;

    if (rightPressed && PaddleX < canvas.width - paddleWidth) {
        PaddleX += paddleSpeed;
    } else if (leftPressed && PaddleX > 0) {
        PaddleX -= paddleSpeed;
    }
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Collision avec les murs gauche et droite
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        //ballSpeedX = -ballSpeedX;
        ballSpeedX = PaddleX + paddleWidth/2 - ballX < 0 ? -Math.abs(ballSpeedX) : Math.abs(ballSpeedX);
    }
    // Collision avec le mur supérieur
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    // Collision avec la raquette
    if (ballY + ballRadius > canvas.height - paddleHeight - 10) {
        if (ballX > PaddleX && ballX < PaddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        }
    }
    if(ballSpeedX > 0) {
        ballSpeedX += ballSpeedIncrease;
    }
    else {
        ballSpeedX -= ballSpeedIncrease;
    }
    if(ballSpeedY > 0) {
        ballSpeedY += ballSpeedIncrease;
    }
    else {
        ballSpeedY -= ballSpeedIncrease;
    }
    // Si la balle touche le bas du canvas
    if (ballY + ballRadius > canvas.height) {
        isPaused = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


setVariables();
resetBallSpeedIncrease();
resetBallSpeed();
isPaused = true;

gameLoop();