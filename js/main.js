import Personagem from './componentes/Personagem.js';
import Teclado from './componentes/Teclado.js';
import Obstaculo from './componentes/Obstaculo.js';
import Colisor from './componentes/Colisor.js';
import Cenario from './componentes/Cenario.js';
import TelaLoading from './componentes/TelaLoading.js';
import TelaInicial from './componentes/TelaInicial.js';
import TelaGameOver from './componentes/TelaGameOver.js';
import AssetLoader from './componentes/AssetLoader.js';

const EstadosJogo = {
    LOADING: 'LOADING',
    START_SCREEN: 'START_SCREEN',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER'
};
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");;
        this.debug = false;
        this.estadoAtualDoJogo = EstadosJogo.LOADING;
        this.loadingProgresso = 0;
        this.loadingErro = false;
        this.loadingCompleto = false;
        this.assetLoader = new AssetLoader();
        this.personagem = new Personagem(this.canvas);
        this.teclado = new Teclado(this.personagem);
        this.colisao = new Colisor();
        this.obstaculo = null; 

        this.definicoesFases = [
            { imagemChave: 'fase1', imagemSrc: '../img/fase1.jpg', gravidade: 0.5, chaoY: canvas.height - 50, velocidadeScroll: 1 },
            { imagemChave: 'fase2', imagemSrc: '../img/fase2.jpg', gravidade: 0.5, chaoY: canvas.height - 50, velocidadeScroll: 1.5 },
            { imagemChave: 'fase3', imagemSrc: '../img/fase3.jpg', gravidade: 0.2, chaoY: canvas.height - 50, velocidadeScroll: 0.8 },
            { imagemChave: 'fase4', imagemSrc: '../img/fase4.jpg', gravidade: 0.3, chaoY: canvas.height - 50, velocidadeScroll: 1 },
            { imagemChave: 'fase5', imagemSrc: '../img/fase5.jpg', gravidade: 0.6, chaoY: canvas.height - 50, velocidadeScroll: 1.2 },
            { imagemChave: 'fase5', imagemSrc: '../img/fase6.jpg', gravidade: 0.0, chaoY: canvas.height - 50, velocidadeScroll: 1.2 },
            { imagemChave: 'fase5', imagemSrc: '../img/fase7.jpg', gravidade: 0.8, chaoY: canvas.height - 50, velocidadeScroll: 1.2 },
        ];
        this.cenario = new Cenario(this.canvas, this.definicoesFases);

        this.telaLoading = new TelaLoading(this.canvas, this.ctx);
        this.telaInicial = new TelaInicial(this.canvas, this.ctx);
        this.telaGameOver = new TelaGameOver(this.canvas, this.ctx);
    }

    iniciar() {
        this.configurarECarregarAssets();
        this.configurarEntradas();
        this.gameLoop();
    }
    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        switch (this.estadoAtualDoJogo) {
            case EstadosJogo.LOADING:
                this.telaLoading.desenhar(this.loadingProgresso, 100, this.loadingErro);
                break;
            case EstadosJogo.START_SCREEN:
                this.telaInicial.desenhar(this.cenario);
                break;
            case EstadosJogo.PLAYING:
                this.atualizarEJDesenharJogo();
                break;
            case EstadosJogo.GAME_OVER:
                this.telaGameOver.desenhar(this.cenario);
                break;
        }

        if (this.estadoAtualDoJogo !== EstadosJogo.LOADING) {
            this.desenharIndicadorDebug();
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    atualizarEJDesenharJogo() {
        this.cenario.atualizar();
        this.cenario.desenhar();
        const gravidadeAtual = this.cenario.getGravidadeAtual();
        const chaoYAtual = this.cenario.getChaoYAtual();
        this.personagem.atualizarFisica(gravidadeAtual, chaoYAtual);

        if (this.obstaculo) {
            this.obstaculo.atualizar();
            if (this.obstaculo.posicaoX + this.obstaculo.largura < 0) {
                this.obstaculo = new Obstaculo(this.canvas, this.personagem, 30, 60-gravidadeAtual, chaoYAtual);
            }
        } else if (this.estadoAtualDoJogo === EstadosJogo.PLAYING) {
             this.obstaculo = new Obstaculo(this.canvas, this.personagem, 30, 40-gravidadeAtual, chaoYAtual);
        }

        this.personagem.andar('direita');
        this.personagem.desenhar();
        this.personagem.desenharVida(this.ctx);

        if (this.debug) {
            if (this.cenario) this.cenario.desenharDebugInfo(this.ctx);
            if (this.personagem) this.personagem.desenharCaixaColisao(this.ctx);
            if (this.obstaculo) this.obstaculo.desenharCaixaColisao(this.ctx);
        }

        if (this.obstaculo && this.colisao.verificarColisao(this.personagem, this.obstaculo)) {
            console.log("Colidiu!");
            this.personagem.perderVida();
            this.obstaculo = new Obstaculo(this.canvas, this.personagem, 30, 50, chaoYAtual);
            if (this.personagem.vida <= 0) {
                this.mudarEstadoPara(EstadosJogo.GAME_OVER);
            }
        }
    }

    desenharIndicadorDebug() {
        this.ctx.fillStyle = this.debug ? 'lime' : 'gray';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Debug (P): ${this.debug ? 'ON' : 'OFF'}`, this.canvas.width - 10, 20);
        this.ctx.textAlign = 'left';
    }

    iniciarNovoJogo() {
        console.log("Iniciando novo jogo...");
        this.personagem.resetar();
        this.cenario.carregarFase(0);
        const chaoInicial = this.cenario.getChaoYAtual();
        this.obstaculo = new Obstaculo(this.canvas, this.personagem, 30, 10, chaoInicial);
        this.mudarEstadoPara(EstadosJogo.PLAYING);
    }

    configurarECarregarAssets() {
        this.assetLoader.adicionarImagem('personagem', this.personagem.sprite.src);
        this.definicoesFases.forEach(fase => {
            this.assetLoader.adicionarImagem(fase.imagemChave, fase.imagemSrc);
        });

        const onProgress = (carregados, total) => {
            this.loadingProgresso = Math.round((carregados / total) * 100);
        };

        const onComplete = (imagensCarregadas) => {
            console.log("Callback onComplete do AssetLoader chamado.");
            this.loadingCompleto = true;
            this.loadingErro = false;
            this.loadingProgresso = 100;
            this.personagem.sprite = imagensCarregadas.get('personagem');
            this.cenario.setImagensCarregadas(imagensCarregadas); 
             this.mudarEstadoPara(EstadosJogo.START_SCREEN);
        };

        const onError = (src) => {
            console.log("Callback onError do AssetLoader chamado.");
            this.loadingErro = true;
        };

        this.assetLoader.iniciarCarregamento(onProgress, onComplete, onError);
    }
    configurarEntradas() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (this.estadoAtualDoJogo === EstadosJogo.START_SCREEN || this.estadoAtualDoJogo === EstadosJogo.GAME_OVER) {
                    this.iniciarNovoJogo();
                }
            }
            if (e.key === 'p' || e.key === 'P') {
                this.debug = !this.debug;
                console.log("Debug Toggled:", this.debug);
            }
        });
    }

    mudarEstadoPara(novoEstado) {
        if (this.estadoAtualDoJogo !== novoEstado) {
            console.log(`Mudando estado de ${this.estadoAtualDoJogo} para ${novoEstado}`);
            this.estadoAtualDoJogo = novoEstado;
        }
    }
}

const canvas = document.querySelector("#canva");
if (!canvas) {
    throw new Error("Elemento canvas com id 'canva' não encontrado!");
}

try {
    const game = new Game(canvas)
    game.iniciar()
} catch (error) {
    console.error("Erro fatal ao inicializar o jogo:", error);
    document.body.innerHTML = `<div style="color: red; padding: 20px;">Erro ao iniciar o jogo: ${error.message}. Verifique o console.</div>`;
}
