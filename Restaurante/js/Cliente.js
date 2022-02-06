export default class Cliente{

    static count = 0;

    // CONSTRUCTOR
    constructor( nombre, telefono, direccion ){
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
        this.pedidos = [];
        this.id = "id" + ++this.constructor.count;
    }
    
    // GETTERS
    getNombre(){
        return this.nombre;
    }
    getTelefono(){
        return this.telefono;
    }
    getDireccion(){
        return this.direccion;
    }
    getId(){
        return this.id;
    }

    // SETTERS
    setNombre(nombre){
        this.nombre = nombre;
    }
    setTelefono(telefono){
        this.telefono = telefono;
    }
    setDireccion(direccion){
        this.direccion = direccion;
    }

    // FUNCION DE CREAR UN PEDIDO
    crearPedido(Pedido){
        this.pedidos.push(Pedido);
    }
}
