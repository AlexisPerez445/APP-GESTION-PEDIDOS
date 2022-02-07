
// SELECTORES HTML
let zonaClientes = document.querySelector('.listaClientes');
let listaProductos = document.querySelector('.listaProductos')
let listaPedidos = document.querySelector('.listaPedidos');
let listaPedidoCliente = document.querySelector('.listaPedidoCliente');
let mostrarBuscarCliente = document.querySelector('.mostrarCliente');
let mostrarProductosPedido = document.querySelector('.listaProductosP');


// SELECTORES DE PÁGINAS
const frontPage = document.querySelector('#inicio');
const productPage = document.querySelector('#productos');
const pedidosPage = document.querySelector('#pedidos');
const clientesPage = document.querySelector('#clientes');

// BOTONES MENUS
const bntInicio = document.querySelector('.btnInicio');
const btnProducto = document.querySelector('.btnProducto');
const bntPedidos = document.querySelector('.btnPedidos');
const bntClientes = document.querySelector('.btnClientes');

// PÁGINA DE PEDIDOS
const selectPedidos = document.querySelector('.menuPedidos');
const verPedidos = document.querySelector('.verPedidos');
const verPedidoCliente = document.querySelector('.verPedidoCliente');
const selCliente = document.querySelector('.selCliente');
const crearPedido = document.querySelector('.crearPedido');
const clientePedido = document.querySelector('#clientesPedidos');

// BTN PÁGÍNA DE PEDIDOS
const btnVerPedidos = document.querySelector('#btnVerPedidos');
const btnCrearPedido = document.querySelector('#btnCrearPedido');
const btnVolvePedidos = document.querySelector('#btnVolvePedidos');
const btnCrearClientePedido = document.querySelector('#btn-nuevo');
const btnFinalizarPedido = document.querySelector('#btnFinalizarPedido');


export default class HTML {

    // IMPRIMIR PRODUCTOS EN EL HTML
    static mostrarProductos(productos) {
        productos.forEach(producto => {
            let div = document.createElement('div');
            let idProducto = producto.getId();
            div.classList.add('card');
            div.classList.add('producto');
            div.setAttribute('data-item', idProducto);
            div.innerHTML = `
            <div class="info-card">
            <img src="${producto.getImagen()}" class="imagen-curso u-full-width">
                    <h4>${producto.getNombre()}</h4>
                    <p>${producto.getDescripcion()}</p>
                    <p>${producto.getTamanyo()}</p>
                    <p>${producto.getPrecio()}€</p>
                    <div data-item="${producto.getId()}" class="btnBorrarProducto">
                        <a href="#" class="u-full-width button-primary button input ver-pedido" id="btn-borrar" >Eliminar producto</a>
                    </div>
                    <!-- <button id="btn-borrar" class="btnBorrarProducto">Borrar producto</button> -->
                </div>
            `;
            listaProductos.appendChild(div);
        });
    }

    // IMPRIMIR PRODUCTO NUEVO
    static mostrarProducto(productos) {
        let producto = productos.length - 1;
        let idProducto = productos[producto].getId();
        let div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('producto');
        div.setAttribute('data-item', idProducto);
        div.innerHTML = `
                <div class="info-card">
                <img src="${productos[producto].getImagen()}" class="imagen-curso u-full-width">
                    <h4>${productos[producto].getNombre()}</h4>
                    <p>${productos[producto].getDescripcion()}</p>
                    <p>${productos[producto].getTamanyo()}</p>
                    <p>${productos[producto].getPrecio()}€</p>
                    <div data-item="${productos[producto].getId()}" class="btnBorrarProducto">
                        <a href="#" class="u-full-width button-primary button input ver-pedido" id="btn-borrar" >Eliminar producto</a>
                    </div>
                </div>
            `;
        listaProductos.appendChild(div);
    }

