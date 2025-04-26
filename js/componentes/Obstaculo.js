export default class Obstaculo {
    constructor(canvas, largura = 30, altura = 30) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.largura = largura;
        this.altura = altura;
        this.resetar();
    }

    resetar() {
        this.posicaoX = this.canvas.width + Math.random() * 100;
        this.posicaoY = Math.random() * (this.canvas.height - this.altura) - 50;
        this.velocidade = 3 + Math.random() * 2;
    }

    update() {
        this.posicaoX -= this.velocidade;
        if (this.posicaoX + this.largura < 0) {
            this.resetar();
        }
    }

    desenhar() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    }
}
