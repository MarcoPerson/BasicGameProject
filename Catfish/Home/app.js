document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".nav-hamburger");
    const navUL = document.querySelector(".nav-ul");
    const gamesMenu = document.querySelector("#li-menu");
    const gamesUL = document.getElementById("nav-ul-li-games")

    hamburger.addEventListener("click", function(){
        navUL.classList.toggle("show");
    })

    gamesMenu.addEventListener("click", function(){
        gamesUL.classList.toggle("show");
    })
})