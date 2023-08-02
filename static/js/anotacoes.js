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
            }
        }
    };
    xhr.open("GET", "/pastas/" + id, true);
    xhr.send();
}

window.addEventListener("load", dirs);
window.addEventListener("load", anots);

function createFolder() {
    var folderNameInput = document.getElementById("folderNameInput");
    var folderName = folderNameInput.value.trim();

    if (folderName === "") {
        alert("Por favor, insira um nome válido para a pasta.");
        return;
    }

    var id = parseInt(localStorage.getItem("loggedInUserID"));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        dirs();
        folderNameInput.value = "";
    };

    xhr.open("POST", "/criar/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ nome: folderName, id_usuario: id }));
}

var createFolderButton = document.querySelector(".createFolderButton");
createFolderButton.addEventListener("click", createFolder);

document.addEventListener("DOMContentLoaded", function () {
    const isModoAlt = localStorage.getItem('modoAlt') === 'true';
    updateModoAltButtonState(isModoAlt);
});

const body = document.getElementById('body');
const logoContainer = document.getElementsByClassName('logoContainer')[0];
const main = document.getElementsByClassName('main')[0];
const line1 = document.getElementsByClassName('line')[0];
const line2 = document.getElementsByClassName('line')[1];
const bntNotes = document.getElementsByClassName('v65_17');
const modoAlternativo = document.getElementsByClassName('btn bg-black')[0];


function updateModoAltButtonState(isModoAlt) {

    if (isModoAlt) {
        for (let i = 0; i < bntNotes.length; i++) {
            const button = bntNotes[i];
            button.classList.toggle('modoAlt');
        }
        body.classList.toggle('modoAltBody');
        logoContainer.classList.toggle('modoAltBody');
        main.classList.toggle('modoAltBody');
        line1.classList.toggle('lineAlt');
        line2.classList.toggle('lineAlt');
        modoAlternativo.classList.toggle('modoAlt');

    } else {
        for (let i = 0; i < bntNotes.length; i++) {
            const button = bntNotes[i];
            button.classList.remove('modoAlt'); 
        }
        body.classList.remove('modoAltBody');
        logoContainer.classList.remove('modoAltBody');
        main.classList.remove('modoAltBody');
        line1.classList.remove('lineAlt');
        line2.classList.remove('lineAlt');
        modoAlternativo.classList.remove('modoAlt');
    }
}


modoAlternativo.addEventListener('click', function () {
    const isModoAlt = localStorage.getItem('modoAlt') === 'true';
    const newModoAltValue = !isModoAlt;
    localStorage.setItem('modoAlt', newModoAltValue);
    updateModoAltButtonState(newModoAltValue);
});