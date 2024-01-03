// root.js

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const figlet = require('figlet');
const path = require('path');

const app = express();
const port = 3000;

// BMI Calculation Logic
function calculateBMI(weight, height, age, gender) {
  if (isNaN(weight) || isNaN(height) || isNaN(age) || !['male', 'female'].includes(gender) ||
    weight <= 0 || height <= 0 || age <= 0) {
    return null; // Invalid input, return null
  }

  // Convert height to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  let bmi = weight / (heightInMeters * heightInMeters);

  // Adjust BMI based on age and gender
  if (gender === 'female' && age >= 50) {
    bmi += 1; // Increase BMI for females over 50
  } else if (gender === 'male' && age >= 40) {
    bmi += 1; // Increase BMI for males over 40
  }

  return bmi;
}

// Interpret BMI based on gender
function interpretBMI(bmi, gender) {
  if (bmi === null) {
    return 'Invalid input';
  }

  if (gender === 'male') {
    if (bmi < 18.5) {
      return 'Underweight (Male)';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal Weight (Male)';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight (Male)';
    } else {
      return 'Obese (Male)';
    }
  } else if (gender === 'female') {
    if (bmi < 18.5) {
      return 'Underweight (Female)';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal Weight (Female)';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight (Female)';
    } else {
      return 'Obese (Female)';
    }
  } else {
    return 'Invalid gender';
  }
}


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  // Render the home page
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.route('/bmicalculator')
  .get((req, res) => {
    // Render the BMI calculator page
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  })
  .post((req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const age = parseInt(req.body.age);
    const gender = req.body.gender;

    // Calculate BMI
    const bmiResult = calculateBMI(weight, height, age, gender);

    // Interpret BMI based on gender
    const interpretation = interpretBMI(bmiResult, gender);

    // Display result with chalk and figlet
    const coloredResult = chalk.bold(`BMI: ${bmiResult.toFixed(2)} - ${interpretation}`);
    const figletText = figlet.textSync(coloredResult, { horizontalLayout: 'full' });

    // Log the colored and figlet text to the console
    console.log(coloredResult);
    console.log(figletText);

    // Send the result as a response
    res.send(coloredResult);
  });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
