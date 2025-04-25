const canvas = document.querySelector("#canva")
const ctx = canvas.getContext('2d')
ctx.beginPath();
ctx.arc(100, 50, 40, 0,  Math.PI);

ctx.lineWidth = 5;
ctx.strokeStyle = 'red';
ctx.moveTo(100, 50);
ctx.lineTo(100, 200);
ctx.stroke();

ctx.lineWidth = 2;
ctx.strokeStyle = 'blue';
ctx.strokeRect(110, 150, 50, 100)
ctx.lineWidth = 2;

ctx.fillStyle = 'red';
ctx.fillRect(85, 180, 100, 20);