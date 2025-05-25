const form = document.getElementById('loginForm');

const user = 'admin345';
const pass = 'admin123456';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (username === user && password === pass) {
		sessionStorage.setItem('sesionIniciada', 'true');
		window.location.href = 'salones.html';
	} else {
		alert('Nombre o contraseña inválida');
	}
});
