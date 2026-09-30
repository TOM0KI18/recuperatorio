const contactos = [];

const form = document.getElementById("form-contacto");
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const listaContactos = document.getElementById("lista-contactos");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contador = document.getElementById("contador");
const buscador = document.getElementById("buscador");

function agregarContacto(e) {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

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

  renderizar(buscador.value);
}

function eliminarContacto(id) {
  const indice = contactos.findIndex((c) => c.id === id);
  if (indice !== -1) {
    contactos.splice(indice, 1);
  }
  renderizar(buscador.value);
}

function renderizar(filtro = "") {
  listaContactos.innerHTML = "";

  const texto = filtro.trim().toLowerCase();

  const filtrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(texto)
  );

  if (contactos.length === 0) {
    mensajeVacio.textContent = "Todavia no agregaste contactos.";
    mensajeVacio.style.display = "block";
  } else if (filtrados.length === 0) {
    mensajeVacio.textContent = "No se encontraron contactos.";
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }

  filtrados.forEach((contacto) => {
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

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarContacto(contacto.id));

    li.appendChild(info);
    li.appendChild(btnEliminar);

    listaContactos.appendChild(li);
  });

  contador.textContent = `Contactos: ${contactos.length}`;
}

function buscar(e) {
  renderizar(e.target.value);
}

form.addEventListener("submit", agregarContacto);
buscador.addEventListener("input", buscar);

renderizar();