// Function to calculate BMI
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
  
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid weight and height values.');
      return;
    }
  
    // Convert height to meters
    const heightInMeters = height / 100;
  
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
  
    // Interpret BMI
    let interpretation = '';
    if (bmi < 18.5) {
      interpretation = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      interpretation = 'Normal Weight';
    } else if (bmi >= 25 && bmi < 30) {
      interpretation = 'Overweight';
    } else {
      interpretation = 'Obese';
    }
  
    // Display result
    const resultElement = document.getElementById('result');
    resultElement.textContent = `BMI: ${bmi.toFixed(2)} - ${interpretation}`;
  }
  