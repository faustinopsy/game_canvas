import Sonic from './componentes/Sonic.js';

const canvas = document.querySelector("#canva");
const sonic = new Sonic(canvas);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        sonic.andar("esquerda");
    } else if (e.key === "ArrowRight") {
        sonic.andar("direita");
    } else if (e.key === "ArrowUp") {
        sonic.pular();
    } else if (e.key === " ") {
        sonic.transformar();
    }
});
