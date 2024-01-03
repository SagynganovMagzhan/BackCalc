// bmiCalculator.js

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculateButton').addEventListener('click', function () {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    fetch('/bmicalculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `weight=${weight}&height=${height}&age=${age}&gender=${gender}`,
    })
      .then(response => response.text())
      .then(result => {
        document.getElementById('result').innerHTML = result;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
