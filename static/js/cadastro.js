function showImageOverlay(imagePath) {
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
    image.src = imagePath; // Usando o caminho da imagem recebido como parâmetro
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


document.querySelector("#cadastrar").addEventListener("click", async () => {
    const username = document.querySelector("#usuario").value;
    const password = document.querySelector("#senha").value;
    const passwordconfirmed = document.querySelector("#senhaconfirmada").value;

    if (password !== passwordconfirmed) {
        alert("Confirmação da senha e senha estão diferentes.");
        return;
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
        const responseUser = await fetch(`/users/usuario/${username}`);
        const dataUser = await responseUser.json();

        if (responseUser.status === 404) {
            alert("Usuário não encontrado");
        } else {
            localStorage.setItem("loggedInUserID", dataUser.id);
            showImageOverlay("../static/images/cadastro.png");
            setTimeout(function () {
                window.location.href = "/";
            }, 3500);
        }
    } else {
        showImageOverlay("../static/images/erro.png");
    }
});

window.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector(".loading").style.visibility = "hidden";
    }, 700);
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".loading").style.visibility = "visible";
});
