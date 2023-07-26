function anots() {
    var id = parseInt(localStorage.getItem("loggedInUserID"));
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
                    window.location.href = "/editar.html";
                });

                repeatedButtonsContainer.appendChild(clonedButton);
            }
        }
    };
    xhr.open("GET", "/anotacoes/" + id, true);
    xhr.send();
}

function dirs() {
    var id = parseInt(localStorage.getItem("loggedInUserID"));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var pastas = JSON.parse(this.responseText);
                var repeatedButtonsContainer = document.querySelector(".repeated-buttons-dirs");
                repeatedButtonsContainer.innerHTML = "";

                if (!Array.isArray(pastas)) {
                    pastas = [pastas];
                }


                for (var i = 0; i < pastas.length; i++) {
                    var clonedButton = document.createElement("button");
                    clonedButton.classList.add("v65_17");
                    clonedButton.textContent = pastas[i].nome;
                    repeatedButtonsContainer.appendChild(clonedButton);

                    var dirID = pastas[i].id_pasta;

                    clonedButton.addEventListener("click", function (id) {
                        return function () {
                            localStorage.setItem("selectedDirID", id);
                            window.location.href = "/pastas.html";
                        };
                    }(dirID));
                }
            } else if (this.status == 404) {
                var repeatedButtonsContainer = document.querySelector(".repeated-buttons-dirs");
                repeatedButtonsContainer.innerHTML = "";

                var clonedButton = document.createElement("button");
                clonedButton.classList.add("v65_17");
                clonedButton.textContent = "CRIAR PASTA";
                clonedButton.style.backgroundColor = "green";
                repeatedButtonsContainer.appendChild(clonedButton);
                

                clonedButton.addEventListener("click", function () {
                    createFolder();
                });
            }
        }
    };
    xhr.open("GET", "/pastas/" + id, true);
    xhr.send();
}

window.addEventListener("load", dirs);
window.addEventListener("load", anots);

function createFolder() {
    var input = document.createElement("input");
    input.type = "text";
    input.id = "folderNameInput"; // Adiciona um ID ao input para acessá-lo facilmente
    input.style.position = "fixed";
    input.style.bottom = "20px";
    input.style.left = "50%";
    input.style.transform = "translateX(-50%)";
    input.style.zIndex = "9999";
    input.classList.add("Input");

    document.body.appendChild(input);

    // Adicione o botão de confirmação
    var btnConfirmar = document.createElement("button");
    btnConfirmar.textContent = "Confirmar";
    btnConfirmar.style.position = "fixed";
    btnConfirmar.style.bottom = "50px";
    btnConfirmar.style.left = "50%";
    btnConfirmar.style.transform = "translateX(-50%)";
    btnConfirmar.style.zIndex = "9999";
    btnConfirmar.classList.add("v65_17");

    btnConfirmar.addEventListener("click", function () {
        var folderNameInput = document.getElementById("folderNameInput");
        var folderName = folderNameInput.value;

        if (folderName === null || folderName.trim() === "") {
            return;
        }

        var id = parseInt(localStorage.getItem("loggedInUserID"));
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                // Pasta criada com sucesso. Atualiza a página para exibir a nova pasta.
                window.location.reload();
            } else if (this.readyState == 4 && this.status == 500) {
                alert("Erro ao criar pasta. Tente novamente mais tarde.");
            }
        };

        xhr.open("POST", "/criar_pasta", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ nome: folderName, id_usuario: id }));
    });

    document.body.appendChild(btnConfirmar);
}

