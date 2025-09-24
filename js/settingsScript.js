document.getElementById('confirmChanges').addEventListener('click', () => {
    localStorage.setItem('initialBallSpeed', document.getElementById('speedRange').value);
    document.location.href = "index.html";
});

const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');

function refreshValues() {
    speedRange.addEventListener('input', () => {
        speedValue.innerHTML = speedRange.value;
    });
}

function getCurrentValues() {
    if(localStorage.getItem('initialBallSpeed') === null) {
        localStorage.setItem('initialBallSpeed', 4);
        speedValue.innerHTML = localStorage.getItem('initialBallSpeed');
    }
    else {
        speedValue.innerHTML = localStorage.getItem('initialBallSpeed');
        speedRange.value = localStorage.getItem('initialBallSpeed');
    }
}

getCurrentValues();
refreshValues();