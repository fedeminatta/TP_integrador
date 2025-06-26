import { obtenerTodosLosSalones } from './salones.js';
import { obtenerTodosLosServicios } from './servicios.js';

const salones = obtenerTodosLosSalones();
const todosLosServicios = obtenerTodosLosServicios();

document.addEventListener('DOMContentLoaded', function () {
	const selectSalon = document.getElementById('salon');
	const listaServicios = document.getElementById('listaServicios');
	const totalPrecio = document.getElementById('totalPrecio');
	const form = document.getElementById('presupuestoForm');

	let total = 0;

	// Cargar salones en el select
	for (let i = 0; i < salones.length; i++) {
		const salon = salones[i];
		const option = document.createElement('option');
		option.value = salon.precio;
		option.textContent = salon.nombre + ' - $' + salon.precio;
		selectSalon.appendChild(option);
	}

	// Cargar servicios con checkbox
	for (let i = 0; i < todosLosServicios.length; i++) {
		const servicio = todosLosServicios[i];
		const div = document.createElement('div');
		div.className = 'servicio-checkbox';
		div.innerHTML =
			'<label>' +
			'<input type="checkbox" value="' +
			servicio.precio +
			'" data-nombre="' +
			servicio.nombre +
			'" class="servicio-check"> ' +
			servicio.nombre +
			'</label>' +
			'<span>$' +
			servicio.precio +
			'</span>';
		listaServicios.appendChild(div);
	}

	// Calcular total cuando se selecciona algo
	function calcularTotal() {
		let precioSalon = parseFloat(selectSalon.value) || 0;
		let checkboxes = document.querySelectorAll('.servicio-check:checked');

		let precioServicios = 0;
		for (let i = 0; i < checkboxes.length; i++) {
			let precio = parseFloat(checkboxes[i].value);
			precioServicios += precio;
		}

		total = precioSalon + precioServicios;
		totalPrecio.textContent = total;
	}

	selectSalon.addEventListener('change', calcularTotal);
	listaServicios.addEventListener('change', calcularTotal);

	// Al enviar el formulario
	form.addEventListener('submit', function (evento) {
		evento.preventDefault();

		if (!selectSalon.value) {
			alert('Por favor selecciona un salón.');
			return;
		}

		// Buscar el salón seleccionado
		let salonSeleccionado = null;
		for (let i = 0; i < salones.length; i++) {
			if (parseFloat(selectSalon.value) === salones[i].precio) {
				salonSeleccionado = salones[i];
				break;
			}
		}

		// Obtener los servicios seleccionados
		let checkboxes = document.querySelectorAll('.servicio-check:checked');
		let serviciosElegidos = [];

		for (let i = 0; i < checkboxes.length; i++) {
			let nombre = checkboxes[i].getAttribute('data-nombre');
			let precio = parseFloat(checkboxes[i].value);
			serviciosElegidos.push({ nombre: nombre, precio: precio });
		}

		// Crear el presupuesto
		let presupuesto = {
			id: new Date().getTime(),
			salon: {
				nombre: salonSeleccionado ? salonSeleccionado.nombre : 'Desconocido',
				precio: parseFloat(selectSalon.value),
			},
			servicios: serviciosElegidos,
			total: total,
			tel: document.getElementById('tel').value,
			nombre: document.getElementById('nombre').value,
			tematica: document.getElementById('tematica').value,
			fecha: document.getElementById('fecha').value,
			email: document.getElementById('email').value,
			fechaCreacion: new Date().toLocaleString('es-AR'),
		};

		// Guardar en localStorage
		let presupuestosGuardados =
			JSON.parse(localStorage.getItem('presupuestos')) || [];

		presupuestosGuardados.push(presupuesto);

		localStorage.setItem('presupuestos', JSON.stringify(presupuestosGuardados));

		console.log('Presupuesto Guardado en LS: ', presupuesto);

		alert('¡Gracias por reservar! El total estimado es de $' + total);

		// Reiniciar
		form.reset();
		totalPrecio.textContent = '0';
	});
});
