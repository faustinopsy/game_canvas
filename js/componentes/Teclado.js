export default class Teclado{
    constructor(sonic){
        this.personagem = sonic
        this.iniciar()
    }

    iniciar(){
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a" ) {
                this.personagem.andar("esquerda");
            } else if (e.key === "ArrowRight"  || e.key.toLowerCase() === "d") {
                this.personagem.andar("direita");
            } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
                this.personagem.pular();
            } else if (e.key.toLowerCase() === "x") {
                this.personagem.transformar();
            }
        });
    }
}