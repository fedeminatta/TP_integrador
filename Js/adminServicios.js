// Proteger acceso si no hay sesion
if (sessionStorage.getItem('sesionIniciada') !== 'true') {
	alert('Debes iniciar sesión primero');
	window.location.href = 'login.html';
}

// Elementos del DOM
const servicioForm = document.getElementById('servicioForm');
const btnGuardar = document.getElementById('guardarServicio');
const tablaServicios = document.getElementById('tablaServicios');

// Recuperar servicios del LS o array vacío
let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
let servicioEditando = null;

// Renderizar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
	renderizarTabla();
});

// Guardar nuevo servicio o editar existente
btnGuardar.addEventListener('click', () => {
	const nombre = document.getElementById('nombre').value;
	const capacidad = document.getElementById('capacidad').value;
	const descripcion = document.getElementById('descripcion').value;
	const precio = document.getElementById('precio').value;
	const ubicacion = document.getElementById('ubicacion').value;
	const imagenUrl = document.getElementById('imagenUrl').value;

	if (!nombre || !capacidad || !descripcion || !precio || !ubicacion) {
		alert('Todos los campos son obligatorios');
		return;
	}

	if (servicioEditando) {
		const index = servicios.findIndex((s) => s.id === servicioEditando);
		if (index !== -1) {
			servicios[index] = {
				...servicios[index],
				nombre,
				capacidad,
				descripcion,
				precio,
				ubicacion,
				imagenUrl,
			};
		}
		servicioEditando = null;
	} else {
		const nuevoServicio = {
			id: Date.now(),
			nombre,
			capacidad,
			descripcion,
			precio,
			ubicacion,
			imagenUrl,
		};
		servicios.push(nuevoServicio);
	}

	// Solo se guarda los que no son iniciales
	const serviciosParaGuardar = servicios.filter(
		(s) => !String(s.id).startsWith('init')
	);
	localStorage.setItem('servicios', JSON.stringify(serviciosParaGuardar));

	renderizarTabla();
	servicioForm.reset();
	const modal = bootstrap.Modal.getInstance(
		document.getElementById('servicioModal')
	);
	modal.hide();
});

// Renderizar tabla de administración
function renderizarTabla() {
	tablaServicios.innerHTML = '';

	servicios.forEach((servicio, index) => {
		const fila = document.createElement('tr');
		fila.innerHTML = `
			<td>${index + 1}</td>
			<td>${servicio.nombre}</td>
			<td>${servicio.capacidad}</td>
			<td>$${servicio.precio}</td>
			<td>${servicio.ubicacion}</td>
			<td>
				${
					servicio.imagenUrl
						? `<img src="${servicio.imagenUrl}" alt="${servicio.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">`
						: '<span class="text-muted">Sin imagen</span>'
				}
			</td>
			<td>
				<button class="btn btn-primary btn-sm me-2" onclick="editarServicio(${
					servicio.id
				})">Editar</button>
				<button class="btn btn-danger btn-sm" onclick="eliminarServicio(${
					servicio.id
				})">Eliminar</button>
			</td>
		`;
		tablaServicios.appendChild(fila);
	});
}

// Eliminar servicio
window.eliminarServicio = function (id) {
	if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
		servicios = servicios.filter((servicio) => servicio.id !== id);
		localStorage.setItem('servicios', JSON.stringify(servicios));
		renderizarTabla();
	}
};

// Editar servicio
window.editarServicio = function (id) {
	const servicio = servicios.find((s) => s.id === id);
	if (servicio) {
		servicioEditando = id;
		document.getElementById('nombre').value = servicio.nombre;
		document.getElementById('capacidad').value = servicio.capacidad;
		document.getElementById('descripcion').value = servicio.descripcion;
		document.getElementById('precio').value = servicio.precio;
		document.getElementById('ubicacion').value = servicio.ubicacion;
		document.getElementById('imagenUrl').value = servicio.imagenUrl || '';

		const modal = new bootstrap.Modal(document.getElementById('servicioModal'));
		modal.show();
	}
};