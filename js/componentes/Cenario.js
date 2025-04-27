export default class Cenario {
    constructor(canvas, definicoesFases) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.definicoesFases = definicoesFases;
        this.faseAtualIndex = 0;
        this.background = new Image();
        this.gravidadeAtual = 0.5;
        this.chaoYAtual = canvas.height - 50;
        this.velocidadeScroll = 1;
        this.backgroundX = 0;
        this.carregado = false;
        this.carregarFase(this.faseAtualIndex);
    }

    carregarFase(index) {
        if (index < 0 || index >= this.definicoesFases.length) {
            console.error("Índice de fase inválido:", index);
            return;
        }
        const fase = this.definicoesFases[index];
        this.faseAtualIndex = index;
        this.gravidadeAtual = fase.gravidade ?? 0.5;
        this.chaoYAtual = fase.chaoY ?? this.canvas.height - 50;
        this.velocidadeScroll = fase.velocidadeScroll ?? 1;
        this.background.src = fase.imagem;
        this.carregado = false;
        this.background.onload = () => {
            this.carregado = true;
            console.log(`Fase ${index} carregada: ${fase.imagem}, Gravidade: ${this.gravidadeAtual}, ChaoY: ${this.chaoYAtual}`);
        };
        this.background.onerror = () => {
            console.error("Erro ao carregar imagem da fase:", fase.imagem);
        };
    }

    atualizar() {
        if (!this.carregado) return;
        this.backgroundX -= this.velocidadeScroll;
        if (this.backgroundX  <= -this.canvas.width) {
            this.backgroundX = 0;
            const proximoIndex = (this.faseAtualIndex + 1) % this.definicoesFases.length;
            this.carregarFase(proximoIndex);
        }
    }

    desenhar() {
        if (!this.carregado) return;
        this.ctx.drawImage(this.background, this.backgroundX, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, this.backgroundX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
    }

    getGravidadeAtual() {
        return this.gravidadeAtual;
    }

    getChaoYAtual() {
        return this.chaoYAtual;
    }

     desenharDebugInfo(ctx) {
         ctx.strokeStyle = 'cyan';
         ctx.lineWidth = 2;
         ctx.beginPath();
         ctx.moveTo(0, this.chaoYAtual);
         ctx.lineTo(this.canvas.width, this.chaoYAtual);
         ctx.stroke();
         ctx.fillStyle = 'white';
         ctx.font = '12px Arial';
         ctx.fillText(`Gravidade: ${this.gravidadeAtual.toFixed(2)}`, 10, 20);
         ctx.fillText(`Chao Y: ${this.chaoYAtual.toFixed(0)}`, 10, 35);
     }
}