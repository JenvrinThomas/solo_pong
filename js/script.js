const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// variables : pr la raquette 
let paddleWidth, // plus large, plus facile
paddleHeight, // plus haut, moins de risque que la balle passe à travers
paddleX, // position en X de la raquette
paddleSpeed; // vitesse de déplacement de la raquette (trop haut ou trop bas : trop dur)
// pour la balle
let ballX, ballY, // position en X et en Y de la balle
initialBallSpeedX, initialBallSpeedY, // vitesse initiale de la balle
ballSpeedX, ballSpeedY, // vitesse actuelle de la balle
ballSpeedIncrease, // augmentation progressive de la vitesse de la balle, plus haut : plus difficile
ballRadius; // rayon de la balle
let score; 
let previousScore = 0; //score à la partie précédente
let highScore = 0;
// booléens pour touches pressées
let rightPressed, leftPressed, spacePressed;
// récupérer l'heure exacte de début du jeu pour le calcul
let gameStartTime;
// pour l'état du jeu
let isPaused;
let hasLost = false;
let pageJustLoaded = true;
// pour ajuster
let sideSpeedDivider; // plus petit, plus difficile (la balle part sur les côtés plus vite)

let pauseDate = null; 

function setVariables() {
// (ré)initialisation ²des variables du jeu
    paddleWidth = 150;
    paddleHeight = 20;
    ballRadius = 10;
    paddleSpeed = 15;
    paddleX = (canvas.width - paddleWidth) / 2;

    initialBallSpeedX = Math.random() * 6 - 3;
    initialBallSpeedY = -4;

    ballSpeedIncrease = 0.003;
    ballSpeedY = initialBallSpeedY;
    ballSpeedX = initialBallSpeedX;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    score = 0;

    rightPressed = false;
    leftPressed = false;
    spacePressed = false;

    gameStartTime = Date.now();

    sideSpeedDivider = 10;

    hasLost = false;
    isPaused = true;

}

// Écouteurs d'événements pour les touches
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.getElementById('left').addEventListener('touchstart', () => {
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
    pauseGame();
});

document.getElementById('pause').addEventListener('click', () => {
    pauseGame();
});

document.getElementById('restart').addEventListener('touchstart', () => {
    setVariables();
});

document.getElementById('restart').addEventListener('click', () => {
    setVariables();
    isPaused = false;
});

document.getElementById('settingsButton').addEventListener('click', () => {
    const settingsForm = document.getElementById('settingsForm');
    document.location.href = "settings.html";
});

function setText(text) {
    gameText = document.getElementById("game-text");
    if(gameText) {
        gameText.innerText = text;
    } else {
        alert("Erreur : élément 'game-text' non trouvé.");
    }
}

function pauseGame() {
    if (!isPaused) {
        // On met en pause
        isPaused = true;
        pauseDate = Date.now();
    } else {
        // On reprend
        isPaused = false;
        if (pauseDate) {
            let pausedDuration = Date.now() - pauseDate;
            gameStartTime += pausedDuration;
            pauseDate = null;
        }
        pageJustLoaded = false; 
    }
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    else if (e.key === ' ') {
        if(pageJustLoaded) pageJustLoaded = false;
        spacePressed = true;
        setVariables(); 
        score = 0;
        isPaused = false; // on relance le jeu
        hasLost = false;
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
    if(isPaused && !hasLost) {
        pauseText = ' - Appuyez sur le bouton Jouer pour reprendre la partie' + pauseText;
        setText('PAUSE' + pauseText);
    }
    else if((hasLost) && !pageJustLoaded) {
        setText('Vous avez perdu ! Score final : ' + previousScore + ' seconde(s). Record : ' + highScore + ' seconde(s) - Appuyez sur la barre d\'espace pour recommencer');
    } else if(!pageJustLoaded && !isPaused) {
        pauseText = '';
        score = Math.floor((Date.now() - gameStartTime) / 1000);
        if(score < 60) setText('Score : ' + score%60 + ' s' + pauseText);
        else if (score < 3600 && score >= 60) setText('Score : ' + Math.floor(score/60) + ' min ' + score%60 + ' s' + pauseText);
        else setText('Score : ' + Math.floor(score/3600) + ' h ' + Math.floor((score%3600)/60) + ' min ' + score%60 + ' s' + pauseText);
    }
    else{
        setText('Appuyez sur la barre d\'espace ou sur le bouton Jouer pour commencer. Record : ' + highScore + ' seconde(s)');
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    setVariables();
}

function playerLost() {
    previousScore = score;
    if(previousScore > highScore) {
        highScore = previousScore;
        localStorage.setItem('highScore', highScore);
    }
    resetBall();
    hasLost = true;
}

function update() {
    if(isPaused || hasLost){
        document.getElementById('pause').innerText = 'Jouer';
        return;
    }
    document.getElementById('pause').innerText = 'Pause';

    if(ballSpeedX === 0) {
        ballSpeedX = (Math.random() * 2 - 1);
    }

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
    if(Math.abs(ballSpeedY/initialBallSpeedY) < 5) {
        if(ballSpeedY > 0) {
            ballSpeedY += ballSpeedIncrease;
        }
        else {
            ballSpeedY -= ballSpeedIncrease;
        }
    }
    
    if (ballY + ballRadius > canvas.height) {
        playerLost();
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

if(localStorage.getItem('highScore') === null) {    
    localStorage.setItem('highScore', 0);
}
else {
    highScore = parseInt(localStorage.getItem('highScore'));
}

gameLoop();