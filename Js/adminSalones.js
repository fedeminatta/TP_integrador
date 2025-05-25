// verificar que exista la sesion sino mandamos al login al usuario
if (sessionStorage.getItem('sesionIniciada') !== 'true') {
	alert('Debes iniciar sesión primero');
	window.location.href = 'login.html';
}
