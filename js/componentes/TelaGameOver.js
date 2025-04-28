export default class TelaGameOver {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    desenhar(cenario) {
         if (cenario && cenario.carregado) {
            this.ctx.drawImage(cenario.background, cenario.backgroundX, 0, this.canvas.width, this.canvas.height);
             this.ctx.drawImage(cenario.background, cenario.backgroundX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
         } else {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
         }

         this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.ctx.fillStyle = 'red';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Pressione ENTER para reiniciar', this.canvas.width / 2, this.canvas.height / 2 + 30);
        this.ctx.textAlign = 'left';
    }
}