import AnuncioBase from "./anuncio-base.js";

///MODIFICAR DE ACUERDO AL TIPO DE ANUNCIO QUE SE PIDA
export class Anuncio extends AnuncioBase {
    constructor(id, titulo, transaccion, descripcion, precio, num_banos, num_autos, num_dormitorios){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_banos = num_banos;
        this.num_autos = num_autos;
        this.num_dormitorios = num_dormitorios;
    }
}