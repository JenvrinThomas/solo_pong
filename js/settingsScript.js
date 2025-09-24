document.getElementById('confirmChanges').addEventListener('click', () => {
    localStorage.setItem('initialBallSpeed', document.getElementById('speedRange').value);
    localStorage.setItem('ballSpeedIncrease', document.getElementById('ballSpeedIncreaseRange').value);
    localStorage.setItem('ballColor', document.getElementById('ballColor').value);
    alert("Paramètres enregistrés !");
    document.location.href = "index.html";
});

const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');

const ballSpeedIncreaseRange = document.getElementById('ballSpeedIncreaseRange');
const ballSpeedIncreaseValue = document.getElementById('ballSpeedIncreaseValue');

const ballColor = document.getElementById('ballColor');
let selectedColor;

function refreshValues() {
    speedRange.addEventListener('input', () => {
        speedValue.innerHTML = speedRange.value;
    });
    ballSpeedIncreaseRange.addEventListener('input', () => {
        ballSpeedIncreaseValue.innerHTML = ballSpeedIncreaseRange.value;
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
}

getCurrentValues();
refreshValues();