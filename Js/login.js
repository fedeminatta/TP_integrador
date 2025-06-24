const form = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try{
		const response = await fetch('https://dummyjson.com/auth/login',
	   {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
			username,password
			})

	   });
	
	   const data = await response.json();
	   console.log('Repuesta API:', data); //es para Debug

	   if(data.accessToken){
		sessionStorage.setItem('accessToken', data.accessToken);
		sessionStorage.setItem('sesionIniciada', 'true');
		window.location.href = 'salones.html';
	   }else{
		loginError.textContent = 'Usuario o contraseña incorrectos';
		loginError.classList.remove('d.none');
	   }
	}catch (error) {
		console.error('Error:', error);
		loginError.textContent = 'Error al intentar iniciar sesion';
		loginError.classList.remove('d-none');
	}
});
