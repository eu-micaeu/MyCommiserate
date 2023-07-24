document.querySelector("#cadastrar").addEventListener("click", async () => {
    const username = document.querySelector("#usuario").value;
    const password = document.querySelector("#senha").value;
    const passwordconfirmed = document.querySelector("#senhaconfirmada").value;

    if (password !== passwordconfirmed) {
        alert("Confirmação da senha e senha estão diferentes.");
        return; // Encerra a função caso as senhas não sejam iguais
    }

    const response = await fetch("/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.message === "Usuário criado com sucesso!") {
        // Armazena o usuário logado no localStorage
        const responseUser = await fetch(`/users/usuario/${username}`);
        const dataUser = await responseUser.json();

        if (responseUser.status === 404) {
            alert("Usuário não encontrado");
        } else {
            // Armazena o ID do usuário logado no localStorage
            localStorage.setItem("loggedInUserID", dataUser.id);
            window.location.href = "/";
        }
        alert("Cadastro feito");
    } else {
        alert("Dados incorretos");
    }
});