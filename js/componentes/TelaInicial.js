export default class TelaInicial {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    desenhar(cenario) {
        if (cenario && cenario.carregado) {
            this.ctx.drawImage(cenario.background, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, this.canvas.height / 2 - 50, this.canvas.width, 100);
        this.ctx.fillStyle = 'yellow';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Meu Jogo Sonic', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Pressione ENTER para começar', this.canvas.width / 2, this.canvas.height / 2 + 35);
        this.ctx.textAlign = 'left';
    }
}