export default class Personagem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.sprite = new Image();
        this.sprite.src = "../img/sonic.png";
        this.sprite.onload = () => this.desenhar();
        this.correndo = false;
        this.voltando = false;
        this.onAndar = null;
        this.larguraFrame = 52;
        this.alturaFrame = 50;
        this.totalFrames = 7;
        this.frameAtual = 0;
        this.linhaAtual = 0;
        this.posicaoX = 80;
        this.posicaoY = 150;
    }

    desenhar() {
        const espaço = 0;
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
            this.correndo = true;
            this.linhaAtual = 1;
            this.frameAtual = (this.frameAtual + 1) % this.totalFrames;
           // this.posicaoX += 10;
        } else if (direcao === "esquerda") {
            this.voltando = true;
            this.linhaAtual = 2;
            this.frameAtual = (this.frameAtual + 1) % this.totalFrames;
            //this.posicaoX -= 10;
        }
        //this.desenhar();
        if (this.onAndar) {
            this.onAndar();
        }
    }

    parar() {
        this.linhaAtual = 0;
        this.frameAtual = 0;
        this.desenhar();
        this.correndo = false; 
        this.voltando = false; 
    }

    pular() {
        console.log("Pulo!");
    }

    transformar() {
       
    }
}
