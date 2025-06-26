import { showloginModal } from "./autenticacion.js";
if (!sessionStorage.getItem('accessToken')) {
  showloginModal(window.location.pathname);
}

fetch('https://dummyjson.com/users')
  .then(response => response.json())
  .then(data => {
    console.log('API data:', data); 

    const usuarios = data.users;
    const tabla = document.getElementById('tabla-usuarios');

    usuarios.forEach(u => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${u.id}</td>
        <td>${u.firstName} ${u.lastName}</td>
        <td>${u.email}</td>
      `;
      tabla.appendChild(fila);
    });
  })
  .catch(err => console.error('Error:', err));
