export default class Cenario {
    constructor(canvas, imagens) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.imagens = imagens;
        this.backgroundAtual = 0;
        this.background = new Image();
        this.background.src = this.imagens[this.backgroundAtual];
        this.backgroundX = 0;
        this.velocidade = 2;
        this.carregado = false;
        this.background.onload = () => {
            this.carregado = true;
        };
    }

    atualizar() {
        if (!this.carregado) return;

        this.backgroundX -= this.velocidade;

        if (this.backgroundX <= -this.canvas.width) {
            this.backgroundX = 0;
            this.backgroundAtual = (this.backgroundAtual + 1) % this.imagens.length;
            this.background.src = this.imagens[this.backgroundAtual];
        }
    }

    desenhar() {
        if (!this.carregado) return;

        this.ctx.drawImage(this.background, this.backgroundX, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, this.backgroundX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
    }
}
