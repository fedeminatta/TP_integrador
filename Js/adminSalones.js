if (sessionStorage.getItem('sesionIniciada') !== 'true') {
	alert('Debes iniciar sesión primero');
	window.location.href = 'login.html';
}

const salonForm = document.getElementById('salonForm');
const btnGuardar = document.getElementById('guardarSalon');
const tablaSalones = document.getElementById('tablaSalones');

let salones = JSON.parse(localStorage.getItem('salones')) || [];

document.addEventListener('DOMContentLoaded', () => {
	renderizarTabla();
});
btnGuardar.addEventListener('click', () => {
	const nombre = document.getElementById('nombre').value;
	const capacidad = document.getElementById('capacidad').value;
	const descripcion = document.getElementById('descripcion').value;
	const precio = document.getElementById('precio').value;
	const ubicacion = document.getElementById('ubicacion').value;
	const imagenUrl = document.getElementById('imagenUrl').value;

	if (salonEditando) {
        const index = salones.findIndex(s => s.id === salonEditando);
        if (index !== -1) {
            salones[index] = {
                ...salones[index],
                nombre, capacidad, descripcion, precio, ubicacion, imagenUrl
            };
        }
        salonEditando = null;
    } else {
        const nuevoSalon = {
            id: Date.now(),
            nombre, capacidad, descripcion, precio, ubicacion, imagenUrl
        };
        salones.push(nuevoSalon);
    }
    localStorage.setItem('salones', JSON.stringify(salones));
    renderizarTabla();
    salonForm.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('salonModal'));
    modal.hide();
});

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
				${salon.imagenUrl ? 
					`<img src="${salon.imagenUrl}" alt="${salon.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">` : 
					'<span class="text-muted">Sin imagen</span>'
				}
			</td>
			<td>
				<button class="btn btn-primary btn-sm me-2" onclick="editarSalon(${salon.id})">
                    Editar
                </button>

				<button class="btn btn-danger btn-sm" onclick="eliminarSalon(${salon.id})">
					Eliminar
				</button>
			</td>
		`;
		tablaSalones.appendChild(fila);
	});
}
window.eliminarSalon = function (id) {
	if (confirm('¿Estás seguro de que deseas eliminar este salón?')) {
		salones = salones.filter((salon) => salon.id !== id);
		localStorage.setItem('salones', JSON.stringify(salones));
		renderizarTabla();
	}
};

window.editarSalon = function(id) {
    const salon = salones.find(s => s.id === id);
    if (salon) {
        salonEditando = id;
        document.getElementById('nombre').value = salon.nombre;
        document.getElementById('capacidad').value = salon.capacidad;
        document.getElementById('descripcion').value = salon.descripcion;
        document.getElementById('precio').value = salon.precio;
        document.getElementById('ubicacion').value = salon.ubicacion;
        document.getElementById('imagenUrl').value = salon.imagenUrl || '';

        const modal = new bootstrap.Modal(document.getElementById('salonModal'));
        modal.show();
    }
};