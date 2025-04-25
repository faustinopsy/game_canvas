const canvas = document.querySelector("#canva")
const ctx = canvas.getContext('2d')
ctx.beginPath();
ctx.arc(100, 50, 40, 0,  Math.PI);
ctx.moveTo(100, 50);
ctx.lineTo(100, 200);
ctx.stroke();

ctx.beginPath();
ctx.arc(200, 150, 50, 0,  Math.PI * 2);
ctx.lineTo(200, 150);
ctx.lineTo(200, 100);
ctx.lineTo(200, 200);
ctx.lineTo(200, 150);
ctx.lineTo(150, 150);
ctx.stroke();