export default class Personagem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sprite = new Image();
        this.sprite.src = "../img/sonic.png";
        this.sprite.onerror = () => console.error("Erro ao carregar sprite:", this.sprite.src);
        this.vida = 7;
        this.largura = 52;
        this.altura = 50;
        this.totalFrames = 7;
        this.frameAtual = 0;
        this.linhaAtual = 0;
        this.correndo = false;
        this.voltando = false;
        this.posicaoX = 80;
        this.posicaoY = 50;
        this.colisaoOffsetX = 10;
        this.colisaoOffsetY = 7;
        this.colisaoLargura = 25;
        this.colisaoAltura = 42;
        this.velocidadeY = 0;
        this.forcaPulo = -10;
        this.estaNoChao = false;
    }

    atualizarFisica(gravidadeCenario, chaoYCenario) {
        this.velocidadeY += gravidadeCenario;
        this.posicaoY += this.velocidadeY;
        const baseColisaoY = this.posicaoY + this.colisaoOffsetY + this.colisaoAltura;

        if (baseColisaoY >= chaoYCenario) {
            this.posicaoY = chaoYCenario - this.colisaoAltura - this.colisaoOffsetY;
            this.velocidadeY = 0;
            this.estaNoChao = true;
            if (this.linhaAtual !== 0 && this.linhaAtual !== 1) {
                 this.linhaAtual = this.correndo || this.voltando ? 1 : 0;
            }
        } else {
            this.estaNoChao = false;
        }
    }

    pular() {
        if (this.estaNoChao) {
            this.velocidadeY = this.forcaPulo;
            this.estaNoChao = false;
            console.log("Pulo!");
        }
    }

    desenharCaixaColisao(ctx) {
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.posicaoX + this.colisaoOffsetX,
            this.posicaoY + this.colisaoOffsetY,
            this.colisaoLargura,
            this.colisaoAltura
        );
    }

     andar(direcao) {
        if (direcao === "direita") {
            this.correndo = true;
            this.voltando = false;
             if (this.estaNoChao) {
                 this.linhaAtual = 1;
                 this.frameAtual = (this.frameAtual + 0.25) % this.totalFrames;
             }
        } else if (direcao === "esquerda") {
            this.voltando = true;
            this.correndo = false;
             if (this.estaNoChao) {
             }
        }
        if (this.onAndar) { this.onAndar(); }
    }

    parar() {
        this.correndo = false;
        this.voltando = false;
        if (this.estaNoChao) {
            this.linhaAtual = 0;
            this.frameAtual = 0;
        }
    }

     desenhar() {
        const espaço = 0;
        const sx = Math.floor(this.frameAtual) * (this.largura + espaço);
        const sy = Math.floor(this.linhaAtual) * this.altura;
        this.ctx.drawImage(
            this.sprite,
            sx, sy, this.largura, this.altura,
            this.posicaoX, this.posicaoY, this.largura, this.altura
        );
    }

    desenharVida(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(`Vida: ${this.vida}`, 10, 60);
    }

    transformar() {
    }
}