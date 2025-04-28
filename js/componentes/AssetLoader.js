export default class AssetLoader {
    constructor() {
        this.imagensParaCarregar = [];
        this.imagensCarregadas = new Map();
        this.totalAssets = 0;
        this.assetsCarregadosCount = 0;
        this.erroCarregamento = false;
        this.onProgress = null;
        this.onComplete = null;
        this.onError = null;
    }

    adicionarImagem(chave, src) {
        this.imagensParaCarregar.push({ chave, src });
    }

    iniciarCarregamento(onProgress, onComplete, onError) {
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        this.onError = onError;
        this.totalAssets = this.imagensParaCarregar.length;
        this.assetsCarregadosCount = 0;
        this.erroCarregamento = false;
        this.imagensCarregadas.clear(); 

        if (this.totalAssets === 0) {
            console.warn("AssetLoader: Nenhuma imagem para carregar.");
            if (this.onComplete) this.onComplete(this.imagensCarregadas);
            return;
        }
        console.log(`AssetLoader: Iniciando carregamento de ${this.totalAssets} assets.`);
        this.imagensParaCarregar.forEach(({ chave, src }) => {
            const img = new Image();
            img.onload = () => {
                if (this.erroCarregamento) return;
                console.log(`AssetLoader: Imagem carregada - ${src}`);
                this.assetsCarregadosCount++;
                this.imagensCarregadas.set(chave, img);
                if (this.onProgress) {
                    this.onProgress(this.assetsCarregadosCount, this.totalAssets);
                }
                if (this.assetsCarregadosCount === this.totalAssets) {
                    console.log("AssetLoader: Carregamento completo.");
                    if (this.onComplete) this.onComplete(this.imagensCarregadas);
                }
            };

            img.onerror = (evento) => {
                console.error(`AssetLoader: Erro ao carregar ${src}`, evento);
                this.erroCarregamento = true;
                if (this.onError) {
                    this.onError(src);
                }
            };
             if (img.complete && img.naturalWidth !== 0) {
                  console.log(`AssetLoader: Imagem já em cache - ${src}`);
                  img.onload(); 
             } else {
                 img.src = src;
             }
        });
    }

    getImagem(chave) {
        return this.imagensCarregadas.get(chave);
    }
}