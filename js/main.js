const canvas = document.querySelector("#canva")
const ctx = canvas.getContext('2d')
ctx.beginPath();
ctx.arc(100, 50, 40, 0,  Math.PI);
ctx.moveTo(100, 50);
ctx.lineTo(100, 200);
ctx.stroke();

ctx.fillRect(110, 150, 50, 100)
ctx.fillRect(85, 180, 100, 20)