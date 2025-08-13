document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();
    actualizarContador();

    const botonCarrito = document.querySelector(".btn-carrito");
    if (botonCarrito) {
        botonCarrito.addEventListener("click", function () {
            const selectTamano = document.getElementById("tamano");
            const cantidadInput = document.getElementById("cantidad");
            const mensajeError = document.getElementById("mensaje-error");

            if (!selectTamano || !cantidadInput) return;

            const tamanoSeleccionado = selectTamano.value;
            const cantidad = parseInt(cantidadInput.value) || 1;

            if (tamanoSeleccionado === "") {
                if (mensajeError) mensajeError.style.display = "block";
                return;
            }

            if (mensajeError) mensajeError.style.display = "none";

            const imagenProducto = document.querySelector(".producto-imagen img")?.getAttribute("src") || "";

            agregarAlCarrito(
                document.querySelector(".producto-info h1").textContent, 
                12.00, 
                tamanoSeleccionado,
                cantidad,
                imagenProducto
            );
        });
    }
});

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let carritoDiv = document.getElementById("carrito");
    let total = 0;

    if (carritoDiv) {
        carritoDiv.innerHTML = ""; 

        carrito.forEach((producto, index) => {
            let item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:60px; height:60px; object-fit:cover; margin-right:10px;">
                <p>${producto.nombre} (${producto.tamano}) x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button onclick="eliminarDelCarrito(${index})">❌ Eliminar</button>
            `;
            carritoDiv.appendChild(item);
            total += producto.precio * producto.cantidad;
        });

        const totalElem = document.getElementById("total");
        if (totalElem) totalElem.textContent = total.toFixed(2);
    }

    actualizarContador();
}

function agregarAlCarrito(nombre, precio, tamano, cantidad, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio, tamano, cantidad, imagen });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    localStorage.setItem("contadorCarrito", totalProductos);

    let contadorElem = document.getElementById("contador");
    if (contadorElem) {
        contadorElem.textContent = totalProductos;
    }
}
