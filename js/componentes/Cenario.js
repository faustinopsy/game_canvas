export default class Cenario {
    constructor(canvas, definicoesFases) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.definicoesFases = definicoesFases;
        this.faseAtualIndex = 0;

        this.background = null; 
        this.gravidadeAtual = 0.5;
        this.chaoYAtual = canvas.height - 50;
        this.velocidadeScroll = 1;
        this.backgroundX = 0;
        this.carregado = false;

        this.imagensCarregadas = null;
    }

    setImagensCarregadas(mapaDeImagens) {
        this.imagensCarregadas = mapaDeImagens;
        if (this.imagensCarregadas && this.imagensCarregadas.size > 0) {
             this.carregarFase(0);
        }
    }

    carregarFase(index) {
        if (index < 0 || index >= this.definicoesFases.length) {
            console.error("Índice de fase inválido:", index);
            return;
        }
        if (!this.imagensCarregadas) {
            console.error("Cenario: Imagens pré-carregadas não definidas.");
            return;
        }

        const fase = this.definicoesFases[index];
        const imagemChave = fase.imagemChave;
        const imagemCarregada = this.imagensCarregadas.get(imagemChave);

        if (!imagemCarregada) {
            console.error(`Cenario: Imagem para a chave "${imagemChave}" não encontrada.`);
            this.carregado = false;
            return;
        }

        console.log(`Cenario: Configurando fase ${index} com imagem ${imagemChave}`);
        this.faseAtualIndex = index;
        this.gravidadeAtual = fase.gravidade ?? 0.5;
        this.chaoYAtual = fase.chaoY ?? this.canvas.height - 50;
        this.velocidadeScroll = fase.velocidadeScroll ?? 1;
        this.background = imagemCarregada;
        this.backgroundX = 0;
        this.carregado = true;
    }

    atualizar() {
        if (!this.carregado) return;

        this.backgroundX -= this.velocidadeScroll;

        if (this.backgroundX <= -this.canvas.width) {
            this.backgroundX = 0;
            const proximoIndex = (this.faseAtualIndex + 1) % this.definicoesFases.length;
            this.carregarFase(proximoIndex);
        }
    }

    desenhar() {
        if (!this.carregado || !this.background) return;

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
         if (!this.carregado) return;
         ctx.strokeStyle = 'cyan';
         ctx.lineWidth = 2;
         ctx.beginPath();
         ctx.moveTo(0, this.chaoYAtual);
         ctx.lineTo(this.canvas.width, this.chaoYAtual);
         ctx.stroke();
         ctx.fillStyle = 'white';
         ctx.font = '12px Arial';
         ctx.fillText(`Gravidade: ${this.gravidadeAtual.toFixed(2)}`, 10, 35);
         ctx.fillText(`Chao Y: ${this.chaoYAtual.toFixed(0)}`, 10, 50);
         ctx.fillText(`Fase Idx: ${this.faseAtualIndex}`, 10, 65);
     }
}