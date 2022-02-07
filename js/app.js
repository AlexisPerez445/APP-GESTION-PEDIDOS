import Cliente from './Cliente.js';
import Pedido from './Pedido.js';
import Producto from './Producto.js';
import HTML from './html.js';

// SELECTORES HTML
// FORMULARIOS
const formAddProducto = document.querySelector('#addProducto');
const formAddCliente = document.querySelector('#addCliente');
const formAddClientePed = document.querySelector('#addClientePedido');

// CAMPOS
const nombreProducto = document.querySelector('#nombre');
const precioProducto = document.querySelector('#precio');
const tamanyosProducto = document.querySelector('#tamaño');
const imagenProducto = document.querySelector('#imagen');
const descripcionProducto = document.querySelector('#descripcion');

const nombreCliente = document.querySelector('#addCliente #nombre');
const telefonoCliente = document.querySelector('#addCliente #telefono');
const direccionCliente = document.querySelector('#addCliente #direccion');

const buscarCliente = document.querySelector('#buscarNombre');

const nombreClientePed = document.querySelector('#addClientePedido #nombre');
const telefonoClientePed = document.querySelector('#addClientePedido #telefono');
const direccionClientePed = document.querySelector('#addClientePedido #direccion');

// BOTONES
const btnAgregarProducto = document.querySelector('#btn-producto');
const btnAnyadirCliente = document.querySelector('#btn-cliente');
const btnBuscarCliente = document.querySelector('#btn-BuscarCliente');
const btnAnyadirClientePed = document.querySelector('#btn-clientePed');

// LISTENERS
nombreProducto.addEventListener('blur', validarFormulario);
precioProducto.addEventListener('blur', validarFormulario);
imagenProducto.addEventListener('change', obtenerImagen);
descripcionProducto.addEventListener('blur', validarFormulario);

nombreCliente.addEventListener('blur', validarFormulario);
telefonoCliente.addEventListener('blur', validarFormulario);
direccionCliente.addEventListener('blur', validarFormulario);

buscarCliente.addEventListener('blur', validarFormulario);

nombreClientePed.addEventListener('blur', validarFormulario);
telefonoClientePed.addEventListener('blur', validarFormulario);
direccionClientePed.addEventListener('blur', validarFormulario);

// BOTONES
btnAgregarProducto.addEventListener('click', anyadirProducto);
btnAnyadirCliente.addEventListener('click', anyadirCliente);
btnBuscarCliente.addEventListener('click', buscarNombreCliente);
btnAnyadirClientePed.addEventListener('click', anyadirClientePed);

// CÓDIGO DE PRUEBA
let clientes = [];
let productos = [];
let pedidos = [];

let Adrian = new Cliente("Adrian García", "632154658", "calle 123");
clientes.push(Adrian);
let Maria = new Cliente("Maria González", "123456789", "calle 456");
clientes.push(Maria);
let Carlos = new Cliente("Juan Sánchez", "654789321", "calle 789");
clientes.push(Carlos);

// IMAGENES
let rutaPaella = 'http://localhost/Restaurante/img/productos/PaellaValenciana.jpg';
let rutaCocaCola = 'http://localhost/Restaurante/img/productos/CocaColaZero.jpg';
let rutaMargarita = 'http://localhost/Restaurante/img/productos/PizzaMargarita.jpg';
let rutaCheeseburguer = 'http://localhost/Restaurante/img/productos/Cheeseburguer.jpg';

// PRODUCTOS DE MUESTRA
let paella = new Producto("Paella", 10, "Mediano", rutaPaella, "Paella valenciana");
let pizzaMargarita = new Producto("Margarita", 5, "Mediano", rutaMargarita, "Pizza de margarita");
let cocacola = new Producto("Coca cola", 1.50, "Mediano", rutaCocaCola, "Coca cola zero");
let hamburguesa = new Producto("Cheeseburguer", 7, "Grande", rutaCheeseburguer, "Hamburguesa con queso de lonchas");
productos.push(paella);
productos.push(pizzaMargarita);
productos.push(cocacola);
productos.push(hamburguesa);


// CREAR PEDIDOS DE MUESTRA
let pedido1 = new Pedido(Adrian);
pedido1.anyadirProducto(paella);
pedido1.anyadirProducto(pizzaMargarita);
pedidos.push(pedido1);

let pedido2 = new Pedido(Maria);
pedidos.push(pedido2);
pedidos[1].anyadirProducto(pizzaMargarita);
pedidos[1].anyadirProducto(cocacola);


let pedido3 = new Pedido(Maria);
pedido3.anyadirProducto(paella);
pedido3.anyadirProducto(cocacola);
pedidos.push(pedido3);

let pedido4 = new Pedido(Carlos);
pedido4.anyadirProducto(hamburguesa);
pedido4.anyadirProducto(cocacola);
pedidos.push(pedido4);

