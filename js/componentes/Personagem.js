export default class Personagem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.sprite = new Image();
        this.sprite.src = "../img/sonic.png";
        this.correndo = false;
        this.voltando = false;
        this.onAndar = null;
        this.largura = 52;
        this.altura = 50;
        this.totalFrames = 7;
        this.frameAtual = 0;
        this.linhaAtual = 0;
        this.posicaoX = 80;
        this.posicaoY = 150;

        this.colisaoOffsetX = 10;
        this.colisaoOffsetY = 7; 
        this.colisaoLargura = 25;
        this.colisaoAltura = 42;  
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
    desenhar() {
        const espaço = 0;
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const sx = Math.floor(this.frameAtual) * (this.largura + espaço);
        const sy = Math.floor(this.linhaAtual) * this.altura;
        this.ctx.drawImage(
            this.sprite,
            sx, sy, this.largura, this.altura,
            this.posicaoX, this.posicaoY, this.largura, this.altura
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
