export default class Sonic {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.sprite = new Image();
        this.sprite.src = "../img/sonic.png";
        this.sprite.onload = () => this.desenhar();

        this.larguraFrame = 40;
        this.alturaFrame = 50;
        this.totalFrames = 6;
        this.frameAtual = 0;
        this.linhaAtual = 1;
        this.posicaoX = 100;
        this.posicaoY = 200;
    }

    desenhar() {
        const espaço = 0.5;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const sx = Math.floor(this.frameAtual) * (this.larguraFrame + espaço);
        const sy = Math.floor(this.linhaAtual) * this.alturaFrame;
        this.ctx.drawImage(
            this.sprite,
            sx, sy, this.larguraFrame, this.alturaFrame,
            this.posicaoX, this.posicaoY, this.larguraFrame, this.alturaFrame
        );
    }

    andar(direcao) {
        if (direcao === "direita") {
            this.linhaAtual = 1;
            this.frameAtual = (this.frameAtual + 1) % this.totalFrames;
           // this.posicaoX += 10;
        } else if (direcao === "esquerda") {
            this.linhaAtual = 1;
            this.frameAtual = (this.frameAtual + 1) % this.totalFrames;
            //this.posicaoX -= 10;
        }
        this.desenhar();
    }

    parar() {
        
    }

    pular() {
        console.log("Pulo!");
    }

    transformar() {
        console.log("Transformação!");
    }
}
