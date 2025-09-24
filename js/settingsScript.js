document.getElementById('confirmChanges').addEventListener('click', () => {
    localStorage.setItem('initialBallSpeed', document.getElementById('speedRange').value);
    localStorage.setItem('ballSpeedIncrease', document.getElementById('ballSpeedIncreaseRange').value);
    localStorage.setItem('ballColor', document.getElementById('ballColor').value);
    localStorage.setItem('paddleColor', document.getElementById('paddleColor').value);
    localStorage.setItem('gameplayAreaBackgroundColor', document.getElementById('gameplayAreaBackgroundColor').value);
    localStorage.setItem('pageBackgroundColor', document.getElementById('pageBackgroundColor').value);
    localStorage.setItem('paddleSpeed', document.getElementById('paddleSpeed').value);
    alert("Paramètres enregistrés !");
    document.location.href = "index.html";
});

document.getElementById('resetDefaults').addEventListener('click', () => {
    localStorage.setItem('initialBallSpeed', 4);
    localStorage.setItem('ballSpeedIncrease', 0.075);
    localStorage.setItem('ballColor', '#0095DD');
    localStorage.setItem('paddleColor', '#133749');
    localStorage.setItem('gameplayAreaBackgroundColor', '#dddddd');
    localStorage.setItem('pageBackgroundColor', '#222222');
    localStorage.setItem('paddleSpeed', 10);
    alert("Paramètres réinitialisés aux valeurs par défaut !");
    getCurrentValues();
});

const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');

const ballSpeedIncreaseRange = document.getElementById('ballSpeedIncreaseRange');
const ballSpeedIncreaseValue = document.getElementById('ballSpeedIncreaseValue');

const ballColor = document.getElementById('ballColor');
let selectedColor;

const paddleColor = document.getElementById('paddleColor');
let selectedPaddleColor;

const gameplayAreaBackgroundColor = document.getElementById('gameplayAreaBackgroundColor');
let selectedGameplayAreaBackgroundColor;

const pageBackgroundColor = document.getElementById('pageBackgroundColor');
let selectedPageBackgroundColor;

const paddleSpeedRange = document.getElementById('paddleSpeed');
const paddleSpeedValue = document.getElementById('paddleSpeedValue');

function refreshValues() {
    speedRange.addEventListener('input', () => {
        speedValue.innerHTML = speedRange.value;
    });
    ballSpeedIncreaseRange.addEventListener('input', () => {
        ballSpeedIncreaseValue.innerHTML = ballSpeedIncreaseRange.value;
    });
    paddleSpeedRange.addEventListener('input', () => {
        paddleSpeedValue.innerHTML = paddleSpeedRange.value;
    });
}

function getCurrentValues() {
    // Initialisation de la valeur du slider et de son label pour la vitesse initiale de la balle
    if(localStorage.getItem('initialBallSpeed') === null) {
        localStorage.setItem('initialBallSpeed', 4);
        speedValue.innerHTML = localStorage.getItem('initialBallSpeed');
    }
    else {
        speedValue.innerHTML = localStorage.getItem('initialBallSpeed');
        speedRange.value = localStorage.getItem('initialBallSpeed');
    }

    // Initialisation de la valeur du slider et de son label pour l'augmentation progressive de la vitesse
    if(localStorage.getItem('ballSpeedIncrease') === null) {
        localStorage.setItem('ballSpeedIncrease', 0.075);
    }
    else {
        ballSpeedIncreaseValue.innerHTML = localStorage.getItem('ballSpeedIncrease');
        ballSpeedIncreaseRange.value = localStorage.getItem('ballSpeedIncrease');
    }

    // encore pareil, mais pour la couleur de la balle
    if(localStorage.getItem('ballColor') === null) {
        localStorage.setItem('ballColor', '#0095DD');
        selectedColor = localStorage.getItem('ballColor');
        ballColor.value = selectedColor;
    }
    else {
        selectedColor = localStorage.getItem('ballColor');
        ballColor.value = selectedColor;
    }

    // et pour la couleur de la raquette
    if(localStorage.getItem('paddleColor') === null) {
        localStorage.setItem('paddleColor', '#133749');
        selectedPaddleColor = localStorage.getItem('paddleColor');
        paddleColor.value = selectedPaddleColor;
    }
    else {
        selectedPaddleColor = localStorage.getItem('paddleColor');
        paddleColor.value = selectedPaddleColor;
    }

    // et pour la couleur de fond de l'aire de jeu
    if(localStorage.getItem('gameplayAreaBackgroundColor') === null) {
        localStorage.setItem('gameplayAreaBackgroundColor', '#dddddd');
        selectedGameplayAreaBackgroundColor = localStorage.getItem('gameplayAreaBackgroundColor');
        gameplayAreaBackgroundColor.value = selectedGameplayAreaBackgroundColor;
    }
    else {
        selectedGameplayAreaBackgroundColor = localStorage.getItem('gameplayAreaBackgroundColor');
        gameplayAreaBackgroundColor.value = selectedGameplayAreaBackgroundColor;
    }

    // et pour la couleur de fond de la page
    if(localStorage.getItem('pageBackgroundColor') === null) {
        localStorage.setItem('pageBackgroundColor', '#222222');
        selectedPageBackgroundColor = localStorage.getItem('pageBackgroundColor');
        pageBackgroundColor.value = selectedPageBackgroundColor;
    }
    else {
        selectedPageBackgroundColor = localStorage.getItem('pageBackgroundColor');
        pageBackgroundColor.value = selectedPageBackgroundColor;
    }

    // et pour la vitesse de la raquette
    if(localStorage.getItem('paddleSpeed') === null) {
        localStorage.setItem('paddleSpeed', 10);
        paddleSpeedValue.innerHTML = localStorage.getItem('paddleSpeed');
    }
    else {
        paddleSpeedValue.innerHTML = localStorage.getItem('paddleSpeed');
        paddleSpeedRange.value = localStorage.getItem('paddleSpeed');
    }
}

getCurrentValues();
refreshValues();