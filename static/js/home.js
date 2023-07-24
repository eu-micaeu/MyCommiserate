const loggedInUserID = localStorage.getItem("loggedInUserID").toString();


document.querySelector("#salvar").addEventListener("click", async () => {
    const titulo = document.querySelector("#titulo").value;
    const anotacao = document.querySelector("#anotacao").value;
    const response = await fetch(`/salvar/${loggedInUserID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ loggedInUserID, titulo, anotacao })
    });
    const data = await response.json();
    if (data.message === "Anotação criada com sucesso!") {
        alert("Anotação salva");
        document.querySelector("#titulo").value = "";
        document.querySelector("#anotacao").value = "";
    } else {
        alert("Não foi dessa vez que ela foi criada");
    }
});


document.querySelector('#anotacoes').addEventListener('click', function () {
    window.location.href = 'anotacoes.html';
});