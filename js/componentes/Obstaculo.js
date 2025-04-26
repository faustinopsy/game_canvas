export default class Obstaculo {
    constructor(canvas, personagem, largura = 30, altura = 30) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.personagem = personagem;
        this.largura = largura;
        this.altura = altura;
        this.posicaoX = canvas.width;
        this.posicaoY = this.sortearPosicaoY();
    }

    sortearPosicaoY() {
        return this.personagem.posicaoY + (Math.random() * 20 - 10); 
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
        this.sortearPosicaoY()
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    }
}
