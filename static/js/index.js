// Função DOM
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

// Funções para aparecer a imagem de verificação
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
    const imageURL = new URL("../static/images/nexiste.png", window.location.href);
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


// Função para verificar a existência do usuário.
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
        if (data && data.id) {
            localStorage.setItem("loggedInUserID", data.id);
            window.location.href = "home.html";
        } else {
            alert("Não foi possível obter o ID do usuário.");
        }
    } else {
        showImageOverlay();
    }
})

document.querySelector("#cadastro").addEventListener("click", async () => {
    window.location.href = "cadastro.html";
})