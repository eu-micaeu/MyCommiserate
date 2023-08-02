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

const loggedInUserID = localStorage.getItem("loggedInUserID").toString();

document.querySelector("#salvar").addEventListener("click", async () => {
    const titulo = document.querySelector("#titulo").value;
    const anotacao = document.querySelector("#anotacao").value;
    const response = await fetch(`/salvar/${loggedInUserID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ loggedInUserID, titulo, anotacao }),
    });
    const data = await response.json();
    if (data.message === "Anotação criada com sucesso!") {
        showImageOverlay();
        document.querySelector("#titulo").value = "";
        document.querySelector("#anotacao").value = "";
    } else {
        alert("Não foi dessa vez que ela foi criada");
    }
});

document.querySelector("#anotacoes").addEventListener("click", function () {
    window.location.href = "anotacoes.html";
});

document.addEventListener('DOMContentLoaded', function () {
    const anotacoesDiv = document.querySelector('.textNote');

    document.getElementById('telaCheia').addEventListener('click', function () {
        if (anotacoesDiv.requestFullscreen) {
            anotacoesDiv.requestFullscreen();
        } else if (anotacoesDiv.mozRequestFullScreen) {
            anotacoesDiv.mozRequestFullScreen();
        } else if (anotacoesDiv.webkitRequestFullscreen) {
            anotacoesDiv.webkitRequestFullscreen();
        } else if (anotacoesDiv.msRequestFullscreen) {
            anotacoesDiv.msRequestFullscreen();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'F11') {
            if (document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
    });
});

const line = document.getElementsByClassName('line')[0];
const body = document.getElementById('body');
const logoContainer = document.getElementsByClassName('logoContainer')[0];
const main = document.getElementsByClassName('main')[0];
const titleInput = document.getElementsByClassName('titleInput')[0];
const anotacao = document.getElementById('anotacao');
const btn1 = document.getElementsByClassName('btn')[0];
const btn2 = document.getElementsByClassName('btn')[1];
const btn3 = document.getElementsByClassName('btn')[2];
const btn4 = document.getElementsByClassName('btn')[3];

document.addEventListener("DOMContentLoaded", function () {
    const isModoAlt = localStorage.getItem('modoAlt') === 'true';
    updateModoAltButtonState(isModoAlt);
});

function updateModoAltButtonState(isModoAlt) {
    // Aplicar o modo alternativo se necessário
    if (isModoAlt) {
        body.classList.toggle('modoAltBody');
        main.classList.toggle('modoAltBody');
        logoContainer.classList.toggle('modoAltBody');
        titleInput.classList.toggle('modoAlt');
        anotacao.classList.toggle('modoAlt');
        btn1.classList.toggle('modoAlt');
        btn2.classList.toggle('modoAlt');
        btn3.classList.toggle('modoAlt');
        btn4.classList.toggle('modoAlt');
    } else {
        body.classList.remove('modoAltBody');
        main.classList.remove('modoAltBody');
        logoContainer.classList.remove('modoAltBody');
        titleInput.classList.remove('modoAlt');
        anotacao.classList.remove('modoAlt');
        btn1.classList.remove('modoAlt');
        btn2.classList.remove('modoAlt');
        btn3.classList.remove('modoAlt');
        btn4.classList.remove('modoAlt');
    }
}

modoAlt.addEventListener('click', function () {
    const isModoAlt = localStorage.getItem('modoAlt') === 'true';
    const newModoAltValue = !isModoAlt; // Troca entre true e false
    localStorage.setItem('modoAlt', newModoAltValue);
    updateModoAltButtonState(newModoAltValue); // Atualizar o estado visual do modo
});
