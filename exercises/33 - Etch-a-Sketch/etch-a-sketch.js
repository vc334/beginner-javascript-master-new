// console.log('it works!');

// Select the elements on the page - canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');

// Setup our canvas for drawing

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

ctx.beginPath(); // start the drawing
ctx.moveTo(200, 200);
ctx.lineTo(200, 200);
ctx.stroke();


