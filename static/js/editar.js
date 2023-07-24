var selectedAnotacaoID = localStorage.getItem("selectedAnotacaoID");
var idAnotacao = selectedAnotacaoID;

async function buscarDadosAnotacao() {
    try {
        const resposta = await fetch(`/anotacao/${idAnotacao}`);
        const dados = await resposta.json();
        document.querySelector("#titulo").value = dados.titulo;
        document.querySelector("#anotacao").value = dados.anotacao;
    } catch (erro) {
        alert("Erro ao buscar os dados da anotação:");
    }
}

buscarDadosAnotacao();


document.querySelector('#notesBtn').addEventListener('click', function () {
    window.location.href = 'anotacoes.html';
});


document.querySelector("#salvarBtn").addEventListener("click", async () => {
    const titulo = document.querySelector("#titulo").value;
    const anotacao = document.querySelector("#anotacao").value;
    const resposta = await fetch(`/atualizar/${idAnotacao}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ titulo, anotacao })
    });
    const dados = await resposta.json();
    if (dados.message === "Anotação atualizada com sucesso!") {
        alert("Anotação atualizada");
        window.location.href = "/anotacoes.html";
    } else {
        alert("Erro ao atualizar a anotação");
    }
});


document.querySelector("#excluir").addEventListener("click", async () => {
    const resposta = await fetch(`/excluir/${idAnotacao}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const dados = await resposta.json();
    if (dados.message === "Anotação excluída com sucesso!") {
        alert("Anotação excluída");
        window.location.href = "/anotacoes.html";
    } else {
        alert("Erro ao excluir a anotação");
    }
});