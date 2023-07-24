window.addEventListener("load", minhaFuncao);

function minhaFuncao() {
    var id = parseInt(localStorage.getItem("loggedInUserID"));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var anotacoes = JSON.parse(this.responseText);
            var repeatedButtonsContainer = document.querySelector(".repeated-buttons");

            repeatedButtonsContainer.innerHTML = "";

            for (var i = 0; i < anotacoes.length; i++) {
                var clonedButton = document.createElement("button");
                clonedButton.classList.add("v65_17");
                clonedButton.textContent = anotacoes[i].titulo;
                var annotationID = anotacoes[i].id_anotacao;

                clonedButton.addEventListener("click", function (id) {
                    return function () {
                        // Store the id_anotacao in localStorage
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