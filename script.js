const contactos = [];

// ===== Referencias al DOM =====
const form = document.getElementById("form-contacto");
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const listaContactos = document.getElementById("lista-contactos");
const mensajeVacio = document.getElementById("mensaje-vacio");

// ===== Agregar contacto =====
function agregarContacto(e) {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  // No permitir contactos vacíos
  if (nombre === "" || telefono === "") {
    return;
  }

  contactos.push({
    id: Date.now(),
    nombre: nombre,
    telefono: telefono,
  });

  inputNombre.value = "";
  inputTelefono.value = "";

  renderizar();
}

function renderizar() {
  listaContactos.innerHTML = "";

  if (contactos.length === 0) {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }

  contactos.forEach((contacto) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.classList.add("info");

    const spanNombre = document.createElement("span");
    spanNombre.classList.add("nombre");
    spanNombre.textContent = contacto.nombre;

    const spanTelefono = document.createElement("span");
    spanTelefono.classList.add("telefono");
    spanTelefono.textContent = contacto.telefono;

    info.appendChild(spanNombre);
    info.appendChild(spanTelefono);

    li.appendChild(info);
    listaContactos.appendChild(li);
  });
}

form.addEventListener("submit", agregarContacto);

renderizar();

// ===== Eliminar contacto =====
function eliminarContacto(id) {
  const indice = contactos.findIndex((c) => c.id === id);
  if (indice !== -1) {
    contactos.splice(indice, 1);
  }
  renderizar();
}
