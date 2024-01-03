const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// BMI Calculation Logic
function calculateBMI(weight, height) {
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return null; // Invalid input, return null
      }
    
      // Convert height to meters
      const heightInMeters = height / 100;
    
      // Calculate BMI
      const bmi = weight / (heightInMeters * heightInMeters);
    
      return bmi;
}

function interpretBMI(bmi) {
    if (bmi === null) {
        return 'Invalid input';
      } else if (bmi < 18.5) {
        return 'Underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal Weight';
      } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
      } else {
        return 'Obese';
      }
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/bmicalculator', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  // Calculate BMI
  const bmiResult = calculateBMI(weight, height);
  const interpretation = interpretBMI(bmiResult);

  // Display result in your HTML template or send as JSON
  res.send(`BMI: ${bmiResult.toFixed(2)} - ${interpretation}`);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
