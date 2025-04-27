export default class Colisor {
    verificarColisao(obj1, obj2) {
        const obj1Left = obj1.posicaoX + (obj1.colisaoOffsetX ?? 0);
        const obj1Right = obj1Left + (obj1.colisaoLargura ?? obj1.largura);
        const obj1Top = obj1.posicaoY + (obj1.colisaoOffsetY ?? 0);
        const obj1Bottom = obj1Top + (obj1.colisaoAltura ?? obj1.altura);

        const obj2Left = obj2.posicaoX + (obj2.colisaoOffsetX ?? 0);
        const obj2Right = obj2Left + (obj2.colisaoLargura ?? obj2.largura);
        const obj2Top = obj2.posicaoY + (obj2.colisaoOffsetY ?? 0);
        const obj2Bottom = obj2Top + (obj2.colisaoAltura ?? obj2.altura);

        return (
            obj1Left < obj2Right &&
            obj1Right > obj2Left &&
            obj1Top < obj2Bottom &&
            obj1Bottom > obj2Top
        );
    }
}