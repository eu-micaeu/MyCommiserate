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
        } else {
            return
        }
    };
    xhr.open("GET", "/anotacoes/" + id, true);
    xhr.send();
}

window.addEventListener("load", anots);

window.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector(".loading").style.visibility = "hidden";
    }, 700);
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".loading").style.visibility = "visible";
});

document.querySelector(".loading").style.display = "flex";