    // ELIMINAR PRODUCTO
    static eliminarProducto(id) {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            if (producto.getAttribute('data-item') == id) {
                producto.remove();
            }
        });
        alertify.success('Producto eliminado con éxito');
    }


    // IMPRIMIR PEDIDOS EN EL HTML
    static mostrarPedidos(pedidos, clientes) {
        let vectorId = HTML.vectorClientes(pedidos);

        for (let i = 0; i < vectorId.length; i++) {
            let id1;
            clientes.forEach(cliente => {
                let nombreCliente = cliente.getNombre();
                let direccionCliente = cliente.getDireccion();
                let numeroCliente = cliente.getTelefono();
                id1 = cliente.getId();
                if (id1 == vectorId[i]) {
                    let div = document.createElement('div');
                    div.classList.add('card');
                    div.setAttribute('data-item', id1);
                    div.innerHTML = `
                        <div class="info-card">
                            <h4>${nombreCliente}</h4>
                            <p>${numeroCliente}</p>
                            <p>${direccionCliente}</p>
                            <div data-item="${cliente.getId()}" class="cliente-btn">
                            <a href="#" class="u-full-width button-primary button input ver-pedido">Ver pedidos</a>
                            </div>
                            <div data-item="${cliente.getId()}" class="finalizar-btn">
                            <a href="#" class="u-full-width button-primary button input ver-pedido">Finalizar pedido</a>
                            </div>
                        </div>
                    `;
                    listaPedidos.appendChild(div);
                }
            });
        }
    }

    // MUESTRA LOS PEDIDOS QUE HA HECHO ESE CLIENTE
    static mostrarPedidoCliente(pedidos, id) {
        pedidos.forEach(pedido => {
            let productos = pedido.getProductos();
            let idPedido = pedido.getId();
            let idCancelar = pedido.getIdPedido();
            let precioTotal = pedido.precioTotal(pedido.getProductos());
            if (idPedido == id) {
                let div0 = document.createElement('div');
                div0.classList.add('card');
                div0.classList.add('cancelar');
                div0.setAttribute('data-item', idCancelar);
                productos.forEach(producto => {
                    if (idPedido == id) {
                        let nombreProducto = producto.getNombre();
                        let descripcionProducto = producto.getDescripcion();
                        let precioProducto = producto.getPrecio();
                        let div1 = document.createElement('div');
                        div1.innerHTML = `
                    <div class="info-card" style="border-bottom: 2px solid #A72523;max-width: 70%;margin: 0 auto;">
                        <h4 style="text-transform: uppercase;">${nombreProducto}</h4>
                        <p>${descripcionProducto}</p>
                        <p>${precioProducto}€</p>
                    </div>
                `;
                        div0.appendChild(div1);
                    }
                });
                let precio = document.createElement('div');
                precio.innerHTML = `
                <p class="text-center" style="font-weight: bold;text-transform: uppercase;margin-top: 10px;margin-bottom: 10px;">Precio final: ${precioTotal}€</p>
                <div data-item="${idCancelar}" class="btnCancelarPedido" style="max-width: 70%;margin: 0 auto;">
                    <a href="#" class="u-full-width button-primary button input ver-pedido">Cancelar pedido</a>
                </div>
                `;
                div0.appendChild(precio);
                listaPedidoCliente.appendChild(div0);
            }
        });
    }

    // ELIMINAR PEDIDO
    static eliminarPedido(id) {
        const pedidos = document.querySelectorAll('.listaPedidos .card');
        pedidos.forEach(pedido => {
            if (pedido.getAttribute('data-item') == id) {
                pedido.remove();
            }
        });
    }

    // CANCELAR PEDIDO CLIENTE
    static cancelarPedido(id){
        const pedidos = document.querySelectorAll('.cancelar');
        pedidos.forEach(pedido => {
            if (pedido.getAttribute('data-item') == id) {
                pedido.remove();
            }
        });
    }


    // IMPRIMIR CLIENTES EN EL HTML
    static mostrarClientes(clientes) {
        clientes.forEach(cliente => {
            let idCliente = cliente.getId();
            let div = document.createElement('div');
            div.classList.add('card');
            div.classList.add('cliente');
            div.setAttribute('data-item', idCliente);
            div.innerHTML = `
            <div class="info-card">
                <h4>${cliente.getNombre()}</h4>
                <p>${cliente.getTelefono()}</p>
                <p>${cliente.getDireccion()}</p>
                <div data-item="${cliente.getId()}" class="btnBorrarCliente">
                    <a href="#" class="u-full-width button-primary button input ver-pedido">Eliminar</a>
                </div>
            </div>
            `;
            zonaClientes.appendChild(div);
        });
    }

    // IMPRIMIR CLIENTE NUEVO
    static mostrarCliente(clientes) {
        let ultimoCliente = clientes.length - 1;
        let cliente = clientes[ultimoCliente];
        let idCliente = cliente.getId();
        let div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('cliente');
        div.setAttribute('data-item', idCliente);
        div.innerHTML = `
                <div class="info-card">
                    <h4>${cliente.getNombre()}</h4>
                    <p>${cliente.getTelefono()}</p>
                    <p>${cliente.getDireccion()}</p>
                    <div data-item="${cliente.getId()}" class="btnBorrarCliente">
                        <a href="#" class="u-full-width button-primary button input ver-pedido">Eliminar</a>
                    </div>
                </div>
            `;
        zonaClientes.appendChild(div);
    }

    //ELIMINAR CLIENTE
    static eliminarCliente(id) {
        const clientes = document.querySelectorAll('.cliente');
        clientes.forEach(cliente => {
            if (cliente.getAttribute('data-item') == id) {
                cliente.remove();
            }
        });
        alertify.success('Cliente eliminado con éxito');
    }

    // DEVUELVE EL VECTOR DE LOS CLIENTES QUE HAN HECHO UN PEDIDO
    static vectorClientes(pedidos) {
        let vectorId = [];

        pedidos.forEach(pedido => {
            let id = pedido.getCliente().getId();
            vectorId.push(id);
        });

        let almacenId = [];
        const tempArray = vectorId.sort();

        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i + 1] != tempArray[i]) {
                almacenId.push(tempArray[i]);
            }
        }
        return almacenId;
    }

    // IMPRIMIR EL CLIENTE DE LA BÚSQUEDA POR NOMBRE
    static mostrarBuscarCliente(cliente) {
        let idCliente = cliente.getId();
        let div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('cliente');
        div.setAttribute('data-item', idCliente);
        div.innerHTML = `
                <div class="info-card">
                    <h4>${cliente.getNombre()}</h4>
                    <p>${cliente.getTelefono()}</p>
                    <p>${cliente.getDireccion()}</p>
                    <div data-item="${cliente.getId()}" class="btnSeleccionarCliente">
                        <a href="#" class="u-full-width button-primary button input ver-pedido">Seleccionar</a>
                    </div>
                </div>
            `;
        mostrarBuscarCliente.appendChild(div);
    }


    // IMPRIMIR PRODUCTOS PARA AÑADIR A UN PEDIDO
    static mostrarProductosPedido(productos) {
        productos.forEach(producto => {
            let div = document.createElement('div');
            let idProducto = producto.getId();
            div.classList.add('card');
            div.setAttribute('data-item', idProducto);
            div.innerHTML = `
            <div class="info-card">
            <img src="${producto.getImagen()}" class="imagen-curso u-full-width">
                    <h4>${producto.getNombre()}</h4>
                    <p>${producto.getDescripcion()}</p>
                    <p>${producto.getTamanyo()}</p>
                    <p>${producto.getPrecio()}€</p>
                    <div data-item="${producto.getId()}" class="btnAnyadirProducto productoP">
                        <a href="#" class="u-full-width button-primary button input ver-pedido"> Añadir </a>
                    </div>
            </div>
            `;
            mostrarProductosPedido.appendChild(div);
        });
    }

    // FUNCION DE MENSAJE CLIENTE NO ENCONTRADO
    static noEncontrado() {
        let div = document.createElement('p');
        div.classList.add('text-center');
        div.classList.add('texto-blanco');
        div.classList.add('error');
        div.innerHTML = `
        No se han encontrado resultados
        `;
        mostrarBuscarCliente.appendChild(div);
    }
    static menuPrincipal() {
        bntInicio.addEventListener('click', mostrarFrontPage);
        btnProducto.addEventListener('click', mostrarProductoPage);
        bntPedidos.addEventListener('click', mostrarPedidosPage);
        bntClientes.addEventListener('click', mostrarClientesPage);
    }
    static menuPedidos() {
        btnVerPedidos.addEventListener('click', mostrarPedidosClientePage);
        btnCrearPedido.addEventListener('click', mostrarCrearPedidos);
        btnVolvePedidos.addEventListener('click', pedidosInicio);
        btnFinalizarPedido.addEventListener('click', pedidosInicio);
        btnCrearClientePedido.addEventListener('click', mostrarCrearClientePedidos);
    }
    static crearPedidoMain() {
        mostrarAnyadirProductos();
    }
    static verPedidoClienteMain() {
        mostrarVerPedidoCliente();
    }
    static verClientesPedido() {
        mostrarCrearPedidos();
    }


    // FUNCIONES PARA LIMPIAR EL HTML
    static limpiarHTMLPedidoCliente() {
        /*FORMA LENTA
        contenedorCarrito.innerHTML = '';*/
        while (listaPedidoCliente.firstChild) {
            listaPedidoCliente.removeChild(listaPedidoCliente.firstChild)
        }
    }

    static limpiarHTMLMostrarProductosPedido() {
        /*FORMA LENTA
        contenedorCarrito.innerHTML = '';*/
        while (mostrarProductosPedido.firstChild) {
            mostrarProductosPedido.removeChild(mostrarProductosPedido.firstChild)
        }
    }

    static limpiarHTMLMostrarBuscarCliente() {
        /*FORMA LENTA
        contenedorCarrito.innerHTML = '';*/
        while (mostrarBuscarCliente.firstChild) {
            mostrarBuscarCliente.removeChild(mostrarBuscarCliente.firstChild)
        }
    }

    static limpiarHTMLPedidos() {
        /*FORMA LENTA
        contenedorCarrito.innerHTML = '';*/
        while (listaPedidos.firstChild) {
            listaPedidos.removeChild(listaPedidos.firstChild)
        }
    }


}


