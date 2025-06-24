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

export function obtenerTodosLosServicios() {
	const guardados = JSON.parse(localStorage.getItem('servicios')) || [];
	return [...serviciosIniciales, ...guardados];
}
