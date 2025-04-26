import Personagem from './componentes/Personagem.js';
import Teclado from './componentes/Teclado.js';
import Obstaculo from './componentes/Obstaculo.js';

const canvas = document.querySelector("#canva");
const personagem = new Personagem(canvas);
const teclado = new Teclado(personagem)
const obstaculo = new Obstaculo(canvas, 40, 30);

function inicia() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    personagem.desenhar();
    obstaculo.update();
    obstaculo.desenhar();

   
    requestAnimationFrame(inicia);
}

inicia();
