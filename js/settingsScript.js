document.getElementById('confirmChanges').addEventListener('click', () => {
    // à faire : enregistrer les paramètres
    document.location.href = "index.html";
});

function refreshValues() {
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');

    speedRange.addEventListener('input', () => {
        speedValue.innerHTML = speedRange.value;
    });
}

refreshValues();