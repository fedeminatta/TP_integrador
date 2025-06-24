const salonesIniciales = [
	{
		id: 'init-1',
		nombre: 'Salón Estación Arcoíris',
		capacidad: 150,
		descripcion:
			'Un espacio lleno de color y energía, ideal para fiestas temáticas. Su ambientación simula una estación de tren mágica, con vagones decorativos y luces de feria que encantan a los más chicos. Perfecto para cumpleaños o eventos con shows interactivos.',
		precio: 80000,
		ubicacion: 'Centro',
		imagenUrl: 'img/salon1.jpg',
	},
	{
		id: 'init-2',
		nombre: 'Salón La Casita del Bosque',
		capacidad: 100,
		descripcion:
			'Ubicado en una zona arbolada, este salón ofrece un ambiente rústico y acogedor con techos de madera, guirnaldas de luces cálidas y una mini cabaña de juegos para los niños. Es ideal para celebraciones íntimas con un toque natural y familiar.',
		precio: 60000,
		ubicacion: 'Barrio Norte',
		imagenUrl: 'img/salon2.jpg',
	},
	{
		id: 'init-3',
		nombre: 'Salón Castillo de Luna',
		capacidad: 80,
		descripcion:
			'Inspirado en cuentos de hadas, este salón temático tiene murales de castillos, una entrada con arco real y sectores decorados con luces y cortinas brillantes. Pensado para quienes quieren vivir una experiencia mágica, con espacio para animaciones y pista de baile.',
		precio: 50000,
		ubicacion: 'Zona Sur',
		imagenUrl: 'img/salon3.jpg',
	},
];

export function obtenerTodosLosSalones() {
	const guardados = JSON.parse(localStorage.getItem('salones')) || [];
	return [...salonesIniciales, ...guardados];
}
