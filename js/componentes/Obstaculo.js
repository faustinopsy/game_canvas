export default class Obstaculo {
    constructor(canvas, personagem, largura = 30, altura = 30) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.personagem = personagem;
        this.largura = largura;
        this.altura = altura;
        this.posicaoX = canvas.width;
        this.posicaoY = this.sortearPosicaoY();

        this.colisaoOffsetX = 0;
        this.colisaoOffsetY = 0;
        this.colisaoLargura = this.largura;
        this.colisaoAltura = this.altura;
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
    
    sortearPosicaoY() {
        return this.personagem.posicaoY + (Math.random() * 40 - 20); 
    }

    atualizar() {
        if (this.personagem.correndo) { 
            this.posicaoX -= 5;
        }
        if (this.personagem.voltando) { 
            this.posicaoX += 5;
        }
        this.desenhar();
    }

    desenhar() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    }
}
