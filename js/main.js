import Sonic from './componentes/Sonic.js';
import Teclado from './componentes/Teclado.js';
const canvas = document.querySelector("#canva");
const sonic = new Sonic(canvas);
const teclado = new Teclado(sonic)

