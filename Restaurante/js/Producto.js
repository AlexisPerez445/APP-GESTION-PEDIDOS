export default class Producto{

    static count = 0;

    // CONSTRUCTOR
    constructor(nombre, precio, tamanyo, imagen, descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.tamanyo = tamanyo;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.id = "id" + ++this.constructor.count;
    }

    // GETTERS
    getNombre(){
        return this.nombre;
    }
    getPrecio(){
        return this.precio;
    }
    getTamanyo(){
        return this.tamanyo;
    }
    getImagen(){
        return this.imagen;
    }
    getDescripcion(){
        return this.descripcion;
    }
    getId(){
        return this.id;
    }

    // SETTERS
    setNombre(nombre){
        this.nombre = nombre;
    }
    setPrecio(precio){
        this.precio = precio;
    }
    setTamanyo(tamanyo){
        this.tamanyo = tamanyo;
    }
    setImagen(imagen){
        this.imagen = imagen;
    }
    setDescripcion(descripcion){
        this.descripcion= descripcion;
    }
}
