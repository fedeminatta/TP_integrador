import { obtenerTodosLosSalones } from './salones.js';

const contenedorCards = document.getElementById('salones-container');

const salones = obtenerTodosLosSalones();

function renderizarSalones() {
	contenedorCards.innerHTML = '';

	salones.forEach((salon) => {
		const col = document.createElement('div');
		col.className = 'col';

		const esNuevo = !String(salon.id).startsWith('init');

		const badgeHTML = esNuevo
			? '<div class="badge bg-success position-absolute top-0 start-0 m-2">Nuevo</div>'
			: '';

		col.innerHTML = `
	<div class="card h-100 shadow-sm border-primary position-relative" style="border-width: 2px;">
		${badgeHTML}
		<img src="${
			salon.imagenUrl ||
			'https://via.placeholder.com/300x200/007bff/ffffff?text=Salón'
		}"
			 class="card-img-top"
			 alt="${salon.nombre}"
			 style="height: 200px; object-fit: cover;"
			 onerror="this.src='https://via.placeholder.com/300x200/007bff/ffffff?text=Salón'">
		<div class="card-body d-flex flex-column">
			<h5 class="card-title text-primary">${salon.nombre}</h5>
			<p class="card-text flex-grow-1">${salon.descripcion}</p>
			<div class="mt-auto">
				<small class="text-muted d-block">
					<i class="fas fa-users"></i> ${salon.capacidad} personas
				</small>
				<small class="text-muted d-block">
					<i class="fas fa-map-marker-alt"></i> ${salon.ubicacion}
				</small>
				<strong class="text-success fs-5">$${salon.precio}</strong>
				<div class="mt-2 text-end">
					<a href="salones.html" class="btn btn-primary btn-sm">
						<i class="fas fa-eye"></i> Ver Detalles
					</a>
				</div>
			</div>
		</div>
	</div>
`;

		contenedorCards.appendChild(col);
	});
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', renderizarSalones);
