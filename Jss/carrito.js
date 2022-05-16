// Variables
const baseDeDatos = [
  {
    id: 1,
    nombre: "Mate Imperial Uruguayo",
    precio: 5500,
    imagen: "../img/img-carrito/mate imperial uruguayo.jpg",
  },
  {
    id: 2,
    nombre: "Mate Camionero Uruguayo Personalizado",
    precio: 7500,
    imagen: "../img/img-carrito/mate camionero uruguayo.jpg",
  },

  {
    id: 3,
    nombre: "Mochila Matera Lona y Cuero Verde",
    precio: 5000,
    imagen: "../img/img-carrito/mochila materla lona y cuero.jpg",
  },
  {
    id: 4,
    nombre: "Mate Uruguayo Torpedo",
    precio: 6500,
    imagen: "../img/img-carrito/mate uruguayo torpedo.jpg",
  },
  {
    id: 5,
    nombre: "Mate Imperial Acero Inoxidable",
    precio: 4500,
    imagen: "../img/img-carrito/mate imperial acero inoxidable.jpg",
  },
  {
    id: 6,
    nombre: "Mate Imperial Personalizado",
    precio: 7000,
    imagen: "../img/img-carrito/mate imperial personalizado.jpg",
  },
  {
    id: 7,
    nombre: "Mate Camionero Uruguayo Alpaca",
    precio: 6500,
    imagen: "../img/img-carrito/mate uruguayo camionero alpaca.jpg",
  },
  {
    id: 8,
    nombre: "Matera Uruguaya Canasta",
    precio: 4500,
    imagen: "../img/img-carrito/matera uruguaya canasta.jpg",
  },
  {
    id: 9,
    nombre: "Bombillón Alpaca",
    precio: 2500,
    imagen: "../img/img-carrito/bombilla alpaca.jpg",
  },
  {
    id: 10,
    nombre: "Bombilla Pico de Loro",
    precio: 1500,
    imagen: "../img/img-carrito/bombilla pico de loro.jpg",
  },
  {
    id: 11,
    nombre: "Yerba Organica",
    precio: 480,
    imagen: "../img/img-carrito/yerba organica.jpg",
  },
  {
    id: 12,
    nombre: "Termo Acero Inoxidable",
    precio: 8000,
    imagen: "../img/img-carrito/termo acero inoxidable.jpg",
  },
  {
    id: 13,
    nombre: "Mate Imperial Alpaca",
    precio: 14000,
    imagen: "../img/img-carrito/mate imperial alpaca.jpg",
  },
  {
    id: 14,
    nombre: "Mate Imperial Personalizado Acero Inoxidable",
    precio: 6500,
    imagen: "../img/img-carrito/mate imperial acero inoxidable personalizado.jpg",
  },
  {
    id: 15,
    nombre: "Combo Matero con Yerba",
    precio: 7500,
    imagen: "../img/img-carrito/combo mate y yerba.jpg",
  },
];

let carrito = [];
const divisa = "$";
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
  baseDeDatos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-sm-4");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.nombre;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `${info.precio}${divisa}`;
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary");
    miNodoBoton.textContent = "+";
    miNodoBoton.setAttribute("marcador", info.id);
    miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute("marcador"));
  // Actualizamos el carrito
  renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = "";
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
    // Obtenemos el item que necesitamos de la variable base de datos
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
      return itemBaseDatos.id === parseInt(item);
    });
    // Cuenta el número de veces que se repite el producto
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === item ? (total += 1) : total;
    }, 0);
    // Creamos el nodo del item del carrito
    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
    // Boton de borrar
    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = item;
    miBoton.addEventListener("click", borrarItemCarrito);
    // Mezclamos nodos
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  // volvemos a renderizar
  renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  // Recorremos el array del carrito
  return carrito
    .reduce((total, item) => {
      // De cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      // Los sumamos al total
      return total + miItem[0].precio;
    }, 0)
    .toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
  // Limpiamos los productos guardados
  carrito = [];
  // Renderizamos los cambios
  renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener("click", vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();
