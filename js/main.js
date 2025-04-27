import Personagem from './componentes/Personagem.js';
import Teclado from './componentes/Teclado.js';
import Obstaculo from './componentes/Obstaculo.js';
import Colisor from './componentes/Colisor.js';
import Cenario from './componentes/Cenario.js';

const canvas = document.querySelector("#canva");
const personagem = new Personagem(canvas);
const teclado = new Teclado(personagem);
const colisao = new Colisor();
let obstaculo = null;

let jogoAtivo = true;
let debug = true;

const definicoesFases = [
    { imagem: '../img/fase1.jpg', gravidade: 0.5, chaoY: canvas.height - 50, velocidadeScroll: 1 },
    { imagem: '../img/fase2.jpg', gravidade: 0.3, chaoY: canvas.height - 50, velocidadeScroll: 1.5 },
    { imagem: '../img/fase3.jpg', gravidade: 0.7, chaoY: canvas.height - 50, velocidadeScroll: 0.8 },
    { imagem: '../img/fase4.jpg', gravidade: 0.5, chaoY: canvas.height - 50, velocidadeScroll: 1 },
    { imagem: '../img/fase5.jpg', gravidade: 0.4, chaoY: canvas.height - 50, velocidadeScroll: 1.2 },
];

const cenario = new Cenario(canvas, definicoesFases);

function inicia() {
    if (!jogoAtivo) {
        console.log("Fim de jogo!");
        return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cenario.atualizar();
    cenario.desenhar();
    if (debug) {
        cenario.desenharDebugInfo(ctx);
        personagem.desenharVida(ctx);
    }

    const gravidadeAtual = cenario.getGravidadeAtual();
    const chaoYAtual = cenario.getChaoYAtual();
    personagem.andar('direita')
    personagem.atualizarFisica(gravidadeAtual, chaoYAtual);

    if (obstaculo) {
        obstaculo.atualizar();
        if (debug) {
            obstaculo.desenharCaixaColisao(ctx);
        }
        if (obstaculo.posicaoX + obstaculo.largura < 0) {
            obstaculo = new Obstaculo(canvas, personagem, 30, 10, chaoYAtual);
        }
    }

    personagem.desenhar();
    if (debug) {
        personagem.desenharCaixaColisao(ctx);
    }

    if (obstaculo && colisao.verificarColisao(personagem, obstaculo)) {
        console.log("Colidiu!");
        obstaculo = new Obstaculo(canvas, personagem, 30, 50, chaoYAtual);
    }

    requestAnimationFrame(inicia);
}

function iniciarJogo() {
    console.log("Iniciando o jogo...");
    jogoAtivo = true;
    const chaoInicial = cenario.getChaoYAtual();
    obstaculo = new Obstaculo(canvas, personagem, 30, 50, chaoInicial);
    inicia();
}

let cenarioPronto = false;
let personagemPronto = false;

cenario.background.onload = () => {
    console.log("Cenário inicial carregado.");
    cenario.carregado = true;
    cenarioPronto = true;
    if (personagemPronto) iniciarJogo();
};
cenario.background.onerror = () => {
    console.error("Falha ao carregar imagem inicial do cenário.");
};

personagem.sprite.onload = () => {
    console.log("Sprite do personagem carregado.");
    personagemPronto = true;
    if (cenarioPronto) iniciarJogo();
};
personagem.sprite.onerror = () => {
    console.error("Falha ao carregar sprite do personagem.");
};

if (personagem.sprite.complete && personagem.sprite.naturalWidth !== 0) {
     console.log("Sprite do personagem já estava em cache.");
     personagemPronto = true;
}
if (cenario.background.complete && cenario.background.naturalWidth !== 0) {
    console.log("Cenário inicial já estava em cache.");
    cenarioPronto = true;
    cenario.carregado = true;
}

if (personagemPronto && cenarioPronto) {
     iniciarJogo();
}