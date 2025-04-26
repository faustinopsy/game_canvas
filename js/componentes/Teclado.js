export default class Teclado {
    constructor(sonic) {
        this.personagem = sonic;
        this.iniciar();
        this.verificarDispositivo();
    }

    iniciar() {
        this.criarControle();
        document.addEventListener("keydown", (e) => {
            this.controleTeclado(e.key);
        });
        document.addEventListener("keyup", (e) => {
            this.controleTeclado('x');
        });
       document.addEventListener("resize", this.verificarDispositivo)
    }

    controleTeclado(tecla) {
        if (tecla === "ArrowLeft" || tecla.toLowerCase() === "a") {
            this.personagem.andar("esquerda");
        } else if (tecla === "ArrowRight" || tecla.toLowerCase() === "d") {
            this.personagem.andar("direita");
        } else if (tecla === "ArrowUp" || tecla.toLowerCase() === "w") {
            this.personagem.pular();
        } else if (tecla.toLowerCase() === "x") {
            this.personagem.parar();
        }
    }

    verificarDispositivo() {
        const controlesMobile = document.getElementById("mobile-controls");

        if (window.innerWidth < 600 || /Mobi|Android/i.test(navigator.userAgent)) {
            controlesMobile.style.display = "flex";
            this.iniciarControlesMobile();
        } else {
            controlesMobile.style.display = "none";
        }
    }

    iniciarControlesMobile() {
        const btn_cima = document.getElementById("up-button");
        const btn_tras = document.getElementById("left-button");
        const btn_frente = document.getElementById("right-button");
        const btn_baixo = document.getElementById("down-button");
    
        const impedirZoom = (event) => {
            event.preventDefault();
        };
    
        btn_cima.addEventListener("touchstart", impedirZoom, { passive: false });
        btn_tras.addEventListener("touchstart", impedirZoom, { passive: false });
        btn_frente.addEventListener("touchstart", impedirZoom, { passive: false });
        btn_baixo.addEventListener("touchstart", impedirZoom, { passive: false });
    
        btn_cima.addEventListener("click", () => {
            this.personagem.pular();
        });
    
        btn_tras.addEventListener("click", () => {
            this.personagem.andar("esquerda");
        });
    
        btn_frente.addEventListener("click", () => {
            this.personagem.andar("direita");
        });
    
        btn_baixo.addEventListener("click", () => {
            this.personagem.transformar();
        });
    }

    criarControle(){
        document.getElementById("mobile-controls").innerHTML = `
            <div>
                <button id="up-button" aria-label="botão cima"></button>
            </div>
            <div style="display: flex;">
                <button id="left-button" aria-label="botão esquerda"></button>
                <button id="comprar" disabled aria-label="botão comprar vida"></button>
                <button id="right-button" aria-label="botão direita"></button>
            </div>
            <div>
                 <button id="down-button" aria-label="botão baixo"></button>
            </div>`
    }
    
}