// CONTROLAR EL MENÚ PRINCIPAL
function mostrarProductoPage(e) {
    e.preventDefault();
    frontPage.classList.add('displayn');
    pedidosPage.classList.add('displayn');
    clientesPage.classList.add('displayn');
    productPage.classList.remove('displayn');
}
function mostrarFrontPage(e) {
    e.preventDefault();
    frontPage.classList.remove('displayn');
    pedidosPage.classList.add('displayn');
    clientesPage.classList.add('displayn');
    productPage.classList.add('displayn');
}
function mostrarPedidosPage(e) {
    e.preventDefault();
    pedidosInicio();
    frontPage.classList.add('displayn');
    pedidosPage.classList.remove('displayn');
    clientesPage.classList.add('displayn');
    productPage.classList.add('displayn');
}
function mostrarClientesPage(e) {
    e.preventDefault();
    frontPage.classList.add('displayn');
    pedidosPage.classList.add('displayn');
    clientesPage.classList.remove('displayn');
    productPage.classList.add('displayn');
}

// function menuPedidos(){
//     btnVerPedidos.addEventListener('click', mostrarPedidosPage);
//     btnCrearPedido.addEventListener('click', CrearPedidos);
//     btnVolvePedidos.addEventListener('click', VolverPedidos);
// }

