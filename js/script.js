const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// variables : pr la raquette 
let paddleWidth, // plus large, plus facile
paddleHeight, // plus haut, moins de risque que la balle passe à travers
paddleX, // position en X de la raquette
paddleSpeed; // vitesse de déplacement de la raquette (trop haut ou trop bas : trop dur)
// pour la balle
let ballX, ballY, // position en X et en Y de la balle
ballSpeedX, ballSpeedY, // vitesse de la balle
ballSpeedIncrease, // augmentation progressive de la vitesse de la balle, plus haut : plus difficile
ballRadius; // rayon de la balle
let score; 
// booléens pour touches pressées
let rightPressed, leftPressed, spacePressed;
// récupérer l'heure exacte de début du jeu pour le calcul
let gameStartTime = Date.now();
// pour l'état du jeu
let isPaused;
// pour ajuster
let sideSpeedDivider; // plus petit, plus diffiile (la balle part sur les côtés plus vite)

function setVariables() {
// (ré)initialisation ²des variables du jeu
    paddleWidth = 150;
    paddleHeight = 20;
    ballRadius = 10;
    paddleSpeed = 15;
    paddleX = (canvas.width - paddleWidth) / 2;

    ballSpeedIncrease = 0.003;
    ballSpeedY = -4;
    ballSpeedX = Math.random() * 6 - 3;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    score = 0;

    rightPressed = false;
    leftPressed = false;
    spacePressed = false;

    sideSpeedDivider = 10;

}

// Écouteurs d'événements pour les touches
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.getElementById('left').addEventListener('click', () => {
    leftPressed = true;
});
document.getElementById('left').addEventListener('touchend', () => {
    leftPressed = false;
});
document.getElementById('right').addEventListener('touchstart', () => {
    rightPressed = true;
});
document.getElementById('right').addEventListener('touchend', () => {
    rightPressed = false;
});
document.getElementById('pause').addEventListener('touchstart', () => {
    isPaused = !isPaused;
});
// document.addEventListener('touchstart', (e) => {
//     const touchX = e.touches[0].clientX;
//     if(touchX < canvas.width / 2) {
//         leftPressed = true;
//     } else {
//         rightPressed = true;
//     }
// });

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    else if (e.key === ' ') {
        spacePressed = true;
        setVariables(); 
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
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = '#00000080';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#971c00ff';
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
    ctx.font = '32px Roboto Condensed';
    score = Math.floor((Date.now() - gameStartTime) / 1000);
    ctx.fillStyle = '#000000ff';
    if(score < 60) ctx.fillText('Score : ' + score%60 + ' s' + pauseText, 8, 40);
    else if (score < 3600 && score >= 60) ctx.fillText('Score : ' + Math.floor(score/60) + ' min ' + score%60 + ' s' + pauseText, 8, 40);
    else ctx.fillText('Score : ' + Math.floor(score/3600) + ' h ' + Math.floor((score%3600)/60) + ' min ' + score%60 + ' s' + pauseText, 8, 40);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    setVariables();
}

function update() {
    if(isPaused) return;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Collision avec les murs gauche et droite
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        //ballSpeedX = -ballSpeedX;
        ballSpeedX = paddleX + paddleWidth/2 - ballX < 0 ? -Math.abs(ballSpeedX) : Math.abs(ballSpeedX);
    }
    // Collision avec le mur supérieur
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    // Collision avec la raquette
    if (ballY + ballRadius > canvas.height - paddleHeight - 10) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            if(ballSpeedX > 0) {
                ballSpeedX = (ballX - paddleX - paddleWidth/2)/sideSpeedDivider;
            }
            else {
                ballSpeedX = (ballX - paddleX - paddleWidth/2)/sideSpeedDivider;
            }
        }
    }
    // if(ballSpeedX > 0) {
    //     ballSpeedX += ballSpeedIncrease;
    // }
    // else {
    //     ballSpeedX -= ballSpeedIncrease;
    // }
    if(ballSpeedY > 0) {
        ballSpeedY += ballSpeedIncrease;
    }
    else {
        ballSpeedY -= ballSpeedIncrease;
    }

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
isPaused = true;

gameLoop();