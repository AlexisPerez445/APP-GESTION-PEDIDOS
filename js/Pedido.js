export default class Pedido {

    static count = 0;

    // CONSTRUCTOR
    constructor(cliente) {
        this.fecha = new Date();
        this.productos = [];
        this.cliente = cliente;
        this.id = cliente.id;
        this.idPedido = "id" + ++this.constructor.count;
    }

    // FUNCION PARA AÑADIR UN PRDUCTO
    anyadirProducto(Producto) {
        this.productos.push(Producto);
    }
    // FUNCION PARA ELIMINAR UN PRODCUTO
    eliminarProducto(posicion) {
        this.productos.splice(posicion, 1);
    }
    // FUNCION QUE TE DUELVE EL PRECIO TOTAL DE UN PEDIDO
    precioTotal(productos) {
        let suma = 0;
        productos.forEach(producto => {
            suma += parseFloat(producto.getPrecio());
        });
        return suma;
    }

    // GETTERS
    getCliente() {
        return this.cliente;
    }
    getProductos() {
        return this.productos;
    }
    getId() {
        return this.id;
    }
    getIdPedido() {
        return this.idPedido;
    }
}
