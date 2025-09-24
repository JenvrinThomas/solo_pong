document.getElementById('confirmChanges').addEventListener('click', () => {
    // à faire : enregistrer les paramètres
    document.location.href = "index.html";
});

function refreshValues() {
    const speedRange = document.getElementById('speedRange');
    const speedNumber = document.getElementById('speedNumber');

    speedRange.addEventListener('input', () => {
        speedNumber.value = speedRange.value;
    });
}

refreshValues();