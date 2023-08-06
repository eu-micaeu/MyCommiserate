document.querySelector("#entrar").addEventListener("click", async () => {
    const username = document.querySelector("#usuario").value;
    const password = document.querySelector("#senha").value;
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.message === "Login efetuado com sucesso!") {
        const response = await fetch(`/users/usuario/${username}`);
        const data = await response.json();

        if (response.status === 404) {
            alert("Usuário não encontrado");
        } else {
            if (data && data.id) {
                localStorage.setItem("loggedInUserID", data.id);
                window.location.href = "home.html";
            } else {
                alert("Não foi possível obter o ID do usuário.");
            }            
        }
    } else {
        alert("Usuário ou senha incorretos");
    }
})

document.querySelector("#cadastro").addEventListener("click", async () => {
    window.location.href = "cadastro.html";
})

document.addEventListener("DOMContentLoaded", function () {

    const entrarButton = document.querySelector("#entrar");
    const usuarioInput = document.querySelector("#usuario");
    const senhaInput = document.querySelector("#senha");

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            entrarButton.click();
        }
    }

    usuarioInput.addEventListener("keypress", handleKeyPress);
    senhaInput.addEventListener("keypress", handleKeyPress);
});

const modoAltButton = document.getElementById('modoAlt');
const body = document.getElementById('body');
const formContainer = document.getElementsByClassName('formContainer')[0];
const userContainer = document.getElementsByClassName('userContainer')[0];
const passwdContainer = document.getElementsByClassName('passwdContainer')[0];
const logoContainer = document.getElementsByClassName('logoContainer')[0];
const line = document.getElementsByClassName('line')[0];
const botaoEntrar = document.getElementById('entrar');
const botaoCadastro = document.getElementById('cadastro');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');


modoAltButton.addEventListener('click', function () {
    senha.classList.toggle('modoAltInput');
    usuario.classList.toggle('modoAltInput');
    body.classList.toggle('modoAltBody');
    botaoEntrar.classList.toggle('modoAlt');
    botaoCadastro.classList.toggle('modoAlt');
    modoAltButton.classList.toggle('modoAlt');
    formContainer.classList.toggle('modoAlt');
    userContainer.classList.toggle('modoAlt');
    line.classList.toggle('lineAlt');
    passwdContainer.classList.toggle('modoAlt');
    logoContainer.classList.toggle('modoAltBody');
    const isModoAlt = usuario.classList.contains('modoAltInput');
    localStorage.setItem('modoAlt', isModoAlt);
});
