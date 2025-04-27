import Personagem from './componentes/Personagem.js';
import Teclado from './componentes/Teclado.js';
import Obstaculo from './componentes/Obstaculo.js';
import Colisor from './componentes/Colisor.js';
import Cenario from './componentes/Cenario.js';

const canvas = document.querySelector("#canva");
const personagem = new Personagem(canvas);
const teclado = new Teclado(personagem)
const colisao = new Colisor()
let obstaculo = new Obstaculo(canvas, personagem);


let jogoAtivo = true;
let debugColisao = true;

const backgrounds = [
    '../img/fase1.jpg',
    '../img/fase2.jpg',
    '../img/fase3.jpg',
    '../img/fase4.jpg',
    '../img/fase5.jpg'
];
const cenario = new Cenario(canvas, backgrounds);

function inicia() {
    if (!jogoAtivo) {
        console.log("Fim de jogo!");
        return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cenario.atualizar();
    cenario.desenhar();

    if (obstaculo) {
        obstaculo.atualizar();
        if (debugColisao) {
            obstaculo.desenharCaixaColisao(ctx);
        }
        if (obstaculo.posicaoX + obstaculo.largura < 0) {
            console.log("Obstáculo saiu da tela, criando novo.");
            obstaculo = new Obstaculo(canvas, personagem);
        }
    }
    personagem.andar("direita");
    personagem.desenhar();
    if (debugColisao) {
        personagem.desenharCaixaColisao(ctx);
    }
    if (obstaculo && colisao.verificarColisao(personagem, obstaculo)) {
        console.log("Colidiu com obstáculo!");

        console.log("Obstáculo 'destruído' (substituído).");
        obstaculo = new Obstaculo(canvas, personagem);

    }

    requestAnimationFrame(inicia);
}

personagem.sprite.onload = () => {
    console.log("Sprite carregado, iniciando o jogo.");
    jogoAtivo = true;
    obstaculo = new Obstaculo(canvas, personagem); 
    inicia();
};

if (personagem.sprite.complete && !personagem.sprite.naturalWidth === 0) {
  console.log("Sprite já estava carregado (cache), iniciando o jogo.");
  jogoAtivo = true;
  obstaculo = new Obstaculo(canvas, personagem);
  inicia();
} else {
     console.log("Aguardando carregamento do sprite...");
}
