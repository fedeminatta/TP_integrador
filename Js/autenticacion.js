export async function showloginModal(returnUrl) {
    try{
        const response = await fetch('./componentes/loginModal.html');
        const modalHtml = await response.text();
        
        if(!document.getElementById('loginModal')){
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        const modalElemento = document.getElementById('loginModal');
        const loginButton = modalElemento.querySelector('.btn-primary');

        sessionStorage.setItem('returnUrl', returnUrl || window.location.pathname);

        loginButton.onclick = () => {
            window.location.href = 'login.html';
        };

        const modal= new bootstrap.Modal(modalElemento,{
            backdrop: true,
            keyboard: true
        });

        modalElemento.addEventListener('hidden.bs.modal',() => {
            window.location.href ='index.html';
        })

        modal.show();

    }catch (error){
        console.error('Error loading auth modal:', error);
        alert('Iniciar sesion primero');
        window.location.href ='../login.html';
    }
}
