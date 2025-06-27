const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');

let drawing = false;
let brushColor = '#000000';

// 🎯 Resize canvas to fit screen
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial setup

// 👇 Mouse and Touch Event Handlers
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);

function startDrawing(e) {
  e.preventDefault();
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e));
}

function stopDrawing(e) {
  e.preventDefault();
  drawing = false;
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;
  ctx.lineTo(getX(e), getY(e));
  ctx.stroke();
}

function getX(e) {
  return e.touches ? e.touches[0].clientX - canvas.offsetLeft : e.clientX - canvas.offsetLeft;
}

function getY(e) {
  return e.touches ? e.touches[0].clientY - canvas.offsetTop : e.clientY - canvas.offsetTop;
}

// 🎨 Color Picker Logic
colorPicker.addEventListener('input', e => {
  brushColor = e.target.value;
});

// 🧹 Clear Button Logic
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
