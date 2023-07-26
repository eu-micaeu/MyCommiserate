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

                // Verifica se a resposta contém um único objeto de pasta e, em seguida, envolve-o em uma matriz
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
                    alert("AINDA EM DESENVOLVIMENTO")
                });
            }
        }
    };
    xhr.open("GET", "/pastas/" + id, true);
    xhr.send();
}

window.addEventListener("load", dirs);
window.addEventListener("load", anots);

