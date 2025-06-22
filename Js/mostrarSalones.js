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

		col.innerHTML = `
			<div class="card h-100">
				<img src="${salon.imagenUrl}" class="card-img-top" alt="${salon.nombre}">
				<div class="card-body">
					<h5 class="card-title">${salon.nombre}</h5>
					<p class="card-text">${salon.descripcion}</p>
					<div class="d-flex justify-content-between align-items-center">
						<small class="text-muted">Capacidad: ${salon.capacidad} personas</small>
						<a href="salones.html" class="btn btn-primary btn-sm">Ver Detalles</a>
					</div>
				</div>
			</div>
		`;

		contenedorCards.appendChild(col);
	});
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', renderizarSalones);
