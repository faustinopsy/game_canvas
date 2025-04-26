import Personagem from './componentes/Personagem.js';
import Teclado from './componentes/Teclado.js';
import Obstaculo from './componentes/Obstaculo.js';

const canvas = document.querySelector("#canva");
const personagem = new Personagem(canvas);
const teclado = new Teclado(personagem)
let obstaculo = new Obstaculo(canvas, personagem);


function inicia() {
    
    personagem.ctx.clearRect(0, 0, canvas.width, canvas.height);
    personagem.desenhar();
    obstaculo.atualizar();

    if (obstaculo.posicaoX + canvas.width < 0) {
        obstaculo = new Obstaculo(canvas, personagem);
    }
    requestAnimationFrame(inicia);
}

inicia();
