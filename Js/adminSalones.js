// Proteger acceso si no hay sesion
if (!sessionStorage.getItem('accessToken')) {
	alert('Debes iniciarr sesión primero');
	window.location.href = 'login.html';
}

// Elementos del DOM
const salonForm = document.getElementById('salonForm');
const btnGuardar = document.getElementById('guardarSalon');
const tablaSalones = document.getElementById('tablaSalones');

// Recuperar salones del LS o array vacío
let salones = JSON.parse(localStorage.getItem('salones')) || [];
let salonEditando = null;

// Renderizar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
	renderizarTabla();
});

// Guardar nuevo salon o editar existente
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

	if (salonEditando) {
		const index = salones.findIndex((s) => s.id === salonEditando);
		if (index !== -1) {
			salones[index] = {
				...salones[index],
				nombre,
				capacidad,
				descripcion,
				precio,
				ubicacion,
				imagenUrl,
			};
		}
		salonEditando = null;
	} else {
		const nuevoSalon = {
			id: Date.now(),
			nombre,
			capacidad,
			descripcion,
			precio,
			ubicacion,
			imagenUrl,
		};
		salones.push(nuevoSalon);
	}

	// Solo se guarda los que no son iniciales
	const salonesParaGuardar = salones.filter(
		(s) => !String(s.id).startsWith('init')
	);
	localStorage.setItem('salones', JSON.stringify(salonesParaGuardar));

	renderizarTabla();
	salonForm.reset();
	const modal = bootstrap.Modal.getInstance(
		document.getElementById('salonModal')
	);
	modal.hide();
});

// Renderizar tabla de administración
function renderizarTabla() {
	tablaSalones.innerHTML = '';

	salones.forEach((salon, index) => {
		const fila = document.createElement('tr');
		fila.innerHTML = `
			<td>${index + 1}</td>
			<td>${salon.nombre}</td>
			<td>${salon.capacidad}</td>
			<td>$${salon.precio}</td>
			<td>${salon.ubicacion}</td>
			<td>
				${
					salon.imagenUrl
						? `<img src="${salon.imagenUrl}" alt="${salon.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">`
						: '<span class="text-muted">Sin imagen</span>'
				}
			</td>
			<td>
				<button class="btn btn-primary btn-sm me-2" onclick="editarSalon(${
					salon.id
				})">Editar</button>
				<button class="btn btn-danger btn-sm" onclick="eliminarSalon(${
					salon.id
				})">Eliminar</button>
			</td>
		`;
		tablaSalones.appendChild(fila);
	});
}

// Eliminar salón
window.eliminarSalon = function (id) {
	if (confirm('¿Estás seguro de que deseas eliminar este salón?')) {
		salones = salones.filter((salon) => salon.id !== id);
		localStorage.setItem('salones', JSON.stringify(salones));
		renderizarTabla();
	}
};

// Editar salón
window.editarSalon = function (id) {
	const salon = salones.find((s) => s.id === id);
	if (salon) {
		salonEditando = id;
		document.getElementById('nombre').value = salon.nombre;
		document.getElementById('capacidad').value = salon.capacidad;
		document.getElementById('descripcion').value = salon.descripcion;
		document.getElementById('precio').value = salon.precio;
		document.getElementById('ubicacion').value = salon.ubicacion;
		document.getElementById('imagenUrl').value = salon.imagenUrl || '';

		const modal = new bootstrap.Modal(document.getElementById('salonModal'));
		modal.show();
	}
};