let pedido5 = new Pedido(Carlos);
pedido5.anyadirProducto(hamburguesa);
pedido5.anyadirProducto(pizzaMargarita);
pedidos.push(pedido5);

// CONTROL DEL MENÚ PRINCIPAL
HTML.menuPrincipal();
HTML.menuPedidos();
// MOSTRAR POR PANTALLA
HTML.mostrarClientes(clientes);
HTML.mostrarProductos(productos);
HTML.mostrarPedidos(pedidos, clientes);
HTML.menuPedidos();


// FUNCIONES
listenerListaPedidos();
function listenerListaPedidos() {
    const clienteBtn = document.querySelectorAll('.cliente-btn');
    clienteBtn.forEach(cliente => {
        cliente.addEventListener('click', ObtenerIdPedido);
    });
}

function ObtenerIdPedido(e) {
    e.preventDefault();
    HTML.limpiarHTMLPedidoCliente();
    let id = this.getAttribute('data-item');
    HTML.mostrarPedidoCliente(pedidos, id);
    HTML.verPedidoClienteMain();
    listenerCancelarPedido();
}

// FUNCION PARA VALIDAR QUE LOS CAMPOS NO ESTÉN VACÍOS
function validarFormulario(e) {
    if (e.target.value != '') {
        console.log('no esta vacio');
    } else {
        console.log('vacio');
    }
}

// FUNCION PARA AÑADIR UN PRODUCTO NUEVO
function anyadirProducto(e) {
    e.preventDefault();
    let imagen = obtenerImagen();
    let producto = new Producto(nombreProducto.value, precioProducto.value, tamanyosProducto.value, imagen, descripcionProducto.value);
    productos.push(producto);
    HTML.mostrarProducto(productos);
    alertify.success('Producto añadido con éxito');
    listenerBorrarPedido();
    nombreProducto.value = "";
    precioProducto.value = "";
    tamanyosProducto.value = "";
    descripcionProducto.value = "";
}

// FUNCION PARA OBTENER LA ID DEL PRODUCTO Y ELIMINARLO
function ObtenerIdProducto(e) {
    e.preventDefault();
    let id = this.getAttribute('data-item');
    HTML.eliminarProducto(id);
    let contador = 0;
    productos.forEach(producto => {
        if (producto.getId() == id) {
            productos.splice(contador, 1);
        }
        contador++;
    });
}
listenerBorrarPedido();
function listenerBorrarPedido() {
    const btnBorrarProducto = document.querySelectorAll('.btnBorrarProducto');
    btnBorrarProducto.forEach(producto => {
        producto.addEventListener('click', ObtenerIdProducto);
    });
}

// FUNCION PARA AÑADIR UN CLIENTE
function anyadirCliente(e) {
    e.preventDefault();
    let cliente = new Cliente(nombreCliente.value, telefonoCliente.value, direccionCliente.value);
    clientes.push(cliente);
    HTML.mostrarCliente(clientes);
    alertify.success('Cliente añadido con éxito');
    listenerEliminarCliente();
    nombreCliente.value = "";
    telefonoCliente.value = "";
    direccionCliente.value = "";
}

// FUNCION PARA AÑADIR UN CLIENTE DESDE PEDIDOS
function anyadirClientePed(e) {
    e.preventDefault();
    let cliente = new Cliente(nombreClientePed.value, telefonoClientePed.value, direccionClientePed.value);
    clientes.push(cliente);
    HTML.mostrarCliente(clientes);
    alertify.success('Cliente añadido con éxito');
    listenerEliminarCliente();
    HTML.verClientesPedido();
    nombreClientePed.value = "";
    telefonoClientePed.value = "";
    direccionClientePed.value = "";
}

// FUNCION PARA OBTENER LA ID DEL CLIENTE Y ELIMINARLO
function ObtenerIdCliente(e) {
    e.preventDefault();
    let id = this.getAttribute('data-item');
    HTML.eliminarCliente(id);
    HTML.eliminarPedido(id);
    let contador = 0;
    clientes.forEach(cliente => {
        if (cliente.getId() == id) {
            clientes.splice(contador, 1);
        }
        contador++;
    });
    for (let i = (pedidos.length) - 1; i >= 0; i--) {
        if (pedidos[i].getId() == id) {
            pedidos.splice(i, 1);
        }
    }
}

listenerEliminarCliente();

function listenerEliminarCliente() {
    const btnEliminarCliente = document.querySelectorAll('.btnBorrarCliente');
    btnEliminarCliente.forEach(cliente => {
        cliente.addEventListener('click', ObtenerIdCliente);
    });
}

// FUNCION PARA BUSCAR A UN CLIENTE POR SU NOMBRE
let btnIniciarPedido;

