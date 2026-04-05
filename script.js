let currentUnit = 'metric';

function setUnit(unit) {
    currentUnit = unit;
    const weightLabel = document.getElementById('weightLabel');
    const heightLabel = document.getElementById('heightLabel');
    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');

    if (unit === 'metric') {
        weightLabel.textContent = 'Weight (kg)';
        heightLabel.textContent = 'Height (cm)';
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
    } else {
        weightLabel.textContent = 'Weight (lbs)';
        heightLabel.textContent = 'Height (inches)';
        metricBtn.classList.remove('active');
        imperialBtn.classList.add('active');
    }

    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('result').classList.add('hidden');
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values.');
        return;
    }

    let bmi;
    if (currentUnit === 'metric') {
        const heightM = height / 100;
        bmi = weight / (heightM * heightM);
    } else {
        bmi = (703 * weight) / (height * height);
    }

    bmi = Math.round(bmi * 10) / 10;
    displayResult(bmi);
}

function displayResult(bmi) {
    const resultDiv = document.getElementById('result');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiMarker = document.getElementById('bmiMarker');

    bmiValue.textContent = bmi;

    let category, className;
    if (bmi < 18.5) {
        category = 'Underweight';
        className = 'category-underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
        className = 'category-normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        className = 'category-overweight';
    } else {
        category = 'Obese';
        className = 'category-obese';
    }

    bmiCategory.textContent = category;
    bmiCategory.className = 'bmi-category ' + className;

    // Position marker on the bar (BMI 15-40 range mapped to 0-100%)
    const percent = Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));
    bmiMarker.style.left = percent + '%';

    resultDiv.classList.remove('hidden');
}

// Allow Enter key to trigger calculation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') calculateBMI();
});
