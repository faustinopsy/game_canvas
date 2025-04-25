import Personagem from './componentes/Personagem.js';
import Teclado from './componentes/Teclado.js';
const canvas = document.querySelector("#canva");
const personagem = new Personagem(canvas);
const teclado = new Teclado(personagem)

