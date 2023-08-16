function showImageOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    overlay.addEventListener("click", hideImageOverlay);

    const imageContainer = document.createElement("div");
    imageContainer.id = "image-container";
    imageContainer.style.textAlign = "center";

    const image = document.createElement("img");
    const imageURL = new URL("../static/images/editada.png", window.location.href);
    image.src = imageURL.href;
    image.style.maxWidth = "80%";
    image.style.maxHeight = "80%";

    imageContainer.appendChild(image);
    overlay.appendChild(imageContainer);
    document.body.appendChild(overlay);
}

function hideImageOverlay() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.remove();
    }
}

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
    window.location.href = '/anotacoes.html';
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
        showImageOverlay();
        setTimeout(function () {
            window.location.href = "/anotacoes.html";
        }, 2000); 
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

document.querySelector("#telaCheia").addEventListener("click", function() {
    let textarea = document.querySelector("#anotacao");
    if (textarea.requestFullscreen) {
        textarea.requestFullscreen();
    } else if (textarea.mozRequestFullScreen) {
        textarea.mozRequestFullScreen();
    } else if (textarea.webkitRequestFullscreen) {
        textarea.webkitRequestFullscreen();
    } else if (textarea.msRequestFullscreen) { 
        textarea.msRequestFullscreen();
    }
});

// TÍTULO

let seta = document.getElementById("titulo");
seta.addEventListener("input", function () {
    seta.value = seta.value.replace(/->/g, "→");
});

let ponto = document.getElementById("titulo");
ponto.addEventListener("input", function () {
    ponto.value = ponto.value.replace(/- /g, "•");
});

let pontoRed = document.getElementById("titulo");
pontoRed.addEventListener("input", function () {
    pontoRed.value = pontoRed.value.replace(/•red /g, "🔴");
});

// ANOTAÇÃO

let seta2 = document.getElementById("anotacao");
seta2.addEventListener("input", function () {
    seta2.value = seta2.value.replace(/->/g, "→");
});

let ponto2 = document.getElementById("anotacao");
ponto2.addEventListener("input", function () {
    ponto2.value = ponto2.value.replace(/- /g, "•");
});

let pontoRed2 = document.getElementById("anotacao");
pontoRed2.addEventListener("input", function () {
    pontoRed2.value = pontoRed2.value.replace(/•red /g, "🔴");
});

let brena = document.getElementById("anotacao");
brena.addEventListener("input", function () {
    brena.value = brena.value.replace(/&brena /g, "❤️");
});

let textarea = document.getElementById("anotacao");

textarea.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        textarea.value = textarea.value.slice(0, start) + "    " + textarea.value.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
    }
});
