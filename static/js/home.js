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

window.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector(".loading").style.visibility = "hidden";
    }, 700);
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".loading").style.visibility = "visible";
});

