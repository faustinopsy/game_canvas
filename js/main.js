const canvas = document.querySelector("#canva")
const ctx = canvas.getContext('2d')
const imagem = new Image();
let x = 70
imagem.src = '../img/sonic.png';
imagem.onload = function() {
   desenharPersonagem(x)
   
}

function desenharPersonagem(pos){
    ctx.drawImage(imagem, pos, 45, 40, 50 , 30, 200, 50, 50);
   
}

document.addEventListener("keydown",(e)=>{
    if (e.keyCode == 37) {
            x -= 30;
            desenharPersonagem(x);
        }
        else if (e.keyCode == 39) {
            x += 30;
            desenharPersonagem(x);
        }
   })