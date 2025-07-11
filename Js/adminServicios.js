import { showloginModal } from "./autenticacion.js";
if (!sessionStorage.getItem('accessToken')) {
	showloginModal(window.location.pathname);
}

const servicioForm = document.getElementById('servicioForm');
const btnGuardar = document.getElementById('guardarServicio');
const tablaServicios = document.getElementById('tablaServicios');

let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
let servicioEditando = null;

document.addEventListener('DOMContentLoaded', () => {
	renderizarTabla();
	renderizarServicios();
});

btnGuardar.addEventListener('click', () => {
	const nombre = document.getElementById('nombre').value;
	const descripcion = document.getElementById('descripcion').value;
	const precio = document.getElementById('precio').value;
	const imagenUrl = document.getElementById('imagenUrl').value;

	if (!nombre || !descripcion || !precio) {
		alert('Todos los campos son obligatorios');
		return;
	}

	if (servicioEditando) {
		const index = servicios.findIndex((s) => s.id === servicioEditando);
		if (index !== -1) {
			servicios[index] = {
				...servicios[index],
				nombre,
				descripcion,
				precio,
				imagenUrl,
			};
		}
		servicioEditando = null;
	} else {
		const nuevoServicio = {
			id: Date.now(),
			nombre,
			descripcion,
			precio,
			imagenUrl,
		};
		servicios.push(nuevoServicio);
	}

	const serviciosParaGuardar = servicios.filter(
		(s) => !String(s.id).startsWith('init')
	);
	localStorage.setItem('servicios', JSON.stringify(serviciosParaGuardar));

	renderizarTabla();
	renderizarServicios();
	servicioForm.reset();
	const modal = bootstrap.Modal.getInstance(
		document.getElementById('servicioModal')
	);
	modal.hide();
});

function renderizarTabla() {
	tablaServicios.innerHTML = '';

	servicios.forEach((servicio, index) => {
		const fila = document.createElement('tr');
		fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${servicio.nombre}</td>
            <td>${servicio.precio}</td>
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

function renderizarServicios() {
	const seccionServicios = document.getElementById('section_servicios');
	if (!seccionServicios) return;

	seccionServicios.innerHTML = '';

	servicios.forEach((servicio) => {
		const cardServicio = document.createElement('div');
		cardServicio.className = 'col-md-4 mb-4';
		cardServicio.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-img-container" style="height: 200px; overflow: hidden;">
                    ${
											servicio.imagenUrl
												? `<img src="${servicio.imagenUrl}" alt="${servicio.nombre}" class="card-img-top" style="width: 100%; height: 100%; object-fit: cover;">`
												: `<div class="bg-light d-flex align-items-center justify-content-center" style="height: 100%;">
                                <span class="text-muted">Sin imagen</span>
                              </div>`
										}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${servicio.nombre}</h5>
                    <p class="card-text">${servicio.descripcion.substring(
											0,
											100
										)}${servicio.descripcion.length > 100 ? '...' : ''}</p>
                    <ul class="list-unstyled">
                        <li><strong>Precio:</strong> ${servicio.precio}</li>
                    </ul>
                </div>
                <div class="card-footer bg-white border-top-0">
                    <button class="btn btn-outline-primary w-100" onclick="verDetalleServicio(${
											servicio.id
										})">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
		seccionServicios.appendChild(cardServicio);
	});
}

window.eliminarServicio = function (id) {
	if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
		servicios = servicios.filter((servicio) => servicio.id !== id);
		localStorage.setItem('servicios', JSON.stringify(servicios));
		renderizarTabla();
		renderizarServicios();
	}
};

window.editarServicio = function (id) {
	const servicio = servicios.find((s) => s.id === id);
	if (servicio) {
		servicioEditando = id;
		document.getElementById('nombre').value = servicio.nombre;
		document.getElementById('descripcion').value = servicio.descripcion;
		document.getElementById('precio').value = servicio.precio;
		document.getElementById('imagenUrl').value = servicio.imagenUrl || '';

		const modal = new bootstrap.Modal(document.getElementById('servicioModal'));
		modal.show();
	}
};

window.verDetalleServicio = function (id) {
	const servicio = servicios.find((s) => s.id === id);
	if (servicio) {
		alert(`Detalles del servicio: ${servicio.nombre}`);
	}
};
