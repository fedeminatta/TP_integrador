// verificar que exista la sesion sino mandamos al login al usuario
if (sessionStorage.getItem('sesionIniciada') !== 'true') {
	alert('Debes iniciar sesión primero');
	window.location.href = 'login.html';
}

const salonForm = document.getElementById('salonForm');
const btnGuardar = document.getElementById('guardarSalon');
const tablaSalones = document.getElementById('tablaSalones');

// Obtengo los salones del LS
let salones = JSON.parse(localStorage.getItem('salones')) || [];

// Mostrar salones en la tabla al cargar la página
document.addEventListener('DOMContentLoaded', () => {
	renderizarTabla();
});

btnGuardar.addEventListener('click', () => {
	const nombre = document.getElementById('nombre').value;
	const capacidad = document.getElementById('capacidad').value;
	const descripcion = document.getElementById('descripcion').value;
	const precio = document.getElementById('precio').value;
	const ubicacion = document.getElementById('ubicacion').value;

	const nuevoSalon = {
		id: Date.now(),
		nombre,
		capacidad,
		descripcion,
		precio,
		ubicacion,
	};

	// Agregar a la lista y guardar en LS
	salones.push(nuevoSalon);
	localStorage.setItem('salones', JSON.stringify(salones));
	renderizarTabla();

	salonForm.reset();
	const modal = bootstrap.Modal.getInstance(
		document.getElementById('salonModal')
	);
	modal.hide();
});

// renderizar la tabla
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
				<button class="btn btn-danger btn-sm" onclick="eliminarSalon(${salon.id})">
					Eliminar
				</button>
			</td>
		`;
		tablaSalones.appendChild(fila);
	});
}

// eliminar un salón
window.eliminarSalon = function (id) {
	if (confirm('¿Estás seguro de que deseas eliminar este salón?')) {
		salones = salones.filter((salon) => salon.id !== id);
		localStorage.setItem('salones', JSON.stringify(salones));
		renderizarTabla();
	}
};
