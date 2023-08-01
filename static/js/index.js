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
            localStorage.setItem("loggedInUserID", data.id);
            window.location.href = "home.html";
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

    // Função para tratar o evento de pressionar teclas nos campos de entrada
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Impedir o envio do formulário padrão no caso de estar dentro de um formulário
            entrarButton.click(); // Simular o clique no botão "Entrar"
        }
    }

    // Adicionar o ouvinte de eventos para os campos de entrada
    usuarioInput.addEventListener("keypress", handleKeyPress);
    senhaInput.addEventListener("keypress", handleKeyPress);
});
