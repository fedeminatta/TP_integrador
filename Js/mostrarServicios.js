import { obtenerTodosLosServicios } from './servicios.js';

document.addEventListener('DOMContentLoaded', function () {
	mostrarServicios();
});

const todosLosServicios = obtenerTodosLosServicios();

function mostrarServicios() {
	const contenedor = document.querySelector('.section_servicios');
	if (!contenedor) return;

	contenedor.innerHTML = '';

	todosLosServicios.forEach((servicio) => {
		const esNuevo = !String(servicio.id).startsWith('init');

		const article = document.createElement('article');
		article.className = 'card';

		article.innerHTML = `
			${
				esNuevo
					? '<div class="badge bg-success position-absolute m-2">Nuevo</div>'
					: ''
			}
			<img class="card-img-top" src="${servicio.imagenUrl}" alt="${
			servicio.nombre
		}" onerror="this.src='https://via.placeholder.com/300x200/007bff/ffffff?text=Servicio'">
			<div class="card-body">
				<h5 class="card-title">${servicio.nombre}</h5>
				<p class="card-text">${servicio.descripcion}</p>
				<p class=" fw-bold card-precio">$${servicio.precio}</p>
			</div>
		`;

		contenedor.appendChild(article);
	});
}
