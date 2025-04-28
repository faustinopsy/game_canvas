export default class TelaLoading {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    desenhar(assetsCarregados, totalAssets, erroCarregamento) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        if (erroCarregamento) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('Erro ao carregar assets!', this.canvas.width / 2, this.canvas.height / 2);
        } else {
            const progresso = totalAssets > 0 ? Math.round((assetsCarregados / totalAssets) * 100) : 0;
            this.ctx.fillText(`Carregando... ${progresso}%`, this.canvas.width / 2, this.canvas.height / 2);
        }
        this.ctx.textAlign = 'left';
    }
}