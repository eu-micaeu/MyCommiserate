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
        // Armazena o usuário logado no localStorage
        const response = await fetch(`/users/usuario/${username}`);
        const data = await response.json();

        if (response.status === 404) {
            alert("Usuário não encontrado");
        } else {
            localStorage.setItem("loggedInUserID", data.id);
            window.location.href = "home.html";
        }
        window.location.href = "home.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
})

document.querySelector("#cadastro").addEventListener("click", async () => {
    window.location.href = "cadastro.html";
})