// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Iniciando carga de salones ===');
    
    setTimeout(() => {
        cargarSalonesDinamicos();
    }, 100);
});

function cargarSalonesDinamicos() {
    try {
        console.log('Intentando cargar salones del localStorage...');
        
        if (typeof(Storage) === "undefined") {
            console.error('localStorage no está disponible');
            return;
        }
        
        let salones = [];
        
        try {
            const salonesStorage = localStorage.getItem('salones');
            console.log('Datos RAW en localStorage:', salonesStorage);
            
            if (salonesStorage && salonesStorage !== 'null' && salonesStorage !== 'undefined') {
                salones = JSON.parse(salonesStorage);
                console.log('Salones parseados exitosamente:', salones);
            } else {
                console.log('No hay datos válidos en localStorage');
                return;
            }
        } catch (parseError) {
            console.error('Error al parsear JSON:', parseError);
            console.log('Intentando reparar datos...');
            
            let rawData = localStorage.getItem('salones');
            if (rawData) {
                rawData = rawData.trim();
                try {
                    salones = JSON.parse(rawData);
                } catch (e) {
                    console.error('No se pudo reparar los datos:', e);
                    return;
                }
            }
        }
        
        console.log('Cantidad de salones encontrados:', salones.length);
        
        if (!Array.isArray(salones) || salones.length === 0) {
            console.log('No hay salones válidos para mostrar');
            return;
        }
        
        const container = document.getElementById('salones-container');
        if (!container) {
            console.error('No se encontró el contenedor con id "salones-container"');
            return;
        }
        
        console.log('Contenedor encontrado, agregando salones...');
        
        salones.forEach((salon, index) => {
            console.log(`Procesando salón ${index + 1}:`, salon);
            crearTarjetaSalon(salon, container);
        });
        
        console.log('=== Salones cargados exitosamente ===');
        
    } catch (error) {
        console.error('Error general al cargar salones:', error);
        console.log('Intentando diagnóstico...');
        
        console.log('Keys en localStorage:', Object.keys(localStorage));
        console.log('Valor directo de salones:', localStorage.salones);
    }
}

function crearTarjetaSalon(salon, container) {
    try {
        const salonCol = document.createElement('div');
        salonCol.className = 'col';
        
        let imagenSrc = 'https://via.placeholder.com/300x200/007bff/ffffff?text=Nuevo+Salón';
        if (salon.imagenUrl && salon.imagenUrl.trim() !== '') {
            imagenSrc = salon.imagenUrl.trim();
        }
        
        salonCol.innerHTML = `
            <div class="card h-100 shadow-sm border-primary" style="border-width: 2px;">
                <div class="badge bg-success position-absolute top-0 start-0 m-2">Nuevo</div>
                <img src="${imagenSrc}" 
                     class="card-img-top" 
                     alt="${salon.nombre || 'Salón'}"
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/300x200/007bff/ffffff?text=Nuevo+Salón'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary">${salon.nombre || 'Sin nombre'}</h5>
                    <p class="card-text flex-grow-1">${salon.descripcion || 'Sin descripción disponible'}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <small class="text-muted d-block">
                                    <i class="fas fa-users"></i> ${salon.capacidad || 'N/A'} personas
                                </small>
                                <small class="text-muted d-block">
                                    <i class="fas fa-map-marker-alt"></i> ${salon.ubicacion || 'Sin ubicación'}
                                </small>
                                <strong class="text-success fs-5">${salon.precio || '0'}</strong>
                            </div>
                            <a href="salones.html" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> Ver Detalles
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(salonCol);
        
        console.log(`✅ Tarjeta creada para: ${salon.nombre}`);
        
    } catch (error) {
        console.error('Error al crear tarjeta para salón:', salon, error);
    }
}

function recargarSalones() {
    const container = document.getElementById('salones-container');
    if (container) {
        const tarjetasEstaticas = container.children;
        const estaticas = Array.from(tarjetasEstaticas).slice(0, 3);
        
        container.innerHTML = '';
        estaticas.forEach(tarjeta => container.appendChild(tarjeta));
        
        cargarSalonesDinamicos();
    }
}

window.recargarSalones = recargarSalones;