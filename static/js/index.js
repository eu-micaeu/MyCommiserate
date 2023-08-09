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

window.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector(".loading").style.visibility = "hidden";
    }, 700);
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".loading").style.visibility = "visible";
});

