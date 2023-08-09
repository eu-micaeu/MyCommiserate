window.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector(".loading").style.visibility = "hidden";
        window.location.href = "/login";
    }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".loading").style.visibility = "visible";
    localStorage.setItem("loggedInUserID", 0);
});

document.querySelector(".loading").style.display = "flex";
