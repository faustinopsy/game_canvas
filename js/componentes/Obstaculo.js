export default class Obstaculo {
    constructor(canvas, personagem, largura = 30, altura = 60, chaoFase = canvas.height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.personagem = personagem;
        this.largura = largura;
        this.altura = altura;
        this.posicaoX = canvas.width;
        this.chaoFase = chaoFase;
        this.posicaoY = this.chaoFase - this.altura;
        this.colisaoOffsetX = 0;
        this.colisaoOffsetY = 0;
        this.colisaoLargura = this.largura;
        this.colisaoAltura = this.altura;
        this.velocidade = 5;
    }

    atualizar() {
        this.posicaoX -= this.velocidade;
        this.desenhar();
    }

    desenhar() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    }

    desenharCaixaColisao(ctx) {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.posicaoX + this.colisaoOffsetX,
            this.posicaoY + this.colisaoOffsetY,
            this.colisaoLargura,
            this.colisaoAltura
        );
    }
}