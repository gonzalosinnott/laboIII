export default class AnuncioBase {
    constructor(id, titulo, transaccion, descripcion, precio){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}