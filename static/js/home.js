const loggedInUserID = localStorage.getItem("loggedInUserID").toString();

if (loggedInUserID === "0") {
    window.location.href = "erro";
}

window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

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
    const imageURL = new URL("../static/images/salvo.png", window.location.href);
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

document.querySelector("#salvar").addEventListener("click", async () => {
    const titulo = document.querySelector("#titulo").value;
    const anotacao = document.querySelector("#anotacao").value;
    if (titulo === "" || anotacao === "") {
        alert("Por favor, preencha os campos de título e anotação antes de salvar.");
    } else {
        const response = await fetch(`/salvar/${loggedInUserID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ loggedInUserID, titulo, anotacao }),
        });
        const data = await response.json();
        showImageOverlay();
        document.querySelector("#titulo").value = "";
        document.querySelector("#anotacao").value = "";
        localStorage.removeItem("titulo");
        localStorage.removeItem("anotacao");
    }
});


document.querySelector("#anotacoes").addEventListener("click", function () {
    window.location.href = "anotacoes.html";
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

let inputElement = document.getElementById("anotacao");
let buttonElement = document.getElementById("comandos");
inputElement.addEventListener("input", function () {
    if (inputElement.value.includes('!help')) {
        inputElement.value = inputElement.value.replace(/!help/g, '');
        buttonElement.click();
    }
});



document.querySelector("#comandos").addEventListener("click", function() {
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.body.appendChild(overlay);

    let iframe = document.createElement("iframe");
    iframe.src = "comandos";
    iframe.style.width = "400px";
    iframe.style.height = "400px";
    iframe.style.position = "fixed";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(iframe);

    overlay.addEventListener("click", function() {
        iframe.remove();
        overlay.remove();
    });
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

let tituloEl = document.querySelector("#titulo");
let anotacaoEl = document.querySelector("#anotacao");

tituloEl.addEventListener("input", function () {
    localStorage.setItem("titulo", tituloEl.value);
});

anotacaoEl.addEventListener("input", function () {
    localStorage.setItem("anotacao", anotacaoEl.value);
});

window.addEventListener("load", function () {
    let tituloSalvo = localStorage.getItem("titulo");
    let anotacaoSalva = localStorage.getItem("anotacao");

    if (tituloSalvo) {
        tituloEl.value = tituloSalvo;
    }

    if (anotacaoSalva) {
        anotacaoEl.value = anotacaoSalva;
    }
});

let limparEl = document.querySelector("#limpar");

limparEl.addEventListener("click", function () {
    tituloEl.value = "";
    anotacaoEl.value = "";
    localStorage.removeItem("titulo");
    localStorage.removeItem("anotacao");
});

document.addEventListener("fullscreenchange", function () {
    let textarea = document.querySelector("#anotacao");
    if (document.fullscreenElement) {
        textarea.style.border = "none";
        textarea.style.borderRadius = "0";
    } else {
        textarea.style.border = "";
        textarea.style.borderRadius = "";
    }
});