function buscarNombreCliente(e) {
    e.preventDefault();
    HTML.limpiarHTMLMostrarBuscarCliente();
    let buscar = buscarCliente.value;
    let encontrado = false;
    let error = document.querySelector('p.error');
    let clienteHTML = document.querySelector('.mostrarCliente .cliente');
    clientes.forEach(cliente => {
        let nombre = cliente.getNombre().toUpperCase();
        let telefono = cliente.getTelefono();
        if (nombre.indexOf(buscar.toUpperCase()) != -1 || telefono.indexOf(buscar) != -1) {
            HTML.mostrarBuscarCliente(cliente);
            encontrado = true;
            if (error) {
                error.remove();
            }
        }
    });
    if (!encontrado) {
        if (!error) {
            if (clienteHTML) {
                clienteHTML.remove();
            }
            HTML.noEncontrado();
            buscarCliente.value = "";
        }
    }
    btnIniciarPedido = document.querySelector('.btnSeleccionarCliente');
    btnIniciarPedido.addEventListener('click', crearPedido);
    buscarCliente.value = "";
}


// FUNCION PARA CREAR UN PEDIDO NUEVO
function crearPedido(e) {
    e.preventDefault();
    HTML.limpiarHTMLMostrarProductosPedido();
    let mostrarBuscarCliente = document.querySelector('.mostrarCliente .cliente');
    let idCliente = mostrarBuscarCliente.getAttribute('data-item');
    clientes.forEach(cliente => {
        if (idCliente == cliente.getId()) {
            let pedido = new Pedido(cliente);
            pedidos.push(pedido);
            HTML.mostrarProductosPedido(productos);
            HTML.crearPedidoMain();
        }
    });
    btnSeleccionarProducto = document.querySelectorAll('.productoP');
    btnSeleccionarProducto.forEach(producto => {
        producto.addEventListener('click', anyadirProductoPed);
    });
    HTML.limpiarHTMLPedidos();
    HTML.limpiarHTMLMostrarBuscarCliente();
    HTML.mostrarPedidos(pedidos, clientes);
    listenerListaPedidos();
    listenerFinalizarPedido();
    btnFinalizar.disabled = true;
    btnFinalizar.classList.add('op50');
}

let btnSeleccionarProducto;

// FUNCION PARA FINALIZAR UN PEDIDO
listenerFinalizarPedido();

function finalizarPedido(e) {
    e.preventDefault();
    let id = this.getAttribute('data-item');
    for (let i = (pedidos.length) - 1; i >= 0; i--) {
        if (pedidos[i].getId() == id) {
            pedidos.splice(i, 1);
        }
    }
    alertify.success('Pedido finalizado con éxito');
    HTML.eliminarPedido(id);
}
function listenerFinalizarPedido() {
    const pedidos = document.querySelectorAll('.info-card .finalizar-btn');
    pedidos.forEach(pedido => {
        pedido.addEventListener('click', finalizarPedido);
    });
}

// FUNCION PARA CANCELAR UN PEDIDO
function cancelarPedido(e) {
    e.preventDefault();
    let id = this.getAttribute('data-item');
    let contador = 0;
    pedidos.forEach(pedido => {
        if (pedido.getIdPedido() == id) {
            pedidos.splice(contador, 1);
        }
        contador++;
    });
    HTML.cancelarPedido(id);
    alertify.success('Pedido cancelado con éxito');
}
function listenerCancelarPedido() {
    const pedidos = document.querySelectorAll('.btnCancelarPedido');
    pedidos.forEach(pedido => {
        pedido.addEventListener('click', cancelarPedido);
    });
}

// FUNCION PARA AÑADIR UN PRODUCTO AL PEDIDO
const btnFinalizar = document.querySelector('#btnFinalizarPedido');
btnFinalizar.disabled = true;
btnFinalizar.classList.add('op50');

function anyadirProductoPed(e) {
    e.preventDefault();
    let ultimoPed = pedidos.length - 1;
    let pedido = pedidos[ultimoPed];
    let productoId = this.getAttribute('data-item');
    let productoPed;
    productos.forEach(producto => {
        if (productoId == producto.getId()) {
            productoPed = producto;
        }
    });
    pedido.anyadirProducto(productoPed);
    btnFinalizar.disabled = false;
    btnFinalizar.classList.remove('op50');
}


// FUNCION PARA AÑADIR UNA IMAGEN AL PRODUCTO
function obtenerImagen() {
    // let imagenFinal;
    const imagenURL = imagenProducto.value.toString();
    const nombreImagen = imagenURL.lastIndexOf("\\", imagenURL.length - 1);
    let imagen = imagenURL.substring(nombreImagen + 1, imagenURL.length);
    const rutaImagen = 'http://localhost/Restaurante/img/productos/' + imagen;
    return rutaImagen;
}
