const contenedorCards = document.getElementById('salones-container');

// Salones iniciales que deben verse siempre
const salonesIniciales = [
	{
		id: 'init-1',
		nombre: 'Salón Elegante',
		capacidad: 150,
		descripcion:
			'Un espacio sofisticado con capacidad para hasta 150 invitados, ideal para eventos formales.',
		precio: 80000,
		ubicacion: 'Centro',
		imagenUrl: 'img/salon1.jpg',
	},
	{
		id: 'init-2',
		nombre: 'Salón Moderno',
		capacidad: 100,
		descripcion:
			'Diseño contemporáneo y flexible, perfecto para fiestas y celebraciones de tamaño mediano.',
		precio: 60000,
		ubicacion: 'Barrio Norte',
		imagenUrl: 'img/salon2.jpg',
	},
	{
		id: 'init-3',
		nombre: 'Salón Jardín',
		capacidad: 80,
		descripcion:
			'Un entorno al aire libre con áreas cubiertas, ideal para eventos durante el día y la noche.',
		precio: 50000,
		ubicacion: 'Zona Sur',
		imagenUrl: 'img/salon3.jpg',
	},
];

// Obtener los salones creados del form
const salonesGuardados = JSON.parse(localStorage.getItem('salones')) || [];

// Unir ambos arrays (primero los iniciales)
const salones = [...salonesIniciales, ...salonesGuardados];

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
