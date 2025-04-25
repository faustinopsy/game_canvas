const canvas = document.querySelector("#canva")
const ctx = canvas.getContext('2d')
const imagem = new Image();
imagem.src = '../img/sonic.png';
imagem.onload = function() {
   let x = 70
   const loop = setInterval(() => {
    x += 30
    if(x > 400){
        clearInterval(loop)
    }
    ctx.drawImage(imagem, x, 45, 40, 50 , 30, 200, 50, 50);
   }, 200);
   
}