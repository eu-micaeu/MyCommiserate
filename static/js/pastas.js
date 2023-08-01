function anots() {
    var id = parseInt(localStorage.getItem("selectedDirID"));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var anotacoes = JSON.parse(this.responseText);
            var repeatedButtonsContainer = document.querySelector(".repeated-buttons-notes");
            repeatedButtonsContainer.innerHTML = "";

            if (!Array.isArray(anotacoes)) {
                anotacoes = [anotacoes];
            }

            for (var i = 0; i < anotacoes.length; i++) {
                var clonedButton = document.createElement("button");
                clonedButton.classList.add("v65_17");
                clonedButton.textContent = anotacoes[i].titulo;
                var annotationID = anotacoes[i].id_anotacao;

                clonedButton.addEventListener("click", function (id) {
                    return function () {
                        localStorage.setItem("selectedAnotacaoID", id);
                    };
                }(annotationID));

                clonedButton.addEventListener("click", function () {
                    window.location.href = "/p-editar.html";
                });

                repeatedButtonsContainer.appendChild(clonedButton);
            }
        }
    };
    xhr.open("GET", "/anotacoes/pasta/" + id, true);
    xhr.send();
}

window.addEventListener("load", anots);

document.querySelector("#excluir").addEventListener("click", async () => {
    var selectedDirID = localStorage.getItem("selectedDirID");

    try {
        const resposta = await fetch(`/excluir_pasta/${selectedDirID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const dados = await resposta.json();
        if (dados.message === "Pasta excluída com sucesso!") {
            alert("Pasta excluída");
            window.location.href = "/anotacoes.html";
        } else {
            alert("Erro ao excluir a pasta");
        }
    } catch (error) {
        alert("Erro ao excluir a pasta: " + error.message);
    }
});