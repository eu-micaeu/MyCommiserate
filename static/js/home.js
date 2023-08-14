const loggedInUserID = localStorage.getItem("loggedInUserID").toString();
if (loggedInUserID === "0") {
    window.location.href = "erro";
}

window.addEventListener("pageshow", function(event) {
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
    }
});


document.querySelector("#anotacoes").addEventListener("click", function () {
    window.location.href = "anotacoes.html";
});


window.addEventListener("load", function() {
    if (loggedInUserID) {
        fetch(`http://localhost:8080/users/${loggedInUserID}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("saudacoes").textContent = "Olá, " + data.username + "!";
            });
    }
});