// MENU DE PEDIDOS
function pedidosInicio() {
    selectPedidos.classList.remove('displayn');
    verPedidos.classList.add('displayn');
    verPedidoCliente.classList.add('displayn')
    selCliente.classList.add('displayn')
    crearPedido.classList.add('displayn')
    clientePedido.classList.add('displayn')
}

// MUESTRA LA LISTA DE CLIENTES CON PEDIDOS
function mostrarPedidosClientePage(e) {
    e.preventDefault();
    selectPedidos.classList.add('displayn');
    verPedidos.classList.remove('displayn');
    verPedidoCliente.classList.add('displayn')
    selCliente.classList.add('displayn')
    crearPedido.classList.add('displayn')
    clientePedido.classList.add('displayn')
}

// MUESTRA LOS PEDIDOS DE UN CLIENTE
function mostrarVerPedidoCliente() {
    selectPedidos.classList.add('displayn');
    verPedidos.classList.add('displayn');
    verPedidoCliente.classList.remove('displayn')
    selCliente.classList.add('displayn')
    crearPedido.classList.add('displayn')
    clientePedido.classList.add('displayn')
}
// MUESTRA SELECCIONAR CLIENTE PARA PEDIDO
function mostrarCrearPedidos() {
    selectPedidos.classList.add('displayn');
    verPedidos.classList.add('displayn');
    verPedidoCliente.classList.add('displayn')
    selCliente.classList.remove('displayn')
    crearPedido.classList.add('displayn')
    clientePedido.classList.add('displayn')
}
// 
function mostrarAnyadirProductos() {
    selectPedidos.classList.add('displayn');
    verPedidos.classList.add('displayn');
    verPedidoCliente.classList.add('displayn')
    selCliente.classList.add('displayn')
    crearPedido.classList.remove('displayn')
    clientePedido.classList.add('displayn')
}
// 
function mostrarCrearClientePedidos() {
    selectPedidos.classList.add('displayn');
    verPedidos.classList.add('displayn');
    verPedidoCliente.classList.add('displayn')
    selCliente.classList.add('displayn')
    crearPedido.classList.add('displayn')
    clientePedido.classList.remove('displayn')
}


