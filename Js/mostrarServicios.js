// mostrarServicios.js

document.addEventListener('DOMContentLoaded', function () {
	mostrarServicios();
});

const serviciosIniciales = [
	{
		id: 'init-1',
		nombre: '🎊 Decoración temática',
		descripcion:
			'Nos encargamos de ambientar el salón con temáticas personalizadas, colores y personajes favoritos.',
		precio: 10000,
		imagenUrl: './img/decoracion.jpg',
	},
	{
		id: 'init-2',
		nombre: '🎭 Animación infantil',
		descripcion:
			'Nos encargamos de entretener a los niños con juegos, música, disfraces y animadores divertidos.',
		precio: 15000,
		imagenUrl: './img/animacion.jpg',
	},
	{
		id: 'init-3',
		nombre: '🍰 Catering para niños',
		descripcion:
			'Nos encargamos de ofrecer un menú ideal para los más chicos, con opciones ricas y variadas.',
		precio: 20000,
		imagenUrl: './img/catering.jpg',
	},
	{
		id: 'init-4',
		nombre: '🏰 Alquiler de inflables',
		descripcion:
			'Nos encargamos de montar inflables seguros y coloridos que garantizan horas de diversión.',
		precio: 18000,
		imagenUrl: './img/inflables.jpeg',
	},
];

const serviciosGuardados = JSON.parse(localStorage.getItem('servicios')) || [];
const todosLosServicios = [...serviciosIniciales, ...serviciosGuardados];

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
